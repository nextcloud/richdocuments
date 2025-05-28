/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

describe('Nextcloud integration', function() {
	let randUser

	before(function() {
		cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'notebookbar')
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
			cy.uploadFile(randUser, 'image.png', 'image/png', '/image.png')
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		})
	})

	const filename = 'document.odt'

	beforeEach(function() {
		cy.login(randUser)
		cy.visit('/apps/files', {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})
		cy.openFile(filename)
		cy.waitForViewer()
		cy.waitForCollabora()
	})

	it('Sharing sidebar', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="File"]').click()
			cy.get('button#ShareAs-button').click()
		})

		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('.app-sidebar-header__mainname')
			.should('be.visible')
			.should('contain.text', filename)

		cy.get('#tab-sharing').should('be.visible')
	})

	it('Versions sidebar', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="File"]').click()
			cy.get('button[aria-label="See history"]').click()
		})

		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('.app-sidebar-header__mainname')
			.should('be.visible')
			.should('contain.text', filename)

		cy.get('#tab-version_vue').should('be.visible')

		cy.get('#tab-version_vue .version__info__label').contains('Current version')
	})

	it.skip('Save as', function() {
		const exportFilename = 'document.rtf'
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="File"]').click()
			cy.get('button[aria-label="Save As"]').click()

			cy.get('#saveas-entries #saveas-entry-1').click()
		})


        cy.get('.saveas-dialog').should('be.visible')
        cy.get('.saveas-dialog input[type=text]')
            .should('be.visible')
            .should('have.value', `/${exportFilename}`)

        cy.get('.saveas-dialog button.button-vue--vue-primary').click()

        cy.get('@loleafletframe').within(() => {
            cy.get('#closebutton').click()
            cy.waitForViewerClose()
        })

        // FIXME: We should not need to reload
        cy.get('.breadcrumb__crumbs a').eq(0).click({ force: true })

        cy.openFile(exportFilename)
	})

	it('Open locally', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-shortcuts-bar', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="Open in local editor"]').click()
		})

		cy.get('.confirmation-dialog').should('be.visible')
		cy.get('.confirmation-dialog h1')
			.should('contain', 'Open file locally')

		cy.intercept({
			method: 'POST',
			url: '**/openlocaleditor',
		}).as('getLocalToken')
		cy.window()
			.then((window) => {
			  cy.stub(window, 'open').as('open')
			})
		cy.get('.confirmation-dialog button:contains("Open locally")').click()
		cy.wait('@getLocalToken').its('response.statusCode').should('equal', 200)
		cy.get('@open').should('have.been.calledOnce')
		const nextcloudHost = new URL(Cypress.config('baseUrl')).host
		cy.get('@open').its('firstCall.args.0').should('contain', 'nc://open/' + randUser.userId + '@' + nextcloudHost + '/document.odt')
	})

	it('Insert image', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#Insert-tab-label').click()
			cy.get('#insert-insert-graphic-button').click()
			cy.get('#insert-insert-graphic-entries #insert-insert-graphic-entry-1').click()
		})
		cy.get('.modal-container__content').should('be.visible')
	})

	describe('Smart picker', function() {
		describe('Link to office document section', function() {
			beforeEach(function() {
				// Proc the smart picker from Collabora
				cy.get('@loleafletframe').within(() => {
					cy.get('#Insert-tab-label').click()
					cy.get('#insert-insert-remote-link-button').click()
				})

				// Wait for the reference picker to show
				cy.get('.reference-picker-modal--content')
					.should('be.visible')
					.as('referencePickerContent')

				// Select "Link to office document section"
				cy.get('@referencePickerContent')
					.find('input[id="provider-select-input"]')
					.as('smartPickerDropdown')
				cy.get('@smartPickerDropdown').click()
				cy.get('@referencePickerContent')
					.find('ul[aria-label="Options"]')
					.should('be.visible')
					.contains('Link to office document section')
					.click()

				// Pick the fixture document
				cy.pickFile('document.odt')
			})

			it.skip('Can link to heading', function() {
				cy.get('[data-cy-section-label="Headings"]').children().first().click()
				cy.get('[data-cy-link-to-section=""]').click()
			})

			it.skip('Can link to section', function() {
				cy.get('[data-cy-section-label="Sections"]').children().first().click()
				cy.get('[data-cy-link-to-section=""]').click()
			})

			it.skip('Can link to image', function() {
				cy.get('[data-cy-section-label="Images"]').children().first().click()
				cy.get('[data-cy-link-to-section=""]').click()
			})
		})
	})
})