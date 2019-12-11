(function (M, trackingOptIn) {
	const queue = [];
	let isReady = false;
	let isOptedIn = false;

	function push(fn) {
		if (isReady) {
			fn.call(null, isOptedIn);
		} else {
			queue.push(fn);
		}
	}

	function flush(localIsOptedIn) {
		while (queue.length > 0) {
			const fn = queue.shift();
			fn.call(null, localIsOptedIn);
		}

		isOptedIn = localIsOptedIn;
		isReady = true;
	}

	if (!trackingOptIn) {
		// Each app needs to load @wikia/tracking-opt-in by itself
		console.error(`@wikia/tracking-opt-in isn't loaded, we assume opt-out`);
		flush(false);
		return;
	}

	const usapiEnabled =
		window &&
		window.location &&
		window.location.search &&
		window.location.search.indexOf('icUSPrivacyApi=1') !== -1;

	const instances = trackingOptIn.default({
		enableCCPAinit: usapiEnabled,
		onAcceptTracking: () => {
			flush(true);
		},
		onRejectTracking: () => {
			flush(false);
		}
	});

	M.trackingQueue = {
		push: push
	};

	M.geoRequiresConsent = instances.gdpr.geoRequiresTrackingConsent();
	M.resetTrackingOptIn = function () {
		instances.gdpr.reset();
	};
	// TODO: Remove this flag once we fully switch to CMP from TrackingOptIn - ADEN-7432
	window.isConsentManagementProviderLoadedFromTrackingOptInModal = !!instances.gdpr.consentManagementProvider;
})(window.M, window.trackingOptIn);
