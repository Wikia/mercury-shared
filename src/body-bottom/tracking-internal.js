/**
 * @typedef {Object} InternalTrackingConfig
 * @property {number} c - wgCityId
 * @property {string} x - wgDBName
 * @property {string} lc - wgContentLanguage
 * @property {number} u=0 - trackID || wgTrackID || 0
 * @property {string} s - skin
 * @property {string} beacon='' - beacon_id || ''
 * @property {number} cb - cachebuster
 */

/**
 * @typedef {Object} InternalTrackingParams
 * @property {string} ga_category - category
 * @property {string} a - wgArticleId
 * @property {number} n - wgNamespaceNumber
 * @property {string} [sourceUrl]
 */

(function (M) {
	const baseUrl = 'https://beacon.wikia-services.com/__track/';

	/**
	 * @returns {InternalTrackingConfig}
	 */
	function getConfig() {
		const wikiVariables = M.getFromShoebox('applicationData.wikiVariables');
		const beacon = M.cookie.get('wikia_beacon_id');

		return {
			c: wikiVariables.id,
			x: wikiVariables.dbName,
			lc: wikiVariables.language.content,
			u: parseInt(M.getFromShoebox('userId'), 10) || 0,
			s: 'mercury',
			beacon,
			cb: Math.floor(Math.random() * 99999)
		};
	}

	/**
	 * @returns {string}
	 */
	function genUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0;
			const v = c === 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}

	/**
	 * @param {string} targetRoute
	 * @param {*} params
	 * @returns {string}
	 */
	function createRequestURL(targetRoute, params) {
		const parts = [];

		Object.keys(params).forEach((key) => {
			const value = params[key];

			if (value !== null) {
				const paramStr = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

				parts.push(paramStr);
			}
		});

		return `${baseUrl}${targetRoute}?${parts.join('&')}`;
	}

	/**
	 * @param {string} targetRoute
	 * @param {InternalTrackingParams} params
	 * @returns {void}
	 */
	function track(targetRoute, params) {
		const config = M.simpleExtend(params, getConfig());

		M.loadScript(createRequestURL(targetRoute, config));
	}

	/**
	 * @param {TrackContext} context
	 * @returns {void}
	 */
	function trackPageView(context) {
		const sessionId = M.cookie.get('tracking_session_id');
		const pvNumber = M.cookie.get('pv_number');
		const pvNumberGlobal = M.cookie.get('pv_number_global');
		const cookieDomain = M.getFromShoebox('runtimeConfig.cookieDomain');

		let expireDate = new Date();

		window.pvUID = genUID();
		window.sessionId = sessionId ? sessionId : genUID();
		window.pvNumber = pvNumber ? parseInt(pvNumber, 10) + 1 : 1;
		window.pvNumberGlobal = pvNumberGlobal ? parseInt(pvNumberGlobal, 10) + 1 : 1;

		// cookie expire time: 30min
		expireDate = new Date(expireDate.getTime() + 1000 * 60 * 30);
		document.cookie = `tracking_session_id=${window.sessionId}; expires=${expireDate.toGMTString()};` +
			`domain=${cookieDomain}; path=/;`;
		document.cookie = `pv_number=${window.pvNumber}; expires=${expireDate.toGMTString()}; path=/;`;
		document.cookie = `pv_number_global=${window.pvNumberGlobal}; expires=${expireDate.toGMTString()};` +
			`domain=${cookieDomain}; path=/;`;

		track('view', M.simpleExtend({
			ga_category: 'view',
			session_id: window.sessionId,
			pv_unique_id: window.pvUID,
			pv_number: window.pvNumber,
			pv_number_global: window.pvNumberGlobal,
		}, context));

		console.info('Track pageView: Internal');
	}

	if (typeof M.tracker === 'undefined') {
		M.tracker = {};
	}

	// API
	M.tracker.Internal = {
		track,
		trackPageView,
		// those are needed for unit test
		_createRequestURL: createRequestURL
	};
})(window.M);
