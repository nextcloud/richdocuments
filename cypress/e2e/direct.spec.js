/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
		auth: { user: user.userId, pass: user.password },
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

})
