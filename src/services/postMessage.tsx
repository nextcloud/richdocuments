/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
type MessageEventSource = Window | MessagePort | ServiceWorker;

export interface WopiPost {
	MessageId: string;
	Values: WopiPostValues;
}

export interface WopiPostValues {
	Deprecated?: boolean;
}

interface WindowCallbackHandler { (): Window}

export default class PostMessageService {
	private readonly targets: {[name: string]: (Window|WindowCallbackHandler)};
	private postMessageHandlers: Function[] = [];

	constructor(targets: {[name: string]: (Window|WindowCallbackHandler)}) {
		this.targets = targets
		window.addEventListener('message', (event: {source: MessageEventSource, data: any, origin: string}) => {
			this.handlePostMessage(event.data)
		}, false)
	}

	sendPostMessage(target: string, message: any, targetOrigin: string = '*') {
		let targetElement: Window;
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
			Values: values
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

	registerPostMessageHandler(callback: Function) {
		this.postMessageHandlers.push(callback)
	}

	unregisterPostMessageHandler(callback: Function) {
		const handlerIndex = this.postMessageHandlers.findIndex(cb => cb === callback)
		delete this.postMessageHandlers[handlerIndex]
	}

	private handlePostMessage(data: any) {
		const parsed = PostMessageService.parsePostMessage(data);
		if (typeof parsed === 'undefined' || parsed === null) {
			return
		}
		this.postMessageHandlers.forEach((fn: Function): void => {
			if (parsed.deprecated) {
				console.debug('PostMessageService.handlePostMessage', 'Ignoring deprecated post message', parsed.msgId)
				return;
			}
			fn({
				data: data,
				parsed
			})
		})
	}

}
