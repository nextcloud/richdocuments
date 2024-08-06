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

describe('Create templates with fields', () => {
	let randUser
	let templateId

	before(() => {
		cy.createRandomUser().then(user => {
			randUser = user

			cy.login(randUser)
			cy.visit('/apps/files')
			
			// Create a templates folder
			cy.get('.files-list__header div[menu-title="New"] button')
				.should('be.visible')
				.as('newFileMenu')

			cy.get('@newFileMenu').click()
			cy.get('button[role="menuitem"]').contains('Create templates folder').click()

			cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

			// Upload the fixtures into the templates folder
			cy.uploadFile(
				randUser,
				'templates/document_template_with_fields.odt',
				'application/vnd.oasis.opendocument.text',
				'/Templates/document.odt'
			).then(fileId => {
				templateId = fileId
			})
		})
	})

	it('Create a document from a template with fields', () => {
		cy.visit('/apps/files')

		// Create a new document
		cy.get('.files-list__header div[menu-title="New"] button')
			.should('be.visible')
			.as('newFileMenu')

		cy.get('@newFileMenu').click()
		cy.get('button[role="menuitem"]').contains('New document').click()

		cy.get('input[data-cy-files-new-node-dialog-input=""]').type('FileFromTemplateWithFields')
		cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

		// Choose the document template
		cy.get('form.templates-picker__form').as('templatePicker')
		cy.get('@templatePicker').contains('document').click()
		cy.get('@templatePicker').find('input[type="submit"]').click()

		// Enter test values into the template filler
		cy.get('.template-field-modal__content').as('templateFiller')
		cy.get('.template-field-modal__buttons').as('templateFillerButtons')

		cy.get('@templateFiller').find('input[placeholder="Name"]').type('Nextcloud')
		cy.get('@templateFiller').find('input[placeholder="Favorite app"]').type('richdocuments')
		cy.get('@templateFillerButtons').find('button[aria-label="Submit button"]').click()

		// Test if the fields currently match the values we passed to the template
		cy.checkTemplateFields([], templateId)
	})
})
