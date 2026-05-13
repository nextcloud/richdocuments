/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const CATEGORY_FILES = [
	{
		category: 'Documents',
		emptyMessage: 'No documents found',
		fixture: 'document.odt',
		mimeType: 'application/vnd.oasis.opendocument.text',
	},
	{
		category: 'Presentations',
		emptyMessage: 'No presentations found',
		fixture: 'presentation.odp',
		mimeType: 'application/vnd.oasis.opendocument.presentation',
	},
	{
		category: 'Spreadsheets',
		emptyMessage: 'No spreadsheets found',
		fixture: 'spreadsheet.ods',
		mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
	},
]

describe('Office overview page', function() {
	describe('without files', function() {
		let randUser

		before(function() {
			cy.createRandomUser().then(user => {
				randUser = user
			})
		})

		beforeEach(function() {
			cy.login(randUser)
			cy.visit('/apps/richdocuments/overview')
		})

		it('Shows the navigation sidebar with appropriate entries', function() {
			CATEGORY_FILES.forEach(({ category }) => {
				cy.contains('.app-navigation-entry', category).should('exist')
			})
		})

		it('Highlights the active navigation item and shows empty state on click', function() {
			CATEGORY_FILES.forEach(({ category, emptyMessage }) => {
				cy.contains('.app-navigation-entry', category).click()
				cy.contains('.app-navigation-entry', category)
					.should('have.class', 'active')
				cy.get('.empty-content')
					.should('be.visible')
					.and('contain', emptyMessage)
			})
		})
	})

	describe('with files', function() {
		let randUser

		before(function() {
			cy.createRandomUser().then(user => {
				randUser = user
				cy.login(user)
				CATEGORY_FILES.forEach(({ fixture, mimeType }) => {
					cy.uploadFile(user, fixture, mimeType, `/${fixture}`)
				})
			})
		})

		beforeEach(function() {
			cy.login(randUser)
			cy.visit('/apps/richdocuments/overview', {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})
		})

		CATEGORY_FILES.forEach(({ category, fixture }) => {
			it(`Shows ${category} file cards in the correct category`, function() {
				cy.contains('.app-navigation-entry', category).click()

				cy.contains('.file-card__name', fixture)
					.should('be.visible')
			})

			it(`Opens the viewer when clicking a ${category} file card`, function() {
				cy.contains('.app-navigation-entry', category).click()
				cy.contains('.file-card', fixture).click()

				cy.waitForViewer()
				cy.waitForCollabora()

				cy.closeDocument()
			})
		})
	})
})
