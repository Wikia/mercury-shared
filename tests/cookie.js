QUnit.test( "Cookie getValue simple cookie", function( assert ) {
	document.cookie = 'foo=bar';
	assert.equal(M.cookie.getValue('foo'), 'bar');
});

QUnit.test( "Cookie getValue multiple cookies", function( assert ) {
	document.cookie = 'foo=bar';
	document.cookie = 'buzz=buzz';
	assert.equal(M.cookie.getValue('foo'), 'bar');
	assert.equal(M.cookie.getValue('buzz'), 'buzz');
});

QUnit.test( "Cookie getValue missing cookie", function( assert ) {
	document.cookie = 'foo=bar';
	document.cookie = 'buzz=buzz';
	assert.equal(M.cookie.getValue('zzz'), null);
	assert.equal(M.cookie.getValue('foo2'), null);
	assert.equal(M.cookie.getValue('fo'), null);
});
