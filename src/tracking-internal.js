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
		const wikiVariables = M.getFromShoebox('applicationData.wikiVariables'),
			beaconCookieSplit = `; ${document.cookie}`.split('; wikia_beacon_id=');

		let beacon = '';

		if (beaconCookieSplit.length === 2) {
			beacon = beaconCookieSplit.pop().split(';').shift();
		}

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
			const r = Math.random() * 16 | 0,
				v = c === 'x' ? r : (r & 0x3 | 0x8);

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
		const sessionCookieSplit = `; ${document.cookie}`.split('; tracking_session_id='),
			pvNumberCookieSplit = `; ${document.cookie}`.split('; pv_number='),
			pvNumberGlobalCookieSplit = `; ${document.cookie}`.split('; pv_number_global='),
			cookieDomain = M.getFromShoebox('runtimeConfig.cookieDomain');

		let expireDate = new Date();

		window.pvUID = genUID();
		window.sessionId = sessionCookieSplit.length === 2 ? sessionCookieSplit.pop().split(';').shift() : genUID();
		window.pvNumber = pvNumberCookieSplit.length === 2 ?
			parseInt(pvNumberCookieSplit.pop().split(';').shift(), 10) + 1 :
			1;
		window.pvNumberGlobal = pvNumberGlobalCookieSplit.length === 2 ?
			parseInt(pvNumberGlobalCookieSplit.pop().split(';').shift(), 10) + 1 :
			1;

		expireDate = new Date(expireDate.getTime() + 1000 * 60 * 30);
		document.cookie = `tracking_session_id=${window.sessionId}; expires=${expireDate.toGMTString()};
			domain=${cookieDomain}; path=/;`;
		document.cookie = `pv_number=${window.pvNumber}; expires=${expireDate.toGMTString()}; path=/;`;
		document.cookie = `pv_number_global=${window.pvNumberGlobal}; expires=${expireDate.toGMTString()};
			domain=${cookieDomain}; path=/;`;

		track('view', M.simpleExtend({
			ga_category: 'view',
			session_id: window.sessionId,
			pv_unique_id: window.pvUID,
			pv_number: window.pvNumber,
			pv_number_global: window.pvNumberGlobal,
		}, context));

		console.info('Track pageView: Internal');
	}


	// API
	M.tracker.Internal = {
		track,
		trackPageView,
		// those are needed for unit test
		_createRequestURL: createRequestURL
	};

	if (M.getFromShoebox('runtimeConfig.noExternals') || M.getFromShoebox('serverError')) {
		return;
	}

	M.tracker.Internal.trackPageView({
		a: M.getFromShoebox('wikiPage.data.details.id'),
		n: M.getFromShoebox('wikiPage.data.ns')
	});
})(window.M);
