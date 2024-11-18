/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

		cy.get('[data-cy-upload-picker=""]')
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

		cy.get('[data-cy-upload-picker=""]')
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

	before(() => {
		cy.createRandomUser().then(user => {
			randUser = user

			cy.login(randUser)
			cy.visit('/apps/files')

			// Create a templates folder
			cy.get('[data-cy-upload-picker=""]')
				.should('be.visible')
				.as('newFileMenu')

			cy.get('@newFileMenu').click()
			cy.get('button[role="menuitem"]').contains('Create templates folder').click()

			cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

			// Upload the fixtures into the templates folder
			cy.uploadFile(randUser, 'templates/document_template_with_fields.odt', 'application/vnd.oasis.opendocument.text', '/Templates/document.odt')
		})
	})

	it('Create a document from a template with fields', () => {
		const fields = [
			{ type: 'rich-text', alias: 'Name', content: 'Nextcloud' },
			{ type: 'rich-text', alias: 'Favorite app', content: 'richdocuments' },
			{ type: 'checkbox', alias: 'Uses Nextcloud at home', checked: true },
		]

		cy.visit('/apps/files')

		// Create a new document
		cy.get('[data-cy-upload-picker=""]')
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

		// Intercept the POST request to verify the correct fields are submitted
		cy.intercept('POST', '**/templates/create', (req) => {
			const templateFields = Object.values(req.body.templateFields)

			expect(templateFields[0].content).to.equal(fields[0].content)
			expect(templateFields[1].content).to.equal(fields[1].content)

			req.continue()
		}).as('reqFillFields')

		cy.submitTemplateFields(fields)

		// Wait for the response and collect the file ID of the created file
		cy.wait('@reqFillFields').then(({ response }) => {
			cy.wrap(response.body.ocs.data.fileid).as('createdFileId')
		})

		// Test if the fields currently match the values we passed to the template
		cy.get('@createdFileId').then(createdFileId => {
			cy.verifyTemplateFields(fields, createdFileId)
		})
	})
})
