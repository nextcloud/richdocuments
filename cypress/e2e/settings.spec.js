/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/cypress'

const usesHttps = Cypress.env('baseUrl').substr(0, 5) === 'https'
const collaboraUrl = Cypress.env('collaboraUrl')
const defaultFonts = ['AmaticSC-Regular.ttf']

describe('Office admin settings', function() {

	beforeEach(function() {
		cy.login(new User('admin', 'admin'))
		cy.visit('/settings/admin/richdocuments')
		cy.intercept({
		  method: 'POST',
		  url: '/index.php/apps/richdocuments/ajax/admin.php',
		}).as('updateSettings')
	})

	it('Error for invalid url', function() {
		cy.get('#app-content')
			.scrollTo('topLeft')

		cy.get('#app-content')
			.scrollIntoView()
			.should('be.visible')
		cy.screenshot()
		cy.get('#wopi_url')
			.clear()
			.type((usesHttps ? 'https' : 'http') + '://invalid.example.com{enter}')
		cy.wait('@updateSettings').its('response.statusCode').should('equal', 500)
		cy.get('.notecard')
			.first()
			.scrollIntoView()
			.should('be.visible')
			.should('contain.text', 'Could not establish connection to the Collabora Online server.')
		cy.screenshot()
	})

	it('Opens settings and configure a valid url', function() {
		cy.get('#app-content')
			.scrollTo('topLeft')

		cy.get('#app-content')
			.scrollIntoView()
			.should('be.visible')
		cy.screenshot()
		cy.get('#wopi_url')
			.clear()
			.type(collaboraUrl + '{enter}')
		cy.wait('@updateSettings').its('response.statusCode').should('equal', 200)
		cy.get('.notecard')
			.first()
			.scrollIntoView()
			.should('be.visible')
			.should('contain.text', 'Collabora Online server is reachable.')
		cy.screenshot()

		cy.get('#advanced-settings')
			.scrollIntoView()
			.should('be.visible')
		cy.get('#secure-view-settings')
			.scrollIntoView()
			.should('be.visible')

		cy.get('#font-settings')
			.scrollIntoView()
			.should('be.visible')
		defaultFonts.forEach(font => {
			cy.get('.settings-entry.font-list-settings').contains(font)
		})

		cy.get('.settings-section__name')
			.contains('Global Templates')
			.scrollIntoView()
			.should('be.visible')
	})
})
