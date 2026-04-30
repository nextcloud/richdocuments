/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { translate as t } from '@nextcloud/l10n'

/**
 * Bucket a list of items into date groups based on each item's `mtime`.
 *
 * Buckets, in order:
 *   - today
 *   - yesterday
 *   - this-week (the rest of the current week up to last Monday)
 *   - this-month (the rest of the current month)
 *   - older
 *
 * Empty buckets are filtered out so the consumer can iterate the result
 * directly without rendering empty section headers.
 *
 * @param {Array<{mtime?: number}>} items document items, each with a unix mtime
 * @param {number} [now] override "now" for testing (ms epoch)
 * @return {Array<{key: string, title: string, items: Array}>} ordered, non-empty groups
 */
export function groupItemsByDate(items, now = Date.now()) {
	const today = new Date(now)
	today.setHours(0, 0, 0, 0)

	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)

	// Start of the ISO-ish week — last Monday.
	const dow = today.getDay() // 0 (Sun) .. 6 (Sat)
	const daysSinceMonday = dow === 0 ? 6 : dow - 1
	const weekStart = new Date(today)
	weekStart.setDate(weekStart.getDate() - daysSinceMonday)

	const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

	const buckets = {
		today: { key: 'today', title: t('richdocuments', 'Today'), items: [] },
		yesterday: { key: 'yesterday', title: t('richdocuments', 'Yesterday'), items: [] },
		week: { key: 'week', title: t('richdocuments', 'Earlier this week'), items: [] },
		month: { key: 'month', title: t('richdocuments', 'Earlier this month'), items: [] },
		older: { key: 'older', title: t('richdocuments', 'Older'), items: [] },
	}

	for (const item of items) {
		const ms = (item.mtime ?? 0) * 1000
		const itemDay = new Date(ms)
		itemDay.setHours(0, 0, 0, 0)
		const dayMs = itemDay.getTime()

		if (dayMs >= today.getTime()) {
			buckets.today.items.push(item)
		} else if (dayMs >= yesterday.getTime()) {
			buckets.yesterday.items.push(item)
		} else if (dayMs >= weekStart.getTime()) {
			buckets.week.items.push(item)
		} else if (dayMs >= monthStart.getTime()) {
			buckets.month.items.push(item)
		} else {
			buckets.older.items.push(item)
		}
	}

	return Object.values(buckets).filter(b => b.items.length > 0)
}
