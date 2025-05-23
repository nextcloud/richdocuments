/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { basename } from 'path'
import axios from '@nextcloud/axios'
import { User, addCommands } from '@nextcloud/cypress'

addCommands()

const url = Cypress.config('baseUrl').replace(/\/index.php\/?$/g, '')
Cypress.env('baseUrl', url)

Cypress.Commands.add('logout', (route = '/') => {
	cy.session('_guest', function() {
	})
})

Cypress.Commands.add('createFolder', (user, target) => {
	cy.login(user)
	const rootPath = `${Cypress.env('baseUrl')}/remote.php/dav/files/${encodeURIComponent(user.userId)}`
	const dirPath = target.split('/').map(encodeURIComponent).join('/')

	return cy.request('/csrftoken')
		.then(({ body }) => body.token)
		.then(requesttoken => {
			return cy.request({
				url: `${rootPath}/${dirPath}`,
				method: 'MKCOL',
				headers: {
					requesttoken,
				},
			})
		})
})

/**
 * cy.uploadedFile - uploads a file from the fixtures folder
 *
 * @param {User} user the owner of the file, e.g. admin
 * @param {string} fixture the fixture file name, e.g. image1.jpg
 * @param {string} mimeType e.g. image/png
 * @param {string} [target] the target of the file relative to the user root
 */
Cypress.Commands.add('uploadFile', (user, fixture, mimeType, target = `/${fixture}`) => {
	cy.login(user)
	const fileName = basename(target)

	// get fixture
	return cy.fixture(fixture, 'base64').then(async file => {
		// convert the base64 string to a blob
		const blob = Cypress.Blob.base64StringToBlob(file, mimeType)

		// Process paths
		const rootPath = `${Cypress.env('baseUrl')}/remote.php/dav/files/${encodeURIComponent(user.userId)}`
		const filePath = target.split('/').map(encodeURIComponent).join('/')
		try {
			const file = new File([blob], fileName, { type: mimeType })
			cy.request('/csrftoken')
				.then(({ body }) => body.token)
				.then(requesttoken => {
					return axios.put(`${rootPath}/${filePath}`, file, {
						headers: {
							requesttoken,
							'Content-Type': mimeType,
						},
					}).then(response => {
						const fileId = Number( response.headers['oc-fileid']?.split('oc')?.[0])
						cy.log(`Uploaded ${fileName}`,
							response.status,
							{ fileId }
						)
						cy.wrap(fileId)
					})
				})
		} catch (error) {
			cy.log(error)
			throw new Error(`Unable to process fixture ${fixture}`)
		}
	})

})

Cypress.Commands.add('ocsRequest', (user, options) => {
	const auth = user ? { user: user.userId, password: user.password } : null
	return cy.request({
		form: true,
		auth,
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		...options,
	})
})
Cypress.Commands.add('shareFileToUser', (user, path, targetUser, shareData = {}) => {
	cy.login(user)
	cy.ocsRequest(user, {
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/shares?format=json`,
		body: {
			path,
			shareType: 0,
			shareWith: targetUser.userId,
			...shareData,
		},
	}).then(response => {
		cy.log(`${user.userId} shared ${path} with ${targetUser.userId}`, response.status)
	})
})

Cypress.Commands.add('shareFileToTalkRoom', (user, path, roomId, shareData = {}) => {
	cy.login(user)
	cy.ocsRequest(user, {
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/shares?format=json`,
		body: {
			path,
			shareType: 10,
			shareWith: roomId,
			...shareData,
		},
	}).then(response => {
		cy.log(`${user.userId} shared ${path} with talk room ${roomId}`, response.status)
	})
})

Cypress.Commands.add('shareFileToRemoteUser', (user, path, targetUser, shareData = {}) => {
	cy.login(user)
	const federatedId = `${targetUser.userId}@${url}`
	return cy.ocsRequest(user, {
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/shares?format=json`,
		body: {
			path,
			shareType: 6,
			permission: 31,
			shareWith: federatedId,
			...shareData,
		},
	}).then(response => {
		cy.log(`${user.userId} shared ${path} with ${federatedId}`, response.status)
		cy.login(targetUser)
		return cy.ocsRequest(targetUser, {
			method: 'GET',
			url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/remote_shares/pending?format=json`,
		})
	}).then(({ body }) => {
		for (const index in body.ocs.data) {
			cy.ocsRequest(targetUser, {
				method: 'POST',
				url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/remote_shares/pending/${body.ocs.data[index].id}`,
			})
			return cy.wrap(body.ocs.data[index].id)
		}
	}).then((shareId) => {
		cy.ocsRequest(targetUser, {
			method: 'GET',
			url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/remote_shares/${shareId}?format=json`,
		}).then((response) => {
			cy.login(user)
			return cy.wrap(response.body.ocs.data['file_id'])
		})
	})
})

