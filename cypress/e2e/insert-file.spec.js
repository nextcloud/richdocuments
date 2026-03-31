/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

describe('Insert file (file picker)', function() {
	let randUser

	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		})
	})

	beforeEach(function() {
		cy.login(randUser)
		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})
		cy.openFile('document.odt')
		cy.waitForViewer()
		cy.waitForCollabora()
	})

	it('Opens the file picker for inserting files without errors', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')
		})

		// Trigger UI_InsertFile by sending a postMessage to the Office component
		// This simulates what Collabora does when "Document Compare" or similar actions are triggered
		cy.window().then((win) => {
			const iframe = win.document.querySelector('[data-cy="coolframe"]')
			const message = JSON.stringify({
				MessageId: 'UI_InsertFile',
				SendTime: Date.now(),
				Values: {
					mimeTypeFilter: [],
					callback: 'Action_Paste',
				},
			})
			win.postMessage(message, '*')
		})

		// The file picker should open without crashing
		cy.get('.modal-container__content', { timeout: 10000 }).should('be.visible')
	})
})
