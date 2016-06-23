QUnit.module('JSHint | components/plaid-call.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/plaid-call.js should pass jshint.\ncomponents/plaid-call.js: line 72, col 50, Missing semicolon.\ncomponents/plaid-call.js: line 85, col 11, Missing semicolon.\ncomponents/plaid-call.js: line 62, col 32, \'user\' is not defined.\n\n3 errors');
});