Cypress.Commands.add('shareLink', (user, path, shareData = {}) => {
	cy.login(user)
	cy.ocsRequest(user, {
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/files_sharing/api/v1/shares?format=json`,
		body: {
			path,
			shareType: 3,
			...shareData,
		},
	}).then(response => {
		const token = response.body.ocs.data.token
		cy.log(`${user.userId} shared ${path} as a link with token ${token}`, response.status)
		cy.wrap(token)
	})
})

Cypress.Commands.add('openFile', fileName => {
	cy.get(`[data-cy-files-list] tr[data-cy-files-list-row-name="${fileName}"] [data-cy-files-list-row-name-link]`).click()
})

Cypress.Commands.add('nextcloudEnableApp', (appId) => {
	cy.login(new User('admin', 'admin'))
	cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v1.php/cloud/apps/${appId}?format=json`,
		form: true,
		auth: { user: 'admin', pass: 'admin' },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(`Enabled app ${appId}`, response.status)
	})
})

Cypress.Commands.add('setPersonalTemplateFolder', (user, templateFolder) => {
	cy.login(user)
	templateFolder = templateFolder.split('/').map(encodeURIComponent).join('/')

	return cy.request('/csrftoken')
		.then(({ body }) => body.token)
		.then(requesttoken => {
			return cy.request({
				url: `${Cypress.env('baseUrl')}/index.php/apps/richdocuments/ajax/personal.php`,
				method: 'POST',
				headers: {
					requesttoken,
				},
				body: {
					templateFolder,
				},
			})
		})
})
Cypress.Commands.add('nextcloudTestingAppConfigSet', (appId, configKey, configValue) => {
	cy.login(new User('admin', 'admin'))
	cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v1.php/apps/testing/api/v1/app/${appId}/${configKey}?format=json`,
		auth: { user: 'admin', pass: 'admin' },
		headers: {
			'OCS-ApiRequest': 'true',
			Cookie: '',
		},
		body: {
			value: configValue,
		},
	}).then(response => {
		cy.log(`Set app value app ${appId} ${configKey} ${configValue}`, response.status)
	})
})

Cypress.Commands.add('waitForViewer', () => {
	cy.get('#viewer', { timeout: 50000 })
		.should('be.visible')
		.and('have.class', 'modal-mask')
		.and('not.have.class', 'icon-loading')
})

Cypress.Commands.add('waitForViewerClose', () => {
	cy.get('#viewer', { timeout: 30000 })
		.should('not.exist')
})

Cypress.Commands.add('waitForCollabora', (wrapped = false, federated = false) => {
	const wrappedFrameIdentifier = federated ? 'coolframe' : 'documentframe'
	if (wrapped) {
		cy.get(`[data-cy="${wrappedFrameIdentifier}"]`, { timeout: 30000 })
			.its('0.contentDocument')
			.its('body').should('not.be.empty')
			.should('be.visible').should('not.be.empty')
			.as('collaboraframe')
	}

	const coolFrame = wrapped
		? cy.get('@collaboraframe').find('[data-cy="coolframe"]', { timeout: 30000 })
		: cy.get('[data-cy="coolframe"]')

	coolFrame
		.its('0.contentDocument')
		.its('body').should('not.be.empty')
		.as('loleafletframe')

	cy.get('@loleafletframe')
		.within(() => {
			cy.get('#main-document-content').should('be.visible')
		})

	return cy.get('@loleafletframe')
})

Cypress.Commands.add('waitForPostMessage', (messageId, values = undefined) => {
	cy.get('@postMessage', { timeout: 20000 }).should(spy => {
		const calls = spy.getCalls()
		const findMatchingCall = calls.find(call => call.args[0].indexOf('"MessageId":"' + messageId + '"') !== -1)
		if (!findMatchingCall) {
			return expect(findMatchingCall).to.not.be.undefined
		}
		if (!values) {
			const object = JSON.parse(findMatchingCall.args[0])
			values.forEach(value => {
				expect(object.Values).to.have.property(value, values[value])
			})
		}
	})
})

Cypress.Commands.add('inputCollaboraGuestName', (guestName = 'cloud') => {
	cy.get('[data-cy="guestNameModal"]').should('be.visible')
	cy.get('[data-cy="guestNameInput"]').type(guestName)
	cy.get('[data-cy="guestNameSubmit"]').click()
})

Cypress.Commands.add('closeDocument', () => {
	cy.get('@loleafletframe').within(() => {
		cy.get('#closebutton').click()
	})

	cy.get('#viewer', { timeout: 5000 }).should('not.exist')
})

Cypress.Commands.add('verifyOpen', (filename) => {
	cy.get('input#document-name-input').should(($docName) => {
		expect($docName.val()).to.equal(filename)
	})
})

Cypress.Commands.add('uploadSystemTemplate', ({ fixturePath, fileName, mimeType }) => {
	cy.login(new User('admin', 'admin'))
	cy.visit('/settings/admin/richdocuments')

	cy.get('.settings-section__name')
		.contains('Global Templates')
		.scrollIntoView()

	cy.get('.settings-section input[type="file"]').selectFile({
		contents: `cypress/fixtures/${fixturePath}`,
		fileName,
		mimeType,
	}, { force: true })
})

Cypress.Commands.add('submitTemplateFields', (fields) => {
	// Enter test values into the template filler
	cy.get('.template-field-modal__content').as('templateFiller')
	cy.get('.template-field-modal__buttons').as('templateFillerButtons')

	for (const field of fields) {
		switch (field.type) {

		case 'rich-text':
			if (!field.alias) {
				cy.get('@templateFiller')
					.find(`label[for="text-field${field.index}"]`)
					.should('not.exist')
			} else {
				cy.get('@templateFiller')
					.find(`input[placeholder="${field.alias}"]`)
					.type(field.content)
			}

			break

		case 'checkbox':
			if (!field.alias) {
				cy.get('@templateFiller')
					.find(`input[id="checkbox-field${field.index}`)
					.should('not.exist')
			} else {
				cy.get('@templateFiller')
					.find('span.checkbox-radio-switch__text').contains(field.alias)
					.click()
			}

			break

		default:
			expect.fail('Using a field type not yet supported')
		}
	}

	// Submit the template fields
	cy.get('@templateFillerButtons').find('button[aria-label="Submit button"]').click()
})

