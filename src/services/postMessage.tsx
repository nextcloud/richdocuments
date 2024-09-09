/*
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { emit } from '@nextcloud/event-bus'

type MessageEventSource = Window | MessagePort | ServiceWorker;

export interface WopiPostValues {
	Deprecated?: boolean;
}
export interface WopiPost {
	MessageId: string;
	Values: WopiPostValues;
}

interface WindowCallbackHandler { (): Window}

interface PostMessageHandlerParam {
	data: any;
	parsed: { msgId: string, args: WopiPostValues, deprecated: boolean }
}

type PostMessageHandler = (values: PostMessageHandlerParam) => void;

export default class PostMessageService {

	private readonly targets: {[name: string]: (Window|WindowCallbackHandler)}
	private postMessageHandlers: PostMessageHandler[] = []

	constructor(targets: {[name: string]: (Window|WindowCallbackHandler)}) {
		this.targets = targets
		window.addEventListener('message', (event: {source: MessageEventSource, data: any, origin: string}) => {
			this.handlePostMessage(event.data)
		}, false)
	}

	sendPostMessage(target: string, message: any, targetOrigin: string = '*') {
		let targetElement: Window
		if (typeof this.targets[target] === 'function') {
			targetElement = (this.targets[target] as WindowCallbackHandler)()
		} else {
			targetElement = this.targets[target] as Window
		}
		targetElement.postMessage(message, targetOrigin)
		console.debug('PostMessageService.sendPostMessage', target, message)
	}

	sendWOPIPostMessage(target: string, msgId: string, values: any = {}) {
		const msg = {
			MessageId: msgId,
			SendTime: Date.now(),
			Values: values,
		}

		this.sendPostMessage(target, JSON.stringify(msg))
	}

	private static parsePostMessage(data: any) {
		let msgId: string,
			args: WopiPostValues,
			deprecated: boolean

		try {
			const msg: WopiPost = JSON.parse(data)
			msgId = msg.MessageId
			args = msg.Values
			deprecated = !!msg.Values.Deprecated
		} catch (exc) {
			msgId = data
		}
		return { msgId, args, deprecated }
	}

	registerPostMessageHandler(callback: PostMessageHandler) {
		this.postMessageHandlers.push(callback)
	}

	unregisterPostMessageHandler(callback: PostMessageHandler) {
		const handlerIndex = this.postMessageHandlers.findIndex(cb => cb === callback)
		delete this.postMessageHandlers[handlerIndex]
	}

	private handlePostMessage(data: any) {
		const parsed = PostMessageService.parsePostMessage(data)
		if (typeof parsed === 'undefined' || parsed === null) {
			return
		}

		try {
			const wopiPostMessage = JSON.parse(data)
			if (typeof wopiPostMessage === 'object' && wopiPostMessage !== null) {
				emit('richdocuments:wopi-post', wopiPostMessage)
			}
		} catch (e) {}

		this.postMessageHandlers.forEach((fn: PostMessageHandler): void => {
			if (parsed.deprecated) {
				console.debug('PostMessageService.handlePostMessage', 'Ignoring deprecated post message', parsed.msgId)
				return
			}
			try {
				fn({
					data,
					parsed,
				})
			} catch (e) {
				console.error('Error during post message handler', parsed, e)
			}

		})
	}

}
