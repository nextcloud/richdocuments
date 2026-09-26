/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
describe('Open existing office files', function() {
	let randUser

	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
			cy.uploadFile(user, 'spreadsheet.ods', 'application/vnd.oasis.opendocument.spreadsheet', '/spreadsheet.ods')
			cy.uploadFile(user, 'presentation.odp', 'application/vnd.oasis.opendocument.presentation', '/presentation.odp')
			cy.uploadFile(user, 'drawing.odg', 'application/vnd.oasis.opendocument.drawing', '/drawing.odg')
		})
	})

	beforeEach(function() {
		cy.login(randUser)
	})

	const fileTests = ['document.odt', 'presentation.odp', 'spreadsheet.ods', 'drawing.odg']
	fileTests.forEach((filename) => {

		it('Classic UI: Open ' + filename + ' the viewer on file click', function() {
			cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'compact')
			cy.login(randUser)

			cy.visit('/apps/files', {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})
			cy.openFile(filename)
			cy.waitForViewer()
			cy.waitForCollabora()

			cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

			cy.get('#viewer .modal-header')
				.should('exist')
				.and('not.be.visible')
				.and('have.css', 'display', 'none')

			// Share action
			cy.wait(2000)
			cy.get('@loleafletframe').within(() => {
				cy.verifyOpen(filename)
			})

			// FIXME: wait for sidebar tab content
			// FIXME: validate sharing tab
			cy.screenshot('share-sidebar_' + filename)

			// Validate closing
			cy.closeDocument()
		})

		it('Notebookbar UI: Open ' + filename + ' the viewer on file click', function() {
			cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'tabbed')
			cy.login(randUser)

			cy.visit('/apps/files', {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})
			cy.openFile(filename)
			cy.waitForViewer()
			cy.waitForCollabora()

			cy.get('#viewer .modal-header')
				.should('exist')
				.and('not.be.visible')
				.and('have.css', 'display', 'none')

			cy.screenshot('open-file_' + filename)
			cy.get('@loleafletframe').within(() => {
				cy.verifyOpen(filename)
			})
			// FIXME: wait for sidebar tab content
			// FIXME: validate sharing tab
			cy.screenshot('share-sidebar_' + filename)

			// Validate closing
			cy.closeDocument()
		})

	})
})

describe('Open PDF with richdocuments', () => {
	let randUser

	before(() => {
		cy.createRandomUser().then((user) => {
			randUser = user

			cy.login(user)
			cy.uploadFile(user, 'document.pdf', 'application/pdf', '/document.pdf')
		})
	})

	beforeEach(() => {
		cy.login(randUser)
		cy.visit('/apps/files')
	})

	// Verify that clicking on the file uses the files PDF viewer
	// and NOT richdocuments
	it('Open PDF with files PDF viewer', () => {
		cy.get('[data-cy-files-list-row-name="document.pdf"]').click()
		cy.waitForViewer()

		// Verify Collabora is not being used
		cy.get('[data-cy="coolframe"]').should('not.exist')

		// Verify the files PDF viewer is being used
		cy.get('.viewer__file-wrapper')
			.get('iframe')
			.its('0.contentDocument')
			.its('body').should('not.be.empty')
			.as('pdfViewer')

		cy.get('@pdfViewer').find('.pdfViewer').should('exist')
	})

	// Verify that using the file action 'Edit with Collabora Online'
	// opens the file using richdocuments
	it('Open PDF with richdocuments', () => {
		cy.get('[data-cy-files-list-row-name="document.pdf"]').as('pdf')
		cy.get('@pdf').find('.action-items').as('actions')

		cy.get('@actions').find('.action-item__menutoggle').click()
		cy.get('.action-button__longtext').contains('Edit with Collabora Online').click()

		// Wait for Collabora to open
		cy.waitForViewer()
		cy.waitForCollabora()

		// Verify that the correct file is open
		cy.get('@loleafletframe').within(() => {
			cy.verifyOpen('document.pdf')
		})

		// Make sure we can close the document
		cy.closeDocument()
	})
})

