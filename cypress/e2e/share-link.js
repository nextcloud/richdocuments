/**
 * SPDX-FileLicenseText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

import { User } from '@nextcloud/cypress'
import { randHash } from '../utils/index.js'

const shareOwner = new User(randHash(), randHash())
const otherUser = new User(randHash(), randHash())

describe('Public sharing of office documents', () => {
	before(function() {
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
	})
})

function waitForCollabora() {
	cy.waitForViewer()
	cy.waitForCollabora()
	cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

	cy.get('@loleafletframe').within(() => {
		cy.get('#closebutton').click()
	})

	cy.get('#viewer', { timeout: 5000 }).should('not.exist')
}
