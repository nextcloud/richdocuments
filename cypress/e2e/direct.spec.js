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

const createDirectEditingLink = (user, fileId) => {
	cy.login(user)
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/richdocuments/api/v1/document?format=json`,
		form: true,
		body: {
			fileId,
		},
		// auth: { user: user.userId, pass: user.password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(response)
		const token = response.body?.ocs?.data?.url
		cy.log(`Created direct editing token for ${user.userId}`, token)
		cy.wrap(token)
	})
}

const createNewFileDirectEditingLink = (user, path, template) => {
	cy.login(user)
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/richdocuments/api/v1/templates/new?format=json`,
		form: true,
		body: {
			path, template,
		},
		// auth: { user: user.userId, pass: user.password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(response)
		const token = response.body?.ocs?.data?.url
		cy.log(`Created direct editing token for ${user.userId}`, token)
		cy.wrap(token)
	})
}

const createDirectEditingLinkForShareToken = (shareToken, host = undefined, path = '', password = undefined) => {
	cy.logout()
	return cy.request({
		method: 'POST',
		url: `${Cypress.env('baseUrl')}/ocs/v2.php/apps/richdocuments/api/v1/share?format=json`,
		form: true,
		body: {
			shareToken,
			host,
			path,
			password,
		},
		// auth: { user: user.userId, pass: user.password },
		headers: {
			'OCS-ApiRequest': 'true',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(response => {
		cy.log(response)
		const token = response.body?.ocs?.data?.url
		cy.log(`Created direct editing token for share link`, token)
		cy.wrap(token)
	})
}

describe('Direct editing (legacy)', function() {
	let randUser
	let fileId

	before(function() {
		cy.createRandomUser().then(user => {
			randUser = user
			cy.login(user)
			cy.uploadFile(user, 'document.odt', 'application/vnd.oasis.opendocument.text', '/document.odt')
				.then((id) => {
					fileId = id
				})
		})
	})

	it('Open an existing file', function() {
		createDirectEditingLink(randUser, fileId)
			.then((token) => {
				cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'classic')
				cy.logout()
				cy.visit(token)
				cy.waitForCollabora(false)
				cy.screenshot('direct')
			})
	})

	it('Open an new file', function() {
		getTemplates(randUser, 'document')
			.then((templates) => {
				const emptyTemplate = templates.find((template) => template.name === 'Empty')
				cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'classic')
				createNewFileDirectEditingLink(randUser, 'mynewfile.odt', emptyTemplate.id)
					.then((token) => {
						cy.logout()
						cy.visit(token)
						cy.waitForCollabora(false)
						cy.screenshot('direct-new')
					})
			})
	})

	it('Open an existing file on a share link', function() {
		cy.shareLink(randUser, '/document.odt').then((token) => {
			createDirectEditingLinkForShareToken(token)
				.then((token) => {
					cy.nextcloudTestingAppConfigSet('richdocuments', 'uiDefaults-UIMode', 'classic')
					cy.logout()
					cy.visit(token)
					cy.waitForCollabora(false)
					cy.screenshot('direct-share-link')
				})
		})
	})

	it('Open a remotely shared file', () => {
		cy.createRandomUser().then(shareRecipient => {
			cy.login(randUser)
			cy.shareFileToRemoteUser(randUser, '/document.odt', shareRecipient)
				.then(incomingFileId => {
					createDirectEditingLink(shareRecipient, incomingFileId)
						.then((token) => {
							cy.logout()
							cy.visit(token)
							cy.waitForCollabora(false)
						})
				})
		})
	})

})
