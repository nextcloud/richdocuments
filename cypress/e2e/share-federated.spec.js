/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/cypress'
import { randHash } from '../utils/index.js'
const shareOwner = new User(randHash(), randHash())
const shareRecipient = new User(randHash(), randHash())

describe('Federated sharing of office documents', function() {

	before(function() {
		cy.nextcloudEnableApp('testing')
		cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'notebookbar')
		cy.createUser(shareRecipient)
		cy.createUser(shareOwner)

		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
	})

	it('Open a remotely shared file', function() {
		const filename = 'document.odt'

		cy.login(shareOwner)
		cy.shareFileToRemoteUser(shareOwner, '/document.odt', shareRecipient)
		cy.login(shareRecipient)

		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})
		cy.openFile(filename)
		cy.waitForViewer()
		cy.waitForCollabora(true, true).within(() => {
			cy.get('#closebutton').click()
			cy.get('#viewer', { timeout: 5000 }).should('not.exist')
		})
	})
})
