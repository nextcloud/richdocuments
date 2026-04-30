/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Map a mimetype to one of the four type-color families used throughout
 * the overview UI. Returns null for anything we don't surface.
 *
 * @param {string} mimetype the file's mimetype
 * @return {('document'|'spreadsheet'|'presentation'|'pdf'|null)} type family
 */
export function familyFor(mimetype) {
	switch (mimetype) {
	case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
	case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
	case 'application/vnd.oasis.opendocument.text':
	case 'application/vnd.oasis.opendocument.text-template':
		return 'document'
	case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
	case 'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
	case 'application/vnd.oasis.opendocument.spreadsheet':
	case 'application/vnd.oasis.opendocument.spreadsheet-template':
		return 'spreadsheet'
	case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
	case 'application/vnd.openxmlformats-officedocument.presentationml.template':
	case 'application/vnd.oasis.opendocument.presentation':
	case 'application/vnd.oasis.opendocument.presentation-template':
		return 'presentation'
	case 'application/pdf':
		return 'pdf'
	default:
		return null
	}
}

/**
 * Type-family palette. Each entry exposes:
 *   bg: 12% tinted background (for thumbnail surface when no preview)
 *   accent: solid accent (for icon stroke and corner badge)
 *
 * Hues chosen to roughly match the office suite conventions while
 * staying readable in both light and dark themes.
 */
export const TYPE_PALETTE = {
	document: { bg: 'rgba(44, 115, 210, 0.14)', accent: '#2c73d2' },
	spreadsheet: { bg: 'rgba(31, 122, 61, 0.14)', accent: '#1f7a3d' },
	presentation: { bg: 'rgba(210, 71, 38, 0.14)', accent: '#d24726' },
	pdf: { bg: 'rgba(196, 51, 51, 0.14)', accent: '#c43333' },
}

/**
 * Resolve the per-mimetype CSS custom-property bag to set on a row/card
 * root element. Returns an object suitable for `:style="..."`.
 *
 * Components reference the variables (`--type-bg`, `--type-accent`)
 * inside scoped styles so themes can still override them via inheritance.
 *
 * @param {string} mimetype the file's mimetype
 * @return {{'--type-bg': string, '--type-accent': string}} CSS custom-property bag
 */
export function typeStyle(mimetype) {
	const family = familyFor(mimetype)
	const palette = (family && TYPE_PALETTE[family]) || {
		bg: 'var(--color-background-dark)',
		accent: 'var(--color-text-maxcontrast)',
	}
	return {
		'--type-bg': palette.bg,
		'--type-accent': palette.accent,
	}
}
