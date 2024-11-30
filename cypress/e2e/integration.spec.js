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
			cy.get('#File-tab-label').click()
			cy.get('#ShareAs-button').click()
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
			cy.get('#File-tab-label').click()
			cy.get('#Rev-History-button').click()
		})

		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('.app-sidebar-header__mainname')
			.should('be.visible')
			.should('contain.text', filename)

		cy.get('#tab-version_vue').should('be.visible')

		cy.get('#tab-version_vue .list-item-content__name').contains('Current version')
	})

	it('Save as', function() {
		const exportFilename = 'document.rtf'
		cy.get('@loleafletframe').within(() => {
			cy.get('#File-tab-label').click()
			cy.get('#saveas').click()
			cy.get('#saveas-entries #saveas-entry-1').click()
		})

		cy.get('.oc-dialog').should('be.visible')
		cy.get('.oc-dialog input[type=text]')
			.should('be.visible')
			.should('have.value', exportFilename)

		cy.get('.oc-dialog button.primary').click()

		cy.get('@loleafletframe').within(() => {
			cy.get('#closebutton').click()
			cy.waitForViewerClose()
		})

		// FIXME: We should not need to reload
		cy.get('.breadcrumb__crumbs a').eq(0).click()

		cy.openFile(exportFilename)
	})

	it('Open locally', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#Open_Local_Editor').click()
		})

		cy.get('.oc-dialog').should('be.visible')
		cy.get('.oc-dialog .oc-dialog-title')
			.should('contain', 'Open file locally ')

		cy.intercept({
			method: 'POST',
			url: '**/openlocaleditor',
		}).as('getLocalToken')
		cy.window()
			.then((window) => {
			  cy.stub(window, 'open').as('open')
			})
		cy.get('.oc-dialog button.primary').click()
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

	it('Smart picker', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#Insert-tab-label').click()
			cy.get('#insert-insert-remote-link-button').click()
		})
		cy.get('.reference-picker-modal--content').should('be.visible')
	})
})
