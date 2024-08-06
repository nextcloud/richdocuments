/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

describe.skip('Create new office files from templates', function() {

	let randUser
	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.createFolder(randUser, 'Templates-user')
			cy.uploadFile(randUser, 'templates/presentation.otp', 'application/vnd.oasis.opendocument.presentation', '/Templates-user/presentation.otp')
			cy.uploadFile(randUser, 'templates/document_template_with_fields.odt', 'application/vnd.oasis.opendocument.text', '/Templates-user/document_template_with_fields.odt')
			cy.setPersonalTemplateFolder(randUser, '/Templates-user')
		})
	})

	it('Create a new file from a user template', function() {
		cy.visit('/apps/files')

		cy.get('.files-list__header div[menu-title="New"] button')
			.should('be.visible')
			.as('newFileMenu')

		cy.get('@newFileMenu').click()
		cy.get('button[role="menuitem"]').contains('New presentation').click()

		cy.get('input[data-cy-files-new-node-dialog-input=""]').type('FileFromTemplate')
		cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

		cy.get('form.templates-picker__form').as('templatePicker')
		cy.get('@templatePicker').contains('presentation').click()
		cy.get('@templatePicker').find('input[type="submit"]').click()

		cy.waitForViewer()
		cy.waitForCollabora()
	})

	it('Create a file from a system template as user', () => {
		cy.uploadSystemTemplate()
		cy.login(randUser)
		cy.visit('/apps/files')

		cy.get('.files-list__header div[menu-title="New"] button')
			.should('be.visible')
			.as('newFileMenu')

		cy.get('@newFileMenu').click()
		cy.get('button[role="menuitem"]').contains('New presentation').click()

		cy.get('input[data-cy-files-new-node-dialog-input=""]').type('FileFromSystemTemplate')
		cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

		cy.get('form.templates-picker__form').as('templatePicker')
		cy.get('@templatePicker').contains('systemtemplate').click()
		cy.get('@templatePicker').find('input[type="submit"]').click()

		cy.waitForViewer()
		cy.waitForCollabora()
	})

	it('Create a file from a system template as guest', () => {
		cy.uploadSystemTemplate()
		cy.createFolder(randUser, '/my-share')

		cy.shareLink(randUser, '/my-share', { permissions: 31 }).then((token) => {
			cy.visit(`/s/${token}`, {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})

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

			cy.get('#template-picker')
				.as('form')
				.should('be.visible')
				.contains('h2', 'systemtemplate')
				.should('be.visible')
				.click()

			cy.get('.oc-dialog').find('button.primary').click()

			cy.waitForViewer()
			cy.waitForCollabora()
		})
	})
})

describe('', () => {
	let randUser

	before(() => {
		cy.createRandomUser().then(user => {
			randUser = user

			cy.createFolder(randUser, 'Templates')
			cy.uploadFile(randUser, 'templates/document_template_with_fields.odt', 'application/vnd.oasis.opendocument.text', '/Templates/document.odt')
			cy.setPersonalTemplateFolder(randUser, '/Templates')
		})
	})

	it.only('Create a file from a template with fields', () => {
		cy.login(randUser)
		cy.visit('/apps/files')

		cy.get('.files-list__header div[menu-title="New"] button')
			.should('be.visible')
			.as('newFileMenu')

		cy.get('@newFileMenu').click()
		cy.get('button[role="menuitem"]').contains('New document').click()

		cy.get('input[data-cy-files-new-node-dialog-input=""]').type('FileFromTemplateWithFields')
		cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

		cy.get('form.templates-picker__form').as('templatePicker')
	})
})
