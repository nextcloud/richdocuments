/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// The file picker styles its preview element through CSS modules, so the
// rendered class name carries a suffix specific to the @nextcloud/dialogs
// build. Another app shipping the very same build would style the element
// too, which would make the thumbnail assertions below pass regardless of
// what richdocuments loads.
const previewSelector = '[data-testid="row-name"] > div[class*="file-picker__file-icon"]'

const imageRowSelector = '.file-picker tr[data-testid="file-list-row"][data-filename="image.png"]'

/**
 * Request the insert file picker the way Collabora does for
 * "Insert > Image > Insert from Nextcloud".
 *
 * @return {Cypress.Chainable} the file picker dialog
 */
function openInsertImagePicker() {
	cy.get('[data-cy="coolframe"]').then(($iframe) => {
		cy.dispatchMessageFromOrigin($iframe[0].contentWindow.location.origin, {
			MessageId: 'UI_InsertGraphic',
			Values: {},
		})
	})

	cy.get('.file-picker', { timeout: 10_000 })
		.should('be.visible')

	// The dialog is mounted before the directory listing resolves.
	return cy.get('.file-picker [data-testid="file-list-row"]', { timeout: 10_000 })
		.should('exist')
}

describe('Nextcloud integration', function() {
	let randUser
	let imageFileId

	before(function() {
		cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'notebookbar')
		cy.createRandomUser().then((user) => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'image.png', 'image/png', '/image.png')
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
			cy.visit('/apps/files')

			cy.get('[data-cy-files-list] tr[data-cy-files-list-row-name="image.png"]')
				.as('imageListRow')

			cy.get('@imageListRow')
				.invoke('attr', 'data-cy-files-list-row-fileid')
				.should('match', /^\d+$/)
				.then((fileid) => {
					imageFileId = fileid
				})

			// The file picker is expected to show the same thumbnail the files
			// list shows, so a failure here is a preview problem rather than a
			// file picker one.
			cy.get('@imageListRow')
				.find('.files-list__row-icon img')
				.should('have.attr', 'src')
				.and('match', /\/core\/preview\?/)
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
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="File"]').click()
			cy.get('button#ShareAs-button').click()
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
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="File"]').click()
			cy.get('button[aria-label="See history"]').click()
		})

		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('.app-sidebar-header__mainname')
			.should('be.visible')
			.should('contain.text', filename)

		cy.get('#tab-files_versions').should('be.visible')

		cy.get('#tab-files_versions .version__info__label').contains('Current version')
	})

	it('Save as', function() {
		const exportFilename = 'document.rtf'
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-tabs-container', { timeout: 30_000 })
				.should('be.visible')

			cy.get('button[aria-label="File"]').click()
			cy.get('button[aria-label="Save As"]')
				.should('be.visible', { timeout: 10_000 })
				.click()

			cy.get('#saveas-entries > div')
				.contains('Rich Text (.rtf)')
				.should('be.visible')
				.click()
		})

		cy.get('.saveas-dialog').should('be.visible')
		cy.get('.saveas-dialog input[type=text]')
			.should('be.visible')
			.should('have.value', `/${exportFilename}`)

		cy.get('.saveas-dialog button.button-vue--primary').click()

		// Wait for confirmation from Collabora that the file was saved
		cy.waitForPostMessage('Action_Save_Resp', { success: true, fileName: exportFilename })

		cy.get('@loleafletframe').within(() => {
			cy.get('#closebutton').click()
			cy.waitForViewerClose()
		})

		cy.openFile(exportFilename)
	})

	it('Open locally', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-shortcuts-bar', { timeout: 30_000 })
				.as('shortcuts-bar')

			cy.get('@shortcuts-bar').should('be.visible')

			cy.get('@shortcuts-bar')
				.find('button[aria-label="Open in local editor"]')
				.click()
		})

		cy.get('.confirmation-dialog').should('be.visible')
		cy.get('.confirmation-dialog h1')
			.should('contain', 'Open file locally')

		cy.intercept({
			method: 'POST',
			url: '**/openlocaleditor',
		}).as('getLocalToken')
		cy.window()
			.then((window) => {
				cy.stub(window, 'open').as('open')
			})
		cy.get('.confirmation-dialog button:contains("Open locally")').click()
		cy.wait('@getLocalToken').its('response.statusCode').should('equal', 200)
		cy.get('@open').should('have.been.calledOnce')
		const nextcloudHost = new URL(Cypress.config('baseUrl')).host
		cy.get('@open').its('firstCall.args.0').should('contain', 'nc://open/' + randUser.userId + '@' + nextcloudHost + '/document.odt')
	})

	// TODO: Unskip once there is a viable nightly Docker container
	//       available to the workflows
	it.skip('Insert image', function() {
		cy.get('@loleafletframe').within(() => {
			cy.get('.notebookbar-tabs-container')
				.get('button[aria-label="Insert"]')
				.filter('[role="tab"]')
				.click()

			cy.get('#overflow-button-insert-illustrations')
				.find('button[aria-label="Open Illustrations"]')
				.click()

			cy.get('#insert-insert-graphic')
				.find('button[aria-label="Image"]')
				.click()

			cy.get('#insert-insert-graphic-entry-1').click()
		})
		cy.get('.modal-container__content').should('be.visible')
	})

	it('Shows the image thumbnail in the insert file picker', function() {
		openInsertImagePicker()

		cy.get(imageRowSelector)
			.should('be.visible')
			.find(previewSelector)
			.as('preview')

		// The thumbnail is painted as the background of the preview element.
		// Generating it server side on first request takes a while.
		cy.get('@preview')
			.invoke({ timeout: 15_000 }, 'css', 'background-image')
			.should('match', new RegExp(`/core/preview\\?fileId=${imageFileId}[&"]`))
			.then((backgroundImage) => {
				const previewUrl = backgroundImage.match(/url\("?(.+?)"?\)$/)[1]

				// A preview that cannot be generated falls back to a redirect to
				// the mimetype icon, which is served as image/svg+xml.
				cy.request(previewUrl)
					.its('headers.content-type')
					.should('match', /^image\//)
					.and('not.match', /svg/)
			})

		// Only the file picker stylesheet gives the element a box to paint the
		// thumbnail in. The assertion is made after the background is set, as
		// the fallback icon rendered until then has a size of its own.
		cy.get('@preview')
			.should('be.visible')
			.and(($preview) => {
				expect($preview.width(), 'preview width').to.be.greaterThan(0)
				expect($preview.height(), 'preview height').to.be.greaterThan(0)
			})
	})

	// This covers the insert flow rather than the thumbnails, and passes with or
	// without the file picker stylesheet.
	it('Inserts the file picked from the insert file picker', function() {
		// The beforeEach spy records the messages Collabora posts to the parent
		// window, this one the messages richdocuments posts to the editor frame.
		cy.get('[data-cy="coolframe"]').then(($iframe) => {
			cy.spy($iframe[0].contentWindow, 'postMessage').as('postMessage')
		})

		openInsertImagePicker()

		cy.get(imageRowSelector)
			.should('be.visible')
			.click()
			.should('have.attr', 'aria-selected', 'true')

		cy.get('.file-picker')
			.contains('button', 'Insert file')
			.click()

		cy.waitForPostMessage('Action_InsertGraphic', { filename: 'image.png' })
	})

	describe('Smart picker', function() {
		describe('Link to office document section', function() {
			beforeEach(function() {
				// Proc the smart picker from Collabora
				cy.get('@loleafletframe').within(() => {
					cy.get('#Insert-tab-label').click()
					cy.get('#insert-insert-remote-link-button').click()
				})

				// Wait for the reference picker to show
				cy.get('.reference-picker-modal--content')
					.should('be.visible')
					.as('referencePickerContent')

				// Select "Link to office document section"
				cy.get('@referencePickerContent')
					.find('input[id="provider-select-input"]')
					.as('smartPickerDropdown')
				cy.get('@smartPickerDropdown').click()
				cy.get('@referencePickerContent')
					.find('ul[aria-label="Options"]')
					.should('be.visible')
					.contains('Link to office document section')
					.click()

				// Pick the fixture document
				cy.pickFile('document.odt')
			})

			it('Can link to heading', function() {
				cy.get('[data-cy-section-label="Headings"]').children().first().click()
				cy.get('[data-cy-link-to-section=""]').click()
			})

			it('Can link to section', function() {
				cy.get('[data-cy-section-label="Sections"]').children().first().click()
				cy.get('[data-cy-link-to-section=""]').click()
			})

			it('Can link to image', function() {
				cy.get('[data-cy-section-label="Images"]').children().first().click()
				cy.get('[data-cy-link-to-section=""]').click()
			})
		})
	})
})
