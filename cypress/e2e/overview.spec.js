/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const CATEGORY_FILES = [
	{
		category: 'Documents',
		emptyMessage: 'No Documents found',
		fixture: 'document.odt',
		mimeType: 'application/vnd.oasis.opendocument.text',
	},
	{
		category: 'Presentations',
		emptyMessage: 'No Presentations found',
		fixture: 'presentation.odp',
		mimeType: 'application/vnd.oasis.opendocument.presentation',
	},
	{
		category: 'Spreadsheets',
		emptyMessage: 'No Spreadsheets found',
		fixture: 'spreadsheet.ods',
		mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
	},
	{
		category: 'Diagrams',
		emptyMessage: 'No Diagrams found',
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
			cy.nextcloudTestingAppConfigSet('richdocuments', 'doc_format', '')
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
					.scrollIntoView()
					.should('be.visible')

				cy.get('.file-card__preview img')
					.should('exist')

				cy.get('.app-navigation-search input[type="search"]')
					.should('have.attr', 'aria-label', `Search ${category}`)
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

			cy.get('.app-navigation-search input[type="search"]').type(stem)
			cy.contains('.file-card__name', fixture).should('be.visible')
		})

		it('Shows empty state when search matches nothing', function() {
			const { category } = CATEGORY_FILES[0]

			cy.contains('.app-navigation-entry', category).click()

			cy.get('.app-navigation-search input[type="search"]').type('xyz123noresults')
			cy.get('.empty-content').should('be.visible')
		})

		it('Resets search when switching categories', function() {
			const [first, second] = CATEGORY_FILES

			cy.contains('.app-navigation-entry', first.category).click()
			cy.get('.app-navigation-search input[type="search"]').type('xyz123noresults')

			cy.contains('.app-navigation-entry', second.category).click()

			cy.get('.app-navigation-search input[type="search"]').should('have.value', '')
			cy.contains('.file-card__name', second.fixture).should('be.visible')
		})
	})

	describe('create from template', function() {
		let randUser

		before(function() {
			cy.createRandomUser().then(user => {
				randUser = user
			})
		})

		beforeEach(function() {
			cy.login(randUser)
			cy.visit('/apps/richdocuments/overview')
			cy.contains('.app-navigation-entry', 'Documents').click()
		})

		it('Opens the create dialog with pre-filled filename when clicking Blank', function() {
			cy.contains('.template-card__name', 'Blank')
				.closest('.template-card')
				.click()

			cy.get('[role="dialog"]').should('be.visible')
			cy.get('[role="dialog"] input[type="text"]').invoke('val').should('match', /\.\w+$/)
		})

		it('Creates a blank file and navigates to it', function() {
			cy.intercept('POST', /templates\/create/).as('createFile')

			cy.contains('.template-card__name', 'Blank')
				.closest('.template-card')
				.click()

			cy.get('[role="dialog"]').within(() => {
				cy.contains('button', 'Create').click()
			})

			cy.wait('@createFile').then(({ request, response }) => {
				expect(request.body).to.have.property('templatePath', '')
				expect(response.statusCode).to.equal(200)
			})

			// After successful creation the page navigates away from the overview
			cy.location('pathname').should('not.include', 'overview')
		})

		it('Shows an error message when creation fails', function() {
			cy.intercept('POST', /templates\/create/, {
				statusCode: 403,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					ocs: {
						meta: { status: 'failure', statuscode: 403, message: 'File already exists' },
						data: {},
					},
				}),
			}).as('createFail')

			cy.contains('.template-card__name', 'Blank')
				.closest('.template-card')
				.click()

			cy.get('[role="dialog"]').within(() => {
				cy.contains('button', 'Create').click()
			})

			cy.wait('@createFail')

			// Dialog stays open and shows the server error message
			cy.get('[role="dialog"]', { timeout: 8000 }).should('contain.text', 'exists')
		})

		it('Uses templateId and templateType from the template when clicking a non-blank template', function() {
			cy.get('.template-section__list .template-card').then($cards => {
				const nonBlank = $cards.filter((_, el) => !el.querySelector('.template-card__name')?.textContent.includes('Blank'))
				if (nonBlank.length === 0) {
					this.skip()
					return
				}

				cy.intercept('POST', /templates\/create/).as('createFromTemplate')

				cy.wrap(nonBlank.first()).click()

				cy.get('[role="dialog"]').within(() => {
					cy.contains('button', 'Create').click()
				})

				cy.wait('@createFromTemplate').then(({ request }) => {
					expect(request.body.templatePath).to.not.equal('')
					expect(request.body.templateType).to.not.equal('user_system')
				})
			})
		})
	})
})
