/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

describe('Talk integraiton integration', function() {
	let randUser

	const resetConfig = () => {
		cy.nextcloudTestingAppConfigSet('files', 'watermark_enabled', 'no')
		cy.nextcloudTestingAppConfigSet('files', 'watermark_text', '{userId}')
		cy.nextcloudTestingAppConfigSet('files', 'watermark_shareTalkPublic', 'no')
		cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'notebookbar')
	}

	before(function() {
		resetConfig()
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		})
	})

	afterEach(() => {
		resetConfig()
	})

	const filename = 'document.odt'

	beforeEach(function() {
		cy.login(randUser)
	})

	it('Can share a file to a talk room and open it', function() {
		cy.createTalkRoom(randUser, {
			roomName: 'Test room',
		}).then(room => {
			cy.log(`Created talk room "${room.name}"`, room)
			cy.shareFileToTalkRoom(randUser, filename, room.token)
			cy.visit(`/call/${room.token}`)
			cy.get('.file-preview')
				.should('be.visible')
				.should('contain.text', filename)
				.click()

			cy.waitForViewer()
			cy.waitForCollabora()
		})
	})

	it('See that the file is shared without download', function() {
		cy.nextcloudTestingAppConfigSet('files', 'watermark_enabled', 'yes')
		cy.nextcloudTestingAppConfigSet('files', 'watermark_shareTalkPublic', 'yes')
		cy.nextcloudTestingAppConfigSet('files', 'watermark_text', 'TestingWatermark')

		cy.createTalkRoom(randUser, {
			roomName: 'Secure room',
		}).then(room => {
			cy.log(`Created talk room "${room.name}"`, room)
			cy.shareFileToTalkRoom(randUser, filename, room.token, { permission: 1 })
			cy.makeTalkRoomPublic(randUser, room.token)

			cy.logout()
			cy.clearAllLocalStorage()
			cy.visit(`/call/${room.token}`)
			cy.get('.username-form__input input[type="text"]')
				.should('be.visible')
				.type('Test user{enter}')

			// Assert that the download button is hidden in talk
			cy.get('.messages:contains("document.odt")')
				.trigger('mouseover')

			cy.get('.file-preview')
				.closest('.message')
				.find('button[aria-label="Actions"]')
				.should('be.visible')
				.click()

			cy.get('.action:contains("Download")')
				.should('not.exist')

			// Assert the file is still opening
			cy.get('.file-preview')
				.should('be.visible')
				.should('contain.text', filename)
				// We need to get the href to work around how cypress works with windows
				.invoke('attr', 'href')
				.then((href) => {
					cy.visit(href)

					// FIXME: For some reason this shows up on main but not on stable31
					// cy.get('[data-cy="guestNameModal"]').should('be.visible')
					// cy.inputCollaboraGuestName('A guest')

					cy.waitForCollabora()

					cy.url().then(url => {
						const baseUrl = url.split('?')[0]
						cy.request({
							url: baseUrl + '/download',
							failOnStatusCode: false,
						}).then((response) => {
							expect(response.status).to.eq(403)
						})
					})
				})
		})
	})
})
