/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Config from './../services/config.tsx'

const isDirectEditing = () => Config.get('direct')

const isMobileInterfaceAvailable = () => window.RichDocumentsMobileInterface
	|| (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface)

const isMobileInterfaceOnIos = () => window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.RichDocumentsMobileInterface

const isMobileInterfaceOnAndroid = () => window.RichDocumentsMobileInterface

const callMobileMessage = (messageName, attributes) => {
	console.debug('callMobileMessage', messageName, attributes)
	let message = messageName
	if (typeof attributes !== 'undefined') {
		message = {
			MessageName: messageName,
			Values: attributes,
		}
	}
	let attributesString = null
	try {
		attributesString = JSON.stringify(attributes)
	} catch (e) {
		attributesString = null
	}
	// Forward to mobile handler
	if (window.RichDocumentsMobileInterface && typeof window.RichDocumentsMobileInterface[messageName] === 'function') {
		if (attributesString === null || typeof attributesString === 'undefined') {
			window.RichDocumentsMobileInterface[messageName]()
		} else {
			window.RichDocumentsMobileInterface[messageName](attributesString)
		}
	}

	// iOS webkit fallback
	if (window.webkit
		&& window.webkit.messageHandlers
		&& window.webkit.messageHandlers.RichDocumentsMobileInterface) {
		window.webkit.messageHandlers.RichDocumentsMobileInterface.postMessage(message)
	}
}

export default {
	isDirectEditing,
	callMobileMessage,
}

export {
	isDirectEditing,
	callMobileMessage,
	isMobileInterfaceAvailable,
	isMobileInterfaceOnAndroid,
	isMobileInterfaceOnIos,
}
