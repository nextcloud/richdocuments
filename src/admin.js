import Vue from 'vue'
import AdminSettings from './components/AdminSettings'
import '../css/admin.scss'

// CSP config for webpack dynamic chunk loading
// eslint-disable-next-line
__webpack_nonce__ = btoa(OC.requestToken)

// Correct the root of the app for chunk loading
// OC.linkTo matches the apps folders
// eslint-disable-next-line
__webpack_public_path__ = OC.linkTo('richdocuments', 'js/')

Vue.prototype.t = t
Vue.prototype.n = n
Vue.prototype.OC = OC
Vue.prototype.OCA = OCA

const element = document.getElementById('admin-vue')

/* eslint-disable-next-line no-new */
new Vue({
	render: h => h(AdminSettings, { props: { initial: JSON.parse(element.dataset.initial) } }),
}).$mount('#admin-vue')

/**
 * Append a new template to the dom
 *
 * @param {Object} data the template data from the template controller response
 */
function appendTemplateFromData(data) {
	const template = document.querySelector('.template-model').cloneNode(true)
	template.className = ''
	template.querySelector('img').src = data.preview
	template.querySelector('figcaption').textContent = data.name
	template.querySelector('.delete-template').href = data.delete

	document.querySelector('#richdocuments-templates > ul').appendChild(template)
	template.querySelector('.delete-template').addEventListener('click', deleteTemplate)
}

/**
 * Delete template event handler
 *
 * @param {Event} event the button click event
 */
function deleteTemplate(event) {
	event.preventDefault()
	const emptyElmt = document.querySelector('#richdocuments-templates #emptycontent')
	const tplListElmt = document.querySelector('#richdocuments-templates > ul')
	const elmt = event.target

	// ensure no request is in progress
	if (elmt.className.indexOf('loading') === -1 && elmt.textContent === '') {
		const remote = event.target.href
		elmt.classList.add('icon-loading')
		elmt.classList.remove('icon-delete')

		// send request
		$.ajax({
			url: remote,
			type: 'DELETE',
		})
			.done(function() {
			// remove template
				elmt.parentElement.remove()
				// is list empty? Only the default template is left
				if (tplListElmt.querySelectorAll('li').length === 1) {
					tplListElmt.classList.add('hidden')
					emptyElmt.classList.remove('hidden')
				}
			})
			.fail(function(e) {
			// failure, show warning
				elmt.textContent = t('richdocuments', 'Error')
				elmt.classList.remove('icon-loading')
				setTimeout(function() {
					elmt.classList.add('icon-delete')
					elmt.textContent = ''
				}, 2000)
			})
	}
}

/**
 * Init the upload manager and the delete template handler
 */
function initTemplateManager() {
	const inputElmt = document.querySelector('#add-template')
	const buttonElmt = document.querySelector('.icon-add')
	const deleteElmts = document.querySelectorAll('.delete-template')
	const emptyElmt = document.querySelector('#richdocuments-templates #emptycontent')
	const tplListElmt = document.querySelector('#richdocuments-templates > ul')

	deleteElmts.forEach(function(elmt) {
		elmt.addEventListener('click', deleteTemplate)
	})

	// fileupload plugin
	$('#richdocuments-templates').fileupload({
		dataType: 'json',
		url: OC.generateUrl('apps/richdocuments/template'),
		type: 'POST',

		add(e, data) {
			// submit on file selection
			data.submit()
			inputElmt.disabled = true
			buttonElmt.className = 'icon-loading-small'
		},

		submit(e, data) {
			data.formData = _.extend(data.formData || {}, {
				requesttoken: OC.requestToken,
			})
		},

		success(e) {
			inputElmt.disabled = false
			buttonElmt.className = 'icon-add'
			// add template to dom
			appendTemplateFromData(e.data)
			tplListElmt.classList.remove('hidden')
			emptyElmt.classList.add('hidden')
		},

		fail(e, data) {
			// failure, show warning
			buttonElmt.className = 'icon-add'
			buttonElmt.textContent = t('richdocuments', 'An error occurred') + ': ' + data.jqXHR.responseJSON.data.message
			setTimeout(function() {
				inputElmt.disabled = false
				buttonElmt.textContent = ''
			}, 2000)
		},
	})
}

$(document).ready(function() {
	initTemplateManager()
})
