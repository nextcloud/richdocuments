/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {User} from "@nextcloud/cypress";

describe('Global templates', function() {

	let randUser
	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.createFolder(randUser, 'Templates-user')
			cy.uploadFile(randUser, 'templates/presentation.otp', 'application/vnd.oasis.opendocument.presentation', '/Templates-user/presentation.otp')
			cy.setPersonalTemplateFolder(randUser, '/Templates-user')
		})
	})

	it('Can be uploaded', function() {
		cy.intercept('POST', '**/richdocuments/template').as('templateUploadRequest')
		cy.uploadSystemTemplate({
			fixturePath: 'templates/presentation.otp',
			fileName: 'systemtemplate.otp',
			mimeType: 'application/vnd.oasis.opendocument.presentation-template',
		})

		cy.wait('@templateUploadRequest').then(({ response }) => {
			expect(response.statusCode).to.equal(201)
			expect(response.body.data.name).to.equal('systemtemplate.otp')
			expect(response.body.data.type).to.equal('presentation')
		})
	})

	it('Can prevent uploading a duplicate', function() {
		cy.uploadSystemTemplate({
			fixturePath: 'templates/presentation.otp',
			fileName: 'systemtemplate.otp',
			mimeType: 'application/vnd.oasis.opendocument.presentation-template',
		})

		cy.get('.toast-error').contains('Template "systemtemplate.otp" already exists').should('be.visible')
	})

	it('Can be deleted', function() {
		cy.login(new User('admin', 'admin'))
		cy.visit('/settings/admin/richdocuments')

		cy.get('.settings-section__name')
			.contains('Global Templates')
			.scrollIntoView()

		cy.intercept('DELETE', '**/richdocuments/template/*').as('templateDeleteRequest')
		cy.get('.template-btn[data-cy-template-btn-name="systemtemplate"]').click()

		cy.wait('@templateDeleteRequest').then(({ response }) => {
			expect(response.statusCode).to.equal(204)
		})
	})

	it('Can be created by a user', () => {
		cy.uploadSystemTemplate({
			fixturePath: 'templates/presentation.otp',
			fileName: 'systemtemplate.otp',
			mimeType: 'application/vnd.oasis.opendocument.presentation-template',
		})

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

		cy.intercept('POST', '**/templates/create').as('templateCreateRequest')
		cy.get('@templatePicker').find('input[type="submit"]').click()

		cy.wait('@templateCreateRequest').then(({ response }) => {
			expect(response.statusCode).to.equal(200)
			expect(response.body.ocs.data.basename).to.equal('FileFromSystemTemplate.odp')
		})

		cy.waitForViewer()
		cy.waitForCollabora()
	})

	// FIXME: Unskip once server API for new menu entries works on public shares
	// https://github.com/nextcloud/richdocuments/issues/3170
	it.skip('Create a file from a system template as guest', () => {
		cy.uploadSystemTemplate()
		cy.createFolder(randUser, '/my-share')

		cy.shareLink(randUser, '/my-share', { permissions: 31 }).then((token) => {
			cy.visit(`/s/${token}`, {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})

			cy.get('[data-cy-upload-picker=""]')
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

describe('User templates', function() {
	it.skip('Create a new file from a user template', function() {
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

		it.skip('Create a document from a template with fields', () => {
			const fields = [
				{ index: 'ContentControls.ByIndex.0', type: 'rich-text', alias: 'Name', content: 'Nextcloud' },
				{ index: 'ContentControls.ByIndex.1', type: 'rich-text', alias: 'Favorite app', content: 'richdocuments' },
				{ index: 'ContentControls.ByIndex.2', type: 'checkbox', alias: 'Uses Nextcloud at home', checked: true },

				{ index: 'ContentControls.ByIndex.3', type: 'rich-text', alias: '', content: '' },
				{ index: 'ContentControls.ByIndex.4', type: 'checkbox', alias: '', checked: false },
			]

			// Intercept the initial templates request to ensure it does not get the fields yet
			cy.intercept(
				'GET',
				'**/apps/files/api/v1/templates',
				(req) => req.continue(),
			).as('templatesRequest')

			// Intercept the POST request to verify the correct fields are submitted
			cy.intercept('POST', '**/templates/create', (req) => {
				const templateFields = Object.values(req.body.templateFields)

				expect(templateFields[0].content).to.equal(fields[0].content)
				expect(templateFields[1].content).to.equal(fields[1].content)

				req.continue()
			}).as('reqFillFields')

			cy.visit('/apps/files')

			// Create a new document
			cy.get('[data-cy-upload-picker=""]')
				.should('be.visible')
				.as('newFileMenu')

			cy.get('@newFileMenu').click()
			cy.get('button[role="menuitem"]').contains('New document').click()

			cy.get('input[data-cy-files-new-node-dialog-input=""]').type('FileFromTemplateWithFields')
			cy.get('button[data-cy-files-new-node-dialog-submit=""]').click()

			// Ensure the template fields array is of length 0, meaning no fields were fetched
			cy.wait('@templatesRequest').then(({ response }) => {
				const templates = response.body.ocs.data
				const template = templates[1].templates[0]

				expect(template.fields.length).to.equal(0)
			})

			// Choose the document template
			cy.get('form.templates-picker__form').as('templatePicker')
			cy.get('@templatePicker').contains('document').click()
			cy.get('@templatePicker').find('input[type="submit"]').click()

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
})
