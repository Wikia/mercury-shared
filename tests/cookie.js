QUnit.test( "Cookie.get simple cookie", function( assert ) {
	document.cookie = 'foo=bar';
	assert.equal(M.cookie.get('foo'), 'bar');
});

QUnit.test( "Cookie.get multiple cookies", function( assert ) {
	document.cookie = 'foo=bar';
	document.cookie = 'buzz=buzz';
	assert.equal(M.cookie.get('foo'), 'bar');
	assert.equal(M.cookie.get('buzz'), 'buzz');
});

QUnit.test( "Cookie.get missing cookie", function( assert ) {
	document.cookie = 'foo=bar';
	document.cookie = 'buzz=buzz';
	assert.equal(M.cookie.get('zzz'), null);
	assert.equal(M.cookie.get('foo2'), null);
	assert.equal(M.cookie.get('fo'), null);
});
