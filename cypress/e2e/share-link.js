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

	const matrix = [shareOwner, otherUser, null]

	describe('Open a shared file', function() {
		for (const index in matrix) {
			const viewingUser = matrix[index]
			it('Loads file as user: ' + viewingUser?.userId, () => {
				cy.shareLink(shareOwner, '/document.odt').then((token) => {
					if (viewingUser !== null) {
						cy.login(viewingUser)
					} else {
						cy.logout()
					}
					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})
					cy.waitForCollabora()
					cy.get('@loleafletframe').within(() => {
						cy.get('#closebutton').click()
					})
					cy.get('#viewer', { timeout: 5000 }).should('not.exist')
				})
			})
		}
	})

	describe('Open a file in a shared folder', function() {
		for (const index in matrix) {
			const viewingUser = matrix[index]
			it('Loads file in shared folder as user: ' + viewingUser?.userId, () => {
				if (viewingUser !== null) {
					cy.login(viewingUser)
				} else {
					cy.logout()
				}

				cy.shareLink(shareOwner, '/my-share').then((token) => {
					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})
					cy.get('tr[data-file="document.odt"] a.name').click()
					cy.waitForViewer()
					cy.waitForCollabora()
					cy.get('@loleafletframe').within(() => {
						cy.get('#closebutton').click()
					})
					cy.get('#viewer', { timeout: 5000 }).should('not.exist')
				})
			})

		}
	})
})
