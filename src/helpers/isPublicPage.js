/**
 * Determines if the resource is a public share
 * @return {boolean}
 */
function isPublic() {
	/** @type HTMLInputElement */
	const publicElement = document.getElementById('isPublic')

	return Boolean(publicElement) && publicElement.value === '1'
}

export default isPublic
