/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
describe('Open in local editor', function() {
	let randUser

	before(function() {
		cy.createRandomUser().then((user) => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		})
	})

	beforeEach(function() {
		cy.login(randUser)

		// Delayed so that assertions can run while the handover is in flight.
		cy.intercept('POST', '**/ocs/v2.php/apps/files/api/v1/openlocaleditor**', {
			delay: 2000,
			statusCode: 200,
			body: {
				ocs: {
					meta: { status: 'ok', statuscode: 200, message: 'OK' },
					data: { userId: randUser.userId, pathId: 1, expirationTime: 0, token: 'open-local-token' },
				},
			},
		}).as('openLocalEditor')

		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
				// The handover navigates to nc://open/…, which would abort the test run.
				cy.stub(win, 'open').as('windowOpen')
			},
		})

		cy.openFile('document.odt')
		cy.waitForViewer()
		cy.waitForCollabora()
		cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })
	})

	it('ignores repeat clicks on the button', function() {
		clickOpenLocalEditor()
		clickOpenLocalEditor()
		clickOpenLocalEditor()

		cy.get('[data-cy="confirmationDialog"]').should('have.length', 1)
		cy.get('[data-cy="confirmationConfirm"]').click()

		dispatchSessionClosed()

		clickOpenLocalEditor()

		cy.wait('@openLocalEditor')
		cy.get('@openLocalEditor.all').should('have.length', 1)
	})

	it('allows a new attempt after the confirmation was declined', function() {
		clickOpenLocalEditor()
		cy.get('[data-cy="confirmationCancel"]').click()
		cy.get('[data-cy="confirmationDialog"]').should('not.exist')

		clickOpenLocalEditor()
		cy.get('[data-cy="confirmationDialog"]').should('have.length', 1)

		cy.get('[data-cy="confirmationCancel"]').click()
		cy.get('@openLocalEditor.all').should('have.length', 0)
	})
})

/**
 * Simulate a click on the "Open in local editor" button that richdocuments
 * injects into the Collabora toolbar.
 *
 * The button lives inside the Collabora iframe, so the click is only
 * observable as the post message Collabora sends back to the host.
 */
function clickOpenLocalEditor() {
	cy.get('[data-cy="coolframe"]').then(($iframe) => {
		cy.dispatchMessageFromOrigin($iframe[0].contentWindow.location.origin, {
			MessageId: 'Clicked_Button',
			Values: { Id: 'Open_Local_Editor' },
		})
	})
}

/**
 * Acknowledge the Close_Session the handover sends.
 *
 * The handover continues on the next message received from Collabora, which
 * in a test run cannot be left to the editor to send on its own.
 */
function dispatchSessionClosed() {
	cy.get('[data-cy="coolframe"]').then(($iframe) => {
		cy.dispatchMessageFromOrigin($iframe[0].contentWindow.location.origin, {
			MessageId: 'Session_Closed',
			Values: { Reason: 'OwnerTermination' },
		})
	})
}
