/**
 * SPDX-FileLicenseText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
		cy.get('#security-warning-state-failure .message')
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
		cy.get('#security-warning-state-ok .message')
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

		// FIXME: Template settings only get visible after reload
		cy.reload()
		cy.get('#richdocuments-templates')
			.scrollIntoView()
			.should('be.visible')

	})
})
