/**
 * SPDX-FileCopyrightText: 2023 Julius Härtl <jus@bitgrid.net>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
export const getSearchParams = url => {
	return url
		.split(/[?&]/)
		.reduce((acc, cur) => {
			const parts = cur.split('=')
			parts[1] && (acc[parts[0]] = parts[1])
			return acc
		}, {})
}

export const randHash = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
