(function (M) {
    const element = document.querySelector('#head-data-store');
    const data = JSON.parse(element.textContent);

	M.getFromHeadDataStore = function (path) {
		const parts = path.split('.');
		let value = data;
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

		return data[path];
	};
})(window.M);
