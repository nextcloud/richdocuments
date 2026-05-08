/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const NAV_ITEMS = ['Documents', 'Presentations', 'Spreadsheets']

describe('Office overview page', function() {
	let randUser

	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
		})
	})

	beforeEach(function() {
		cy.login(randUser)
		cy.visit('/apps/richdocuments/overview')
	})

	it('Shows the navigation sidebar with appropriate entries', function() {
		NAV_ITEMS.forEach(item => {
			cy.contains('.app-navigation-entry', item).should('exist')
		})
	})

	it('Highlights the active navigation item on click', function() {
		NAV_ITEMS.forEach(item => {
			cy.contains('.app-navigation-entry', item).click()
			cy.contains('.app-navigation-entry', item)
				.should('have.class', 'active')
		})
	})
})
