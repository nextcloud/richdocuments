/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { User } from '@nextcloud/e2e-test-server/cypress'
import { randHash } from '../utils/index.js'

const shareOwner = new User(randHash(), randHash())
const otherUser = new User(randHash(), randHash())

describe('Public sharing of office documents', () => {
	before(function() {
		cy.nextcloudTestingAppConfigSet('richdocuments', 'doc_format', '')
		cy.createUser(shareOwner)
		cy.createUser(otherUser)

		cy.createFolder(shareOwner, '/my-share')
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
		cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', '/my-share/document.odt')
	})

	const userMatrix = [shareOwner, otherUser]

	describe('Share with users', () => {
		describe('Readonly file', () => {
			for (const user of userMatrix) {
				it('Loads readonly file as user: ' + user.userId, () => {
					cy.shareLink(shareOwner, '/document.odt').then((token) => {
						cy.login(user)

						cy.visit(`/s/${token}`, {
							onBeforeLoad(win) {
								cy.spy(win, 'postMessage').as('postMessage')
							},
						})

						// Assert that we do not ask for guest name if logged in
						cy.get('[data-cy="guestNameModal"]').should('not.exist')

						waitForCollabora()
					})
				})
			}
		})

		describe('Editable file', () => {
			for (const user of userMatrix) {
				it('Loads editable file as user: ' + user.userId, () => {
					cy.shareLink(shareOwner, '/document.odt', { permissions: 19 }).then((token) => {
						cy.login(user)

						cy.visit(`/s/${token}`, {
							onBeforeLoad(win) {
								cy.spy(win, 'postMessage').as('postMessage')
							},
						})

						// Assert that we do not ask for guest name if logged in
						cy.get('[data-cy="guestNameModal"]').should('not.exist')

						waitForCollabora()
					})
				})
			}
		})
	})

	const guestName = randHash()
	describe('Share with guests', () => {
		describe('Readonly file', () => {
			it('Loads readonly file as guest: ' + guestName, () => {
				cy.shareLink(shareOwner, '/document.odt').then((token) => {
					cy.logout()

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					// Assert that we do not ask for guest name if we can't edit as a guest
					cy.get('[data-cy="guestNameModal"]').should('not.exist')

					waitForCollabora()
				})
			})
		})

		describe('Editable file', () => {
			it('Loads editable file as guest: ' + guestName, () => {
				cy.shareLink(shareOwner, '/document.odt', { permissions: 19 }).then((token) => {
					cy.logout()

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					// Assert that we do ask for guest name if we can edit as a guest
					cy.get('[data-cy="guestNameModal"]').should('be.visible')

					cy.inputCollaboraGuestName(guestName)
					waitForCollabora()
				})
			})
		})

		describe('New file', () => {
			before(() => {
				cy.createFolder(shareOwner, '/Shared-Folder')
				cy.createFolder(shareOwner, '/Shared-Folder/Subfolder')
			})

			it('Creates a new file in a public share as a guest', () => {
				cy.shareLink(shareOwner, '/Shared-Folder', { permissions: 13 }).then((token) => {
					cy.logout()

					cy.visit(`/s/${token}`, {
						onBeforeLoad(win) {
							cy.spy(win, 'postMessage').as('postMessage')
						},
					})

					cy.get('tr[data-cy-files-list-row-name="Subfolder"]')
						.should('be.visible')
						.click()

					cy.newFileFromMenu('document', 'MyNewFile')
					waitForCollabora()

					// Make sure the document is still in the correct subfolder
					cy.reload()
					cy.get('tr[data-cy-files-list-row-name="MyNewFile.odt"]')
						.should('be.visible')
				})
			})
		})

		describe('Activity of a guest edit', () => {
			const activityFile = 'guest-activity-document.odt'

			// A separate file, so that the two guests editing minutes apart are not
			// merged into a single grouped activity with the actors side by side
			const cloudIdFile = 'guest-cloud-id-document.odt'

			// Anything containing an @ is a federated cloud id as far as the files
			// activity provider is concerned, so such a name must not reach it as is
			const cloudIdGuestName = `${randHash()}@example.com`
			const cloudIdActor = `${cloudIdGuestName.replace('@', '')} (Guest)`

			before(() => {
				cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', `/${activityFile}`)
				cy.uploadFile(shareOwner, 'document.odt', 'application/vnd.oasis.opendocument.text', `/${cloudIdFile}`)
			})

			it('Attributes the change to the chosen guest name, not to a remote account', () => {
				editAsGuest(activityFile, guestName)

				cy.getFileChangeActivities(shareOwner, activityFile).then((changes) => {
					expect(changes, `change activities for ${activityFile}`).to.not.be.empty

					// An actor that could not be resolved is substituted into the subject
					// itself, so it never shows up among the subject parameters
					const subjects = changes.map((change) => change.subject_rich[0])
					expect(subjects.join('\n')).to.not.include('remote account')

					const named = changes.find((change) => change.subject_rich[0].includes('{user}'))
					expect(named.subject_rich[1].user.name).to.equal(`${guestName} (Guest)`)
				})
			})

			it('Does not read a guest name containing an @ as a federated account', () => {
				editAsGuest(cloudIdFile, cloudIdGuestName)

				cy.getFileChangeActivities(shareOwner, cloudIdFile).then((changes) => {
					expect(changes, `change activities for ${cloudIdFile}`).to.not.be.empty

					const named = changes.find((change) => change.subject_rich[0].includes('{user}'))
					expect(named, 'a change activity naming an account').to.not.be.undefined

					// A server turns the parameter into a link to an account on another
					// instance, and the id is then only what preceded the @
					expect(named.subject_rich[1].user).to.deep.equal({
						type: 'user',
						id: cloudIdActor,
						name: cloudIdActor,
					})
				})
			})
		})
	})

	describe('Open in local editor', () => {
		it('Does not offer the button to a logged in user on a public share', () => {
			cy.shareLink(shareOwner, '/document.odt', { permissions: 19 }).then((token) => {
				cy.login(otherUser)

				cy.visit(`/s/${token}`)

				cy.waitForViewer()
				cy.waitForCollabora()

				assertNoOpenLocalEditorButton()
			})
		})

		it('Does not offer the button to a guest on a public share', () => {
			cy.shareLink(shareOwner, '/document.odt', { permissions: 19 }).then((token) => {
				cy.logout()

				cy.visit(`/s/${token}`)

				cy.inputCollaboraGuestName(guestName)

				cy.waitForViewer()
				cy.waitForCollabora()

				assertNoOpenLocalEditorButton()
			})
		})
	})
})

