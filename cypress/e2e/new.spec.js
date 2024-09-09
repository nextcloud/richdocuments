/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
// FIXME: Re-renable once 28 has file creation again working
describe.skip('Create new office files', function() {

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