Cypress.Commands.add('verifyTemplateFields', (fields, fileId) => {
	const apiEndpoint = '/ocs/v2.php/apps/richdocuments/api/v1/template/fields/extract/'

	cy.request('/csrftoken')
		.then(({ body }) => body.token)
		.as('requestToken')

	cy.get('@requestToken').then(requesttoken => {
		cy.request({
			method: 'GET',
			url: Cypress.env('baseUrl') + apiEndpoint + fileId + '?format=json',
			headers: {
				requesttoken,
			},
		}).then(({ body }) => {
			for (const index in body.ocs.data) {
				const field = body.ocs.data[index]

				// If a field has no name or alias, we don't need
				// to check it because it is not shown in the template filler
				if (!field.alias) {
					continue;
				}

				switch (field.type) {
				case 'rich-text':
					expect(field.content).to.equal(fields[index].content)
					break
				case 'checkbox':
					expect(field.checked).to.equal(fields[index].checked)
					break
				default:
					expect.fail('Using a field type not yet supported')
					break
				}
			}
		})
	})
})

Cypress.Commands.add('pickFile', (filename) => {
	cy.get('.office-target-picker')
		.find(`tr[data-filename="${filename}"]`)
		.click()
	cy.get('.office-target-picker')
		.find('button[aria-label="Select file"]')
		.click()
})

Cypress.Commands.add('createTalkRoom', (user, options = {}) => {
	cy.login(user)
	return cy.ocsRequest(user, {
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/spreed/api/v4/room?format=json`,
		body: {
			roomType: options.roomType || 3, // Default to group conversation
			roomName: options.roomName,
			invite: options.invite || '',
			source: options.source || '',
			objectType: options.objectType || '',
			objectId: options.objectId || '',
			password: options.password || '',
		}
	}).then(response => {
		cy.log(`Created talk room "${options.roomName}"`, response.status)
		return cy.wrap(response.body.ocs.data)
	})
})

Cypress.Commands.add('makeTalkRoomPublic', (user, token, password = '') => {
	cy.login(user)
	return cy.ocsRequest(user, {
		method: 'POST',
		url: `${url}/ocs/v2.php/apps/spreed/api/v4/room/${token}/public?format=json`,
		body: {
			password: password,
		}
	}).then(response => {
		cy.log(`Made talk room public`, response.status)
		return cy.wrap(response.body.ocs.data)
	})
})