/**
 * Assert that richdocuments does not ask Collabora to insert the
 * "Open in local editor" button.
 *
 * Collabora appends integrator buttons in a deferred layouting task, so
 * asserting on the DOM would pass before the button would have been added.
 * Re-dispatching Document_Loaded re-runs the decision synchronously, and
 * Host_PostmessageReady is sent from the same handler immediately before it.
 */
function assertNoOpenLocalEditorButton() {
	cy.get('[data-cy="coolframe"]').then(($iframe) => {
		const collaboraOrigin = $iframe[0].contentWindow.location.origin
		cy.spy($iframe[0].contentWindow, 'postMessage').as('postMessage')

		cy.dispatchMessageFromOrigin(collaboraOrigin, {
			MessageId: 'App_LoadingStatus',
			Values: { Status: 'Document_Loaded' },
		})
		cy.waitForPostMessage('Host_PostmessageReady', undefined, { targetOrigin: collaboraOrigin })
		cy.shouldNotHavePostMessage('Insert_Button', { id: 'Open_Local_Editor' })
	})
}

/**
 * Open a file as a guest on a public share under the given name, change it and
 * close the editor again.
 *
 * @param {string} fileName - the file to share and edit
 * @param {string} name - the name the guest enters when asked
 */
function editAsGuest(fileName, name) {
	cy.shareLink(shareOwner, `/${fileName}`, { permissions: 19 }).then((token) => {
		cy.logout()

		cy.visit(`/s/${token}`, {
			onBeforeLoad(win) {
				cy.spy(win, 'postMessage').as('postMessage')
			},
		})

		cy.inputCollaboraGuestName(name)

		cy.waitForViewer()
		cy.waitForCollabora()
		cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

		cy.editAndSaveInCollabora()

		cy.get('@loleafletframe').within(() => {
			cy.get('#closebutton').click()
			cy.waitForViewerClose()
		})
	})
}

function waitForCollabora() {
	cy.waitForViewer()
	cy.waitForCollabora()
	cy.waitForPostMessage('App_LoadingStatus', { Status: 'Document_Loaded' })

	cy.get('@loleafletframe').within(() => {
		cy.get('#closebutton').click()
		cy.waitForViewerClose()
	})
}
