/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

describe('New file menu', function() {

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
		cy.get('form[data-cy-upload-picker=""]')
			.should('be.visible')
			.click()

		cy.get('button[role="menuitem"]')
			.contains('New document')
			.should('be.visible')

		cy.get('form[data-cy-upload-picker=""]')
			.click()

		cy.get('li[data-cy-upload-picker-menu-entry="upload-file"]')
			.should('not.be.visible')
	})

	describe('Creates a new file', function() {
		const newFileTypeLabels = [
			'document', 'spreadsheet', 'presentation', 'diagram',
		]
		newFileTypeLabels.forEach((filetype) => {
			it('Create empty ' + filetype + ' file', function() {
				cy.newFileFromMenu(filetype, 'MyNewFile')
				cy.waitForViewer()
				cy.waitForCollabora()

				cy.screenshot('new-file-' + filetype)

				cy.closeDocument()
			})
		})
	})
})
