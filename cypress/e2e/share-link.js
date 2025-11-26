/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/cypress'
import { randHash } from '../utils/index.js'

const shareOwner = new User(randHash(), randHash())
const otherUser = new User(randHash(), randHash())

describe('Public sharing of office documents', () => {
	before(function() {
		cy.nextcloudTestingAppConfigSet('richdocuments', 'doc_format', '')
		cy.createUser(shareOwner)
		cy.createUser(otherUser)

		cy.createFolder(shareOwner, '/my-share')
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/my-share/document.odt')
	})

	const userMatrix = [shareOwner, otherUser]

	describe('Share with users', () => {
		describe('Readonly file', () => {
			for (const user of userMatrix) {
				it('Loads readonly file as user: ' + user.userId, () => {
					cy.shareLink(shareOwner, '/document.odt').then((token) => {
						cy.login(user)

						cy.visit(`/s/${token}`, {
							onBeforeLoad(win) {
								cy.spy(win, 'postMessage').as('postMessage')
							},
						})

						// Assert that we do not ask for guest name if logged in
						cy.get('[data-cy="guestNameModal"]').should('not.exist')

						waitForCollabora()
					})
				})
			}
		})

		describe('Editable file', () => {
			for (const user of userMatrix) {
				it('Loads editable file as user: ' + user.userId, () => {
					cy.shareLink(shareOwner, '/document.odt', { permissions: 19 }).then((token) => {
						cy.login(user)

						cy.visit(`/s/${token}`, {
							onBeforeLoad(win) {
								cy.spy(win, 'postMessage').as('postMessage')
							},
						})

						// Assert that we do not ask for guest name if logged in
						cy.get('[data-cy="guestNameModal"]').should('not.exist')

						waitForCollabora()
					})
				})
			}
		})
	})

	const guestName = randHash()
	describe('Share with guests', () => {
		describe('Readonly file', () => {
			it('Loads readonly file as guest: ' + guestName, () => {
				cy.shareLink(shareOwner, '/document.odt').then((token) => {
					cy.logout()

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					// Assert that we do not ask for guest name if we can't edit as a guest
					cy.get('[data-cy="guestNameModal"]').should('not.exist')

					waitForCollabora()
				})
			})
		})

		describe('Editable file', () => {
			it('Loads editable file as guest: ' + guestName, () => {
				cy.shareLink(shareOwner, '/document.odt', { permissions: 19 }).then((token) => {
					cy.logout()

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					// Assert that we do ask for guest name if we can edit as a guest
					cy.get('[data-cy="guestNameModal"]').should('be.visible')

					cy.inputCollaboraGuestName(guestName)
					waitForCollabora()
				})
			})
		})

		describe('New file', () => {
			before(() => {
				cy.createFolder(shareOwner, '/Shared-Folder')
				cy.createFolder(shareOwner, '/Shared-Folder/Subfolder')
			})

			it('Creates a new file in a public share as a guest', () => {
				cy.shareLink(shareOwner, '/Shared-Folder', { permissions: 13 }).then((token) => {
					cy.logout()

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					cy.get('tr[data-cy-files-list-row-name="Subfolder"]')
						.should('be.visible')
						.click()

					cy.newFileFromMenu('document', 'MyNewFile')
					waitForCollabora()

					// Make sure the document is still in the correct subfolder
					cy.reload()
					cy.get('tr[data-cy-files-list-row-name="MyNewFile.odt"]')
						.should('be.visible')
				})
			})
		})
	})
})

function waitForCollabora() {
	cy.waitForViewer()
	cy.waitForCollabora()
	cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

	cy.get('@loleafletframe').within(() => {
		cy.get('#closebutton').click()
		cy.waitForViewerClose()
	})
}
