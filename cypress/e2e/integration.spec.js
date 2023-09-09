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
			cy.get('#ShareAs').click()
		})

		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('.app-sidebar-header__maintitle')
			.should('be.visible')
			.should('contain.text', filename)

		cy.get('#tab-sharing').should('be.visible')
	})

	it('Versions sidebar', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#File-tab-label').click()
			cy.get('#Rev-History').click()
		})

		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('.app-sidebar-header__maintitle')
			.should('be.visible')
			.should('contain.text', filename)

		cy.get('#tab-version_vue').should('be.visible')

		cy.get('#tab-version_vue .line-one__title').contains('Current version')
	})

	it('Save as', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#File-tab-label').click()
			cy.get('#saveas').click()
			cy.get('#w2ui-overlay-download-as-menu .menu-text').eq(1).click()
		})

		cy.get('.oc-dialog').should('be.visible')
		cy.get('.oc-dialog input[type=text]')
			.should('be.visible')
			.should('have.value', 'document.rtf')

		cy.get('.oc-dialog button.primary').click()

		cy.get('@loleafletframe').within(() => {
			cy.get('#closebutton').click()
		})
		cy.get('#viewer', { timeout: 5000 }).should('not.exist')

		// FIXME: We should not need to reload
		cy.get('.breadcrumb .crumbhome').eq(0).click()

		cy.openFile('document.rtf')
	})

	it('Open locally', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#Open_Local_Editor').click()
		})

		cy.get('.oc-dialog').should('be.visible')
		cy.get('.oc-dialog .oc-dialog-title')
			.should('contain', 'Open file locally ')

		cy.on('url:changed', (newUrl) => {
			expect(newUrl).to.contain('nc://')
		})
		cy.get('.oc-dialog button.primary').click()

	})

	it('Insert image', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#Insert-tab-label').click()
			cy.get('#insert-insert-graphic').click()
			cy.get('#w2ui-overlay-insert-graphic-menu .menu-text').eq(1).click()
		})
		cy.get('.modal-container').should('be.visible')
	})

	it('Smart picker', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('#Insert-tab-label').click()
			cy.get('#insert-insert-remote-link').click()
		})
		cy.get('.reference-picker-modal--content').should('be.visible')
	})
})
