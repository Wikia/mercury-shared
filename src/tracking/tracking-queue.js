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

	trackingOptIn.default({
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
})(window.M, window.trackingOptIn);
