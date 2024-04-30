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

describe('Public sharing of office documents', function() {

	before(function() {
		cy.createUser(shareOwner)
		cy.createUser(otherUser)

		cy.createFolder(shareOwner, '/my-share')
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/my-share/document.odt')
	})

	const userMatrix = [shareOwner, otherUser]
	const guestName = randHash()

	describe('Open a shared file', function() {
		for (const index in userMatrix) {
			const viewingUser = userMatrix[index]

			it('Loads file as user: ' + viewingUser?.userId, () => {
				cy.shareLink(shareOwner, '/document.odt').then((token) => {
					cy.login(viewingUser)

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					cy.waitForCollabora()
					cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

					cy.get('@loleafletframe').within(() => {
						cy.get('#closebutton').click()
					})

					cy.get('#viewer', { timeout: 5000 }).should('not.exist')
				})
			})
		}

		it('Loads file as guest: ' + guestName, () => {
			cy.shareLink(shareOwner, '/document.odt').then((token) => {
				cy.logout()

				cy.visit(`/s/${token}`, {
					onBeforeLoad(win) {
						cy.spy(win, 'postMessage').as('postMessage')
					},
				})

				cy.inputCollaboraGuestName(guestName)
				cy.waitForCollabora()
				cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

				cy.get('@loleafletframe').within(() => {
					cy.get('#closebutton').click()
				})

				cy.get('#viewer', { timeout: 5000 }).should('not.exist')
			})
		})
	})

	describe('Open a file in a shared folder', function() {
		for (const index in userMatrix) {
			const viewingUser = userMatrix[index]
			it('Loads file in shared folder as user: ' + viewingUser?.userId, () => {
				cy.login(viewingUser)

				cy.shareLink(shareOwner, '/my-share').then((token) => {
					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					cy.get('tr[data-file="document.odt"] a.name').click()

					cy.waitForViewer()
					cy.waitForCollabora()
					cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

					cy.get('@loleafletframe').within(() => {
						cy.get('#closebutton').click()
					})

					cy.get('#viewer', { timeout: 5000 }).should('not.exist')
				})
			})
		}

		it('Loads file in shared folder as guest: ' + guestName, () => {
			cy.shareLink(shareOwner, '/my-share').then((token) => {
				cy.logout()

				cy.visit(`/s/${token}`, {
					onBeforeLoad(win) {
						cy.spy(win, 'postMessage').as('postMessage')
					},
				})

				cy.get('tr[data-file="document.odt"] a.name').click()

				cy.inputCollaboraGuestName(guestName)
				cy.waitForViewer()
				cy.waitForCollabora()
				cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

				cy.get('@loleafletframe').within(() => {
					cy.get('#closebutton').click()
				})

				cy.get('#viewer', { timeout: 5000 }).should('not.exist')
			})
		})
	})
})
