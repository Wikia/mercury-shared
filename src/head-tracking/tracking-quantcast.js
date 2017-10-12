(function (M) {
	const prefix = document.location.protocol === 'https:' ? 'https://secure' : 'http://edge';

	if (M.getFromShoebox('runtimeConfig.noExternals') || M.getFromShoebox('serverError')) {
		window.trackQuantcastPageView = function () {};
		return;
	}

	M.loadScript(prefix + '.quantserve.com/quant.js?' + Math.random(), true);

	const config = M.getFromShoebox('tracking.quantcast') || {};

	window.trackQuantcastPageView = function () {
		window._qevents = window._qevents || [];

		if (window.__qc) {
			window.__qc.qpixelsent = [];
		}

		window._qevents.push({
			qacct: config.id,
			labels: config.labels
		});

		console.info('Track pageView: Quantcast');
	};

	window.trackQuantcastPageView();
})(window.M);
