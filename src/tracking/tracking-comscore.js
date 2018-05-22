(function (M) {
	M.trackingQueue.push((isOptedIn) => {
		if (M.getFromHeadDataStore('noExternals') || !isOptedIn) {
			window.trackComscorePageView = function () {};
			return;
		}

		const prefix = (document.location.protocol === 'https:' ? 'https://sb' : 'http://b');

		M.loadScript(prefix + '.scorecardresearch.com/beacon.js', false);

		window._comscore = window._comscore || [];

		window.trackComscorePageView = function () {
			const config = M.getFromHeadDataStore('tracking.comscore') || {};

			window._comscore.push({
				c1: '2',
				c2: config.id,
				options: {
					url_append: config.keyword + '=' + config.c7Value
				}
			});

			/*
			 Whenever comscore script loads it'll send all the events from the _comscore array
			 but on the second page view in a session we don't want to load the script once again
			 that is why we have to call purge method here
			 It'll make sure that whatever is in _comscore gets send
			 */
			if (window.COMSCORE) {
				if (window.COMSCORE.purge) {
					window.COMSCORE.purge();
				}
			}

			console.info('Track pageView: Comscore');
		};

		window.trackComscorePageView();
	});
})(window.M);
