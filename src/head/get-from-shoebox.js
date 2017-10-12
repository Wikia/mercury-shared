(function (M) {
	const shoeboxCache = {};

	function getProp(obj, path) {
		// TODO split, join, split, this can be optimized
		const parts = path.split('.');
		let value = obj;
		let i;
		let length;

		if (parts.length > 1) {
			length = parts.length;

			for (i = 0; i < length; i++) {
				if (!value.hasOwnProperty(parts[i])) {
					return;
				}

				value = value[parts[i]];
			}

			return value;
		}

		return obj[path];
	}

	M.getFromShoebox = function (path) {
		const parts = path.split('.');
		const key = parts.shift();
		let el = document.querySelector('#shoebox-' + key);
		let shoeboxItem;
		let valueString;

		if (!el) {
			return;
		}

		valueString = el.textContent;

		if (!valueString) {
			return;
		}

		shoeboxItem = JSON.parse(valueString);
		shoeboxCache[key] = shoeboxItem;

		if (parts.length === 0) {
			return shoeboxItem;
		}

		return getProp(shoeboxItem, parts.join('.'));
	};
})(window.M);
