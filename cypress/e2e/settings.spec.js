/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/e2e-test-server/cypress'

const usesHttps = Cypress.config('baseUrl').startsWith('https')
const collaboraUrl = Cypress.expose('collaboraUrl')
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
		cy.get('#app-content-vue')
			.scrollTo('topLeft')

		cy.get('#app-content-vue')
			.scrollIntoView()
			.should('be.visible')
		cy.screenshot()
		cy.get('#wopi_url')
			.clear()
			.type((usesHttps ? 'https' : 'http') + '://invalid.example.com{enter}')
		cy.wait('@updateSettings').its('response.statusCode').should('equal', 500)
		cy.contains('.notecard', 'Could not establish connection to the Collabora Online server.')
			.scrollIntoView()
			.should('be.visible')
		cy.screenshot()
	})

	it('Opens settings and configure a valid url', function() {
		cy.get('#app-content-vue')
			.scrollTo('topLeft')

		cy.get('#app-content-vue')
			.scrollIntoView()
			.should('be.visible')
		cy.screenshot()
		cy.get('#wopi_url')
			.clear()
			.type(collaboraUrl + '{enter}')
		cy.wait('@updateSettings').its('response.statusCode').should('equal', 200)
		cy.contains('.notecard', 'Collabora Online server is reachable.')
			.scrollIntoView()
			.should('be.visible')
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
		defaultFonts.forEach((font) => {
			cy.get('.settings-entry.font-list-settings').contains(font)
		})

		cy.get('.settings-section__name')
			.contains('Global Templates')
			.scrollIntoView()
			.should('be.visible')
	})
})

const serverUrl = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')
const davUrl = serverUrl + '/remote.php/dav/systemtags/'
const watermarkUrl = serverUrl + '/index.php/apps/richdocuments/settings/watermark'

/**
 * Create a system tag and resolve its id
 *
 * @param {string} name the tag name
 * @return {Cypress.Chainable<number>} the id of the created tag
 */
function createSystemTag(name) {
	return cy.request('/csrftoken')
		.then(({ body }) => body.token)
		.then((requesttoken) => cy.request({
			method: 'POST',
			url: davUrl,
			headers: { requesttoken, 'Content-Type': 'application/json' },
			body: { name, userVisible: true, userAssignable: true },
		}))
		.then(({ headers }) => Number.parseInt(headers['content-location'].split('/').pop(), 10))
}

/**
 * Delete a system tag
 *
 * @param {number} tagId the id of the tag to delete
 */
function deleteSystemTag(tagId) {
	cy.request('/csrftoken')
		.then(({ body }) => body.token)
		.then((requesttoken) => cy.request({
			method: 'DELETE',
			url: davUrl + tagId,
			headers: { requesttoken },
			failOnStatusCode: false,
		}))
}

describe('Secure view tag enforcement', function() {
	let tagId

	beforeEach(function() {
		cy.login(new User('admin', 'admin'))
		cy.intercept({
			method: 'POST',
			url: '/index.php/apps/richdocuments/ajax/admin.php',
		}).as('updateSettings')
		cy.intercept({
			method: 'POST',
			url: '/index.php/apps/richdocuments/settings/watermark',
		}).as('updateWatermark')

		createSystemTag('secured').then((id) => {
			tagId = id
		})

		cy.visit('/settings/admin/richdocuments')
		cy.get('#wopi_url')
			.clear()
			.type(collaboraUrl + '{enter}')
		cy.wait('@updateSettings').its('response.statusCode').should('equal', 200)
		cy.contains('.notecard', 'Collabora Online server is reachable.')
		cy.get('#secure-view-settings').scrollIntoView().should('be.visible')
	})

	afterEach(function() {
		deleteSystemTag(tagId)
		resetWatermarkSettings()
	})

	/**
	 * Restore the secure view settings to their defaults
	 */
	function resetWatermarkSettings() {
		cy.request('/csrftoken')
			.then(({ body }) => body.token)
			.then((requesttoken) => cy.request({
				method: 'POST',
				url: watermarkUrl,
				headers: { requesttoken },
				body: { settings: { watermark: { enabled: false, allTags: false, allTagsList: [] } } },
			}))
	}

	/**
	 * The tag dropdown, only rendered once secure view is enforced on tagged files
	 *
	 * @return {Cypress.Chainable} the dropdown element
	 */
	function tagSelect() {
		return cy.get('#secure-view-settings .checkbox-details .v-select').first()
	}

	/**
	 * Enable secure view and enforce it on the tag created for this test
	 */
	function enforceSecureViewOnTag() {
		cy.contains('.settings-entry', 'Enable secure view')
			.find('input[type=checkbox]')
			.check({ force: true })
		cy.wait('@updateWatermark')

		cy.contains('.settings-entry', 'Enforce secure view on tagged files')
			.find('input[type=checkbox]')
			.check({ force: true })
		cy.wait('@updateWatermark')

		tagSelect().click()
		cy.contains('.vs__dropdown-menu li', 'secured').click()
		cy.wait('@updateWatermark')
		tagSelect().find('.vs__selected').should('contain', 'secured')
	}

	it('Keeps the tag dropdown usable after an enforced tag is deleted', function() {
		enforceSecureViewOnTag()

		deleteSystemTag(tagId)
		cy.reload()

		tagSelect().find('.vs__selected').should('not.exist')

		tagSelect().click()
		cy.get('.vs__dropdown-menu').should('be.visible')
	})

	it('Allows enforcing another tag after the enforced tag is deleted', function() {
		enforceSecureViewOnTag()

		deleteSystemTag(tagId)
		createSystemTag('replacement').then((id) => {
			tagId = id
		})
		cy.reload()

		tagSelect().click()
		cy.contains('.vs__dropdown-menu li', 'replacement').click()
		cy.wait('@updateWatermark').its('response.statusCode').should('equal', 200)

		cy.reload()
		tagSelect().find('.vs__selected').should('contain', 'replacement')
	})
})
