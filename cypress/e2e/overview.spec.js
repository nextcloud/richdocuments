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
	{
		category: 'Diagrams',
		emptyMessage: 'No diagrams found',
		fixture: 'drawing.odg',
		mimeType: 'application/vnd.oasis.opendocument.graphics',
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

				cy.createFolder(user, 'subfolder').then(() => {
					CATEGORY_FILES.forEach(({ fixture, mimeType }) => {
						cy.uploadFile(user, fixture, mimeType, `/subfolder/${fixture}`)
					})
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

				cy.get('.file-card__preview img')
					.should('exist')

				cy.get('.input-field__label')
					.should('contain', `Search ${category.toLowerCase()}`)
			})

			it(`Opens the viewer when clicking a ${category} file card`, function() {
				cy.contains('.app-navigation-entry', category).click()
				cy.contains('.file-card', fixture).click()

				cy.waitForViewer()
				cy.waitForCollabora()

				cy.closeDocument()
			})
		})

		it('Shows file cards for files in subdirectories', function() {
			CATEGORY_FILES.forEach(({ category }) => {
				cy.contains('.app-navigation-entry', category).click()
				cy.get('.file-card').should('have.length.at.least', 2)
			})
		})

		it('Filters file cards by search query', function() {
			const { category, fixture } = CATEGORY_FILES[0]
			const stem = fixture.split('.')[0]

			cy.contains('.app-navigation-entry', category).click()

			cy.get('.office-overview__search [type="search"]').type(stem)
			cy.contains('.file-card__name', fixture).should('be.visible')
		})

		it('Shows empty state when search matches nothing', function() {
			const { category } = CATEGORY_FILES[0]

			cy.contains('.app-navigation-entry', category).click()

			cy.get('.office-overview__search [type="search"]').type('xyz123noresults')
			cy.get('.empty-content').should('be.visible')
		})

		it('Resets search when switching categories', function() {
			const [first, second] = CATEGORY_FILES

			cy.contains('.app-navigation-entry', first.category).click()
			cy.get('.office-overview__search [type="search"]').type('xyz123noresults')

			cy.contains('.app-navigation-entry', second.category).click()

			cy.get('.office-overview__search [type="search"]').should('have.value', '')
			cy.contains('.file-card__name', second.fixture).should('be.visible')
		})
	})
})
