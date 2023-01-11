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
describe('Create new office files from templates', function() {

	let randUser
	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.createFolder(randUser, 'Templates-user')
			cy.uploadFile(randUser, 'templates/presentation.otp', 'application/vnd.oasis.opendocument.presentation', '/Templates-user/presentation.otp')
			cy.setPersonalTemplateFolder(randUser, '/Templates-user')
		})
	})

	it('Create a new file from a user template', function() {
		cy.visit('/apps/files')
		cy.get('.files-controls .button.new')
			.should('be.visible')
			.click()

		cy.get('.newFileMenu', { timeout: 10000 })
			.should('be.visible')
			.contains('.menuitem', 'New presentation')
			.as('menuitem')
			.should('be.visible')
			.click()

		cy.get('@menuitem').find('.filenameform input[type=text]').type('FileFromTemplate')
		cy.get('@menuitem').find('.filenameform .icon-confirm').click()

		cy.get('.templates-picker__form')
			.as('form')
			.should('be.visible')
			.contains('.template-picker__label', 'presentation')
			.should('be.visible')
			.click()

		cy.get('@form').find('.templates-picker__buttons input[type=submit]').click()

		cy.waitForViewer()
		cy.waitForCollabora()
	})
})
