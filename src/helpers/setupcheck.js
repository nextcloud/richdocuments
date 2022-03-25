/*
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
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

export const SETUP_HINTS = {
	SERVER_STATE_NOT_SETUP: -3,
	SERVER_STATE_LOADING: -2,
	SERVER_STATE_UPDATING: -1,
	SERVER_STATE_OK: 0,

	SERVER_STATE_CONNECTION_ERROR: 2,
	SERVER_STATE_CLIENT_CONNECTION_ERROR: 3,
	PROTOCOL_MISMATCH: 4,
	SERVER_STATE_CONNECTION_ERROR_CAPABILITIES: 5,
}

export const SERVER_MODE = {
	CUSTOM: 'custom',
	BUILTIN: 'builtin',
	DEMO: 'demo',
}
