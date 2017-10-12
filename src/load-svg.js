(function () {
	function htmlToElement(html) {
		const template = document.createElement('template');

		template.insertAdjacentHTML('beforeend', html);

		return template.querySelector('svg');
	}

	M.loadDOMResource = function (src) {
		const ajax = new XMLHttpRequest();

		ajax.onload = function () {
			const element = htmlToElement(ajax.responseText);

			element.style.cssText = 'height: 0; width: 0; position: absolute; overflow: hidden;';

			document.body.insertBefore(element, document.body.firstChild);
		};

		ajax.onerror = function (error) {
			throw new URIError('The resource ' + error.target.src + ' is not accessible.');
		};

		ajax.open('GET', src, true);
		ajax.send();
	}
})(window.M);
