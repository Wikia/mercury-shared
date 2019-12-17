(function (M, trackingOptIn) {
	const queue = [];
	let isReady = false;
	let isOptedIn = false;
	let isSaleOptOut = false;

	function push(fn) {
		if (isReady) {
			fn.call(null, isOptedIn, isSaleOptOut);
		} else {
			queue.push(fn);
		}
	}

	function flush(localIsOptedIn) {
		isSaleOptOut = instances.ccpa.hasUserProvidedSignal();

		while (queue.length > 0) {
			const fn = queue.shift();
			fn.call(null, localIsOptedIn, isSaleOptOut);
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

	const instances = trackingOptIn.default({
		enableCCPAinit: true,
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
	M.geoRequiresSignal = instances.ccpa.geoRequiresUserSignal();
	M.resetTrackingOptIn = function () {
		instances.gdpr.reset();
	};
})(window.M, window.trackingOptIn);
