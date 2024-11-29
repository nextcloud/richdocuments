/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/cypress'
import { randHash } from '../utils/index.js'
const shareOwner = new User(randHash(), randHash())
const shareRecipient = new User(randHash(), randHash())

describe('File sharing of office documents', function() {

	before(function() {
		cy.nextcloudEnableApp('testing')
		cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'notebookbar')
		cy.createUser(shareRecipient)
		cy.createUser(shareOwner)

		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		cy.uploadFile(shareOwner, 'spreadsheet.ods', 'application/vnd.oasis.opendocument.spreadsheet', '/spreadsheet.ods')
	})

	it('Open a shared file', function() {
		const filename = 'document.odt'

		cy.login(shareOwner)
		cy.shareFileToUser(shareOwner, '/document.odt', shareRecipient)

		cy.login(shareRecipient)
		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})
		cy.openFile(filename)
		cy.waitForViewer()
		cy.waitForCollabora()

		// Validate closing
		cy.get('@loleafletframe').within(() => {
			cy.get('#closebutton').click()
			cy.waitForViewerClose()
		})
	})

	it('Open a shared file as readonly', function() {
		const filename = 'spreadsheet.ods'

		cy.login(shareOwner)
		cy.shareFileToUser(shareOwner, filename, shareRecipient, { permissions: 1 })

		cy.login(shareRecipient)
		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})
		cy.openFile(filename)
		cy.waitForViewer()
		cy.waitForCollabora()

		// Validate closing
		cy.get('@loleafletframe').within(() => {
			cy.get('#closebutton').click()
			cy.waitForViewerClose()
		})
	})
})
