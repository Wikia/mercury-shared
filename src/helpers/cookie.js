(function (M) {
	M.cookie = {
		/**
		 *
		 * @param {string} cookieName
		 * @returns {string|null}
		 */
		getValue(cookieName) {
			const cookieSplit = `; ${document.cookie}`.split(`; ${cookieName}=`);

			return cookieSplit.length === 2 ? cookieSplit.pop().split(';').shift() : null;
		}
	}
})(window.M);
