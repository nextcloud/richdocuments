/*
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
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
 */

// FIXME: Migrate to vue component
export default {
	methods: {
		async saveAs(format) {
			window.OC.dialogs.prompt(
				t('richdocuments', 'Please enter the filename to store the document as.'),
				t('richdocuments', 'Save As'),
				(result, value) => {
					if (result === true && value) {
						this.sendPostMessage('Action_SaveAs', { Filename: value, Notify: true })
					}
				},
				true,
				t('richdocuments', 'New filename'),
				false
			).then(() => {
				const $dialog = $('.oc-dialog:visible')
				const $buttons = $dialog.find('.oc-dialog-buttonrow button')
				$buttons.eq(0).text(t('richdocuments', 'Cancel'))
				$buttons.eq(1).text(t('richdocuments', 'Save'))
				const nameInput = $dialog.find('input')[0]
				nameInput.style.minWidth = '250px'
				nameInput.style.maxWidth = '400px'
				nameInput.value = format ? this.basename.substring(0, this.basename.lastIndexOf('.') + 1) + format : this.basename
				nameInput.selectionStart = 0
				nameInput.selectionEnd = this.basename.lastIndexOf('.')
			})
		},
	},
}