describe('PostMessage origin security', function() {
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
	})

	it('rejects messages from an unexpected origin', function() {
		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})
		cy.openFile('document.odt')
		cy.waitForViewer()
		cy.waitForCollabora()
		cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

		cy.window().then(win => {
			cy.spy(win.console, 'warn').as('consoleWarn')
		})
		cy.dispatchMessageFromOrigin('https://evil.example.com', { MessageId: 'Action_Save', Values: {} })
		cy.get('@consoleWarn').should('have.been.calledWith',
			'PostMessageService: rejected message from unexpected origin',
			'https://evil.example.com'
		)
		cy.closeDocument()
	})

	it('sends messages with the Collabora targetOrigin', function() {
		cy.visit('/apps/files')
		cy.openFile('document.odt')
		cy.waitForViewer()
		cy.waitForCollabora()
		cy.get('[data-cy="coolframe"]').then($iframe => {
			const collaboraOrigin = $iframe[0].contentWindow.location.origin
			cy.spy($iframe[0].contentWindow, 'postMessage').as('postMessage')
			cy.dispatchMessageFromOrigin(collaboraOrigin, { MessageId: 'App_LoadingStatus', Values: { Status: 'Document_Loaded' } })
			cy.waitForPostMessage('Host_PostmessageReady', undefined, { targetOrigin: collaboraOrigin })
		})

		cy.closeDocument()
	})
})

describe('Access token refresh', function() {
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
	})

	// waitForPostMessage matches Values by strict equality, which cannot
	// express "some timestamp in the future", so read the spy directly.
	const lastResetAccessTokenTtl = () => {
		return cy.get('@postMessage').then(spy => {
			const messages = spy.getCalls()
				.filter(call => call.args[0].includes('"MessageId":"Reset_Access_Token"'))
				.map(call => JSON.parse(call.args[0]))

			expect(messages.length).to.be.greaterThan(0)
			return cy.wrap(messages[messages.length - 1].Values.ttl)
		})
	}

	it('passes the token expiry to Collabora on load', function() {
		cy.visit('/apps/files')
		cy.openFile('document.odt')
		cy.waitForViewer()
		cy.waitForCollabora()

		// Collabora only arms its expiry timer when it is told when the token
		// dies, and reads the value as milliseconds since the epoch.
		cy.get('input[name="access_token_ttl"]')
			.invoke('val')
			.should('not.be.empty')
			.then(ttl => {
				expect(Number(ttl), 'access_token_ttl is an epoch in milliseconds')
					.to.be.greaterThan(Date.now())
			})

		cy.closeDocument()
	})

	const expiryMessages = ['App_TokenExpiring', 'App_TokenExpired']
	expiryMessages.forEach(messageId => {

		it('issues a new token when Collabora sends ' + messageId, function() {
			cy.intercept('POST', '**/apps/richdocuments/token').as('tokenRequest')

			cy.visit('/apps/files')
			cy.openFile('document.odt')
			cy.waitForViewer()
			cy.waitForCollabora()
			cy.wait('@tokenRequest')

			cy.get('[data-cy="coolframe"]').then($iframe => {
				const collaboraOrigin = $iframe[0].contentWindow.location.origin
				cy.spy($iframe[0].contentWindow, 'postMessage').as('postMessage')

				cy.dispatchMessageFromOrigin(collaboraOrigin, { MessageId: messageId, Values: { Timeout: 900000 } })

				cy.wait('@tokenRequest')
				cy.waitForPostMessage('Reset_Access_Token', undefined, { targetOrigin: collaboraOrigin })

				// A Reset_Access_Token without a ttl is read as "never expires",
				// which stops Collabora warning about any later expiry.
				lastResetAccessTokenTtl().should(ttl => {
					expect(ttl).to.be.a('number')
					expect(ttl).to.be.greaterThan(Date.now())
				})
			})

			cy.closeDocument()
		})
	})
})
