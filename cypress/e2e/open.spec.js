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

describe('Open existing office files', function() {
	let randUser

	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
			cy.uploadFile(user, 'spreadsheet.ods', 'application/vnd.oasis.opendocument.spreadsheet', '/spreadsheet.ods')
			cy.uploadFile(user, 'presentation.odp', 'application/vnd.oasis.opendocument.presentation', '/presentation.odp')
			cy.uploadFile(user, 'drawing.odg', 'application/vnd.oasis.opendocument.drawing', '/drawing.odg')
		})
	})

	beforeEach(function() {
		cy.login(randUser)
	})

	const fileTests = ['document.odt', 'presentation.odp', 'spreadsheet.ods', 'drawing.odg']
	fileTests.forEach((filename) => {

		it('Classic UI: Open ' + filename + ' the viewer on file click', function() {
			cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'compact')
			cy.login(randUser)

			cy.visit('/apps/files', {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})
			cy.openFile(filename)
			cy.waitForViewer()
			cy.waitForCollabora()

			cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

			// Share action
			cy.wait(2000)
			cy.get('@loleafletframe').within(() => {
				cy.get('#main-menu #menu-file > a').click()
				cy.get('#main-menu #menu-shareas > a').should('be.visible').click()
			})
			cy.verifyOpen(filename)

			// FIXME: wait for sidebar tab content
			// FIXME: validate sharing tab
			cy.screenshot('share-sidebar_' + filename)

			// Validate closing
			cy.closeDocument()
		})

		it('Notebookbar UI: Open ' + filename + ' the viewer on file click', function() {
			cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'tabbed')
			cy.login(randUser)

			cy.visit('/apps/files', {
				onBeforeLoad(win) {
					cy.spy(win, 'postMessage').as('postMessage')
				},
			})
			cy.openFile(filename)
			cy.waitForViewer()
			cy.waitForCollabora()

			cy.screenshot('open-file_' + filename)
			cy.get('@loleafletframe').within(() => {
				cy.get('button.icon-nextcloud-sidebar').click()
			})
			cy.verifyOpen(filename)
			// FIXME: wait for sidebar tab content
			// FIXME: validate sharing tab
			cy.screenshot('share-sidebar_' + filename)

			// Validate closing
			cy.closeDocument()
		})

	})
})

describe('Open PDF with richdocuments', () => {
	let randUser

	before(() => {
		cy.createRandomUser().then((user) => {
			randUser = user

			cy.login(user)
			cy.uploadFile(user, 'document.pdf', 'application/pdf', '/document.pdf')
		})
	})

	beforeEach(() => {
		cy.login(randUser)
		cy.visit('/apps/files')
	})

	// Verify that clicking on the file uses the files PDF viewer
	// and NOT richdocuments
	it('Open PDF with files PDF viewer', () => {
		cy.get('[data-cy-files-list-row-name="document.pdf"]').click()
		cy.waitForViewer()

		// Verify Collabora is not being used
		cy.get('[data-cy="coolframe"]').should('not.exist')

		// Verify the files PDF viewer is being used
		cy.get('.viewer__file--active')
			.its('0.contentDocument')
			.its('body').should('not.be.empty')
			.as('pdfViewer')

		cy.get('@pdfViewer').find('.pdfViewer').should('exist')
	})

	// Verify that using the file action 'Edit with Nextcloud Office'
	// opens the file using richdocuments
	it('Open PDF with richdocuments', () => {
		cy.get('[data-cy-files-list-row-name="document.pdf"]').as('pdf')
		cy.get('@pdf').find('.action-items').as('actions')

		cy.get('@actions').find('.action-item__menutoggle').click()
		cy.get('.action-button__longtext').contains('Edit with Nextcloud Office').click()

		// Wait for Collabora to open
		cy.waitForViewer()
		cy.waitForCollabora()

		// Verify that the correct file is open
		cy.get('@loleafletframe').within(() => {
			cy.get('button.icon-nextcloud-sidebar').click()
		})
		cy.verifyOpen('document.pdf')

		// Make sure we can close the document
		cy.closeDocument()
	})
})
