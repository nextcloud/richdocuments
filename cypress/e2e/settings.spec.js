/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/cypress'

const usesHttps = Cypress.env('baseUrl').substr(0, 5) === 'https'
const collaboraUrl = Cypress.env('collaboraUrl')

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

		cy.get('.settings-section__name')
			.contains('Global Templates')
			.scrollIntoView()
			.should('be.visible')
	})
})

describe('Custom Fonts', function() {
	const defaultFonts = ['AmaticSC-Regular.ttf']

	beforeEach(function() {
		cy.login(new User('admin', 'admin'))
		cy.visit('/settings/admin/richdocuments')

		cy.get('.settings-section__name')
			.contains('Custom Fonts')
			.scrollIntoView()
			.should('be.visible')
	})

	it('Can delete a font', function() {
		cy.intercept({
			method: 'DELETE',
			url: `**/richdocuments/settings/fonts/${defaultFonts[0]}`,
		}).as('deleteFontRequest')

		cy.get(`button[aria-label="Delete ${defaultFonts[0]}"]`)
			.click({ force: true })

		cy.wait('@deleteFontRequest').its('response.statusCode').should('eq', 200)
	})

	it('Can upload a font file', function() {
		cy.intercept({
			method: 'POST',
			url: '**/richdocuments/settings/fonts',
		}).as('uploadFontRequest')

		cy.uploadInputFile({
			identifier: 'newFontInput',
			fixturePath: `fonts/${defaultFonts[0]}`,
			fileName: defaultFonts[0],
			mimeType: 'font/ttf',
		})

		cy.wait('@uploadFontRequest').its('response.statusCode').should('eq', 200)
	})
})
