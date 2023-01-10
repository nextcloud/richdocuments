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
describe('Create new office files', function() {

	let randUser
	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
		})
	})
	beforeEach(function() {
		cy.login(randUser)
		cy.visit('/apps/files')
	})

	it('Shows create file entries', function() {
		cy.get('.files-controls .button.new')
			.should('be.visible')
			.click()

		cy.get('.newFileMenu', { timeout: 10000 })
			.should('be.visible')
			.contains('.menuitem', 'New document')
			.should('be.visible')
			.find('.icon')
			.should('have.css', 'background-image')

		cy.get('.files-controls .button.new')
			.click()

		cy.get('.newFileMenu', { timeout: 10000 })
			.should('not.be.visible')
	})

	const newFileTypeLabels = [
		'document', 'spreadsheet', 'presentation', 'diagram',
	]
	newFileTypeLabels.forEach((filetype) => {
		it('Create empty ' + filetype + ' file', function() {
			cy.get('.files-controls .button.new')
				.should('be.visible')
				.click()

			cy.get('.newFileMenu', { timeout: 10000 })
				.should('be.visible')
				.contains('.menuitem', 'New ' + filetype)
				.as('menuitem')
				.should('be.visible')
				.click()

			cy.get('@menuitem').find('.filenameform input[type=text]').type('MyNewFile')
			cy.get('@menuitem').find('.filenameform .icon-confirm').click()

			cy.waitForViewer()
			cy.waitForCollabora()

			cy.screenshot('new-file-' + filetype)

			cy.get('@loleafletframe').within(() => {
				cy.get('#closebutton').click()
			})
			cy.get('#viewer', { timeout: 5000 }).should('not.exist')
		})
	})
})
