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
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document-reshare.odt')
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
			cy.waitForViewerClose()
		})
	})

	it.skip('Open a remotely shared file as a link', function() {
		cy.login(shareOwner)
		cy.shareFileToRemoteUser(shareOwner, '/document-reshare.odt', shareRecipient)

		cy.login(shareRecipient)
		cy.visit('/apps/files')

		cy.shareLink(shareRecipient, '/document-reshare.odt', { permissions: 1 }).then((token) => {
			cy.logout()
			cy.visit(`/s/${token}`, {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})
			cy.waitForViewer()
			cy.waitForCollabora(true, true)
		})
	})

	describe('Open files with symbols in their names', () => {
		const symbols = ['%', '&']

		symbols.forEach((symbol) => {
			const filename = `next ${symbol} cloud.odt`

			it(`${symbol} in file name`, () => {
				cy.uploadFile(shareOwner, filename, 'application/vnd.oasis.opendocument.text', `/${filename}`)

				cy.login(shareOwner)
				cy.shareFileToRemoteUser(shareOwner, filename, shareRecipient)

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
					cy.waitForViewerClose()
				})
			})
		})
	})
})
