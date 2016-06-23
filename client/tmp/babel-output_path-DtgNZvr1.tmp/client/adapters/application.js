define('client/adapters/application', ['exports', 'ember-data/adapters/rest'], function (exports, _emberDataAdaptersRest) {
  exports['default'] = _emberDataAdaptersRest['default'].extend({
    host: 'http://localhost:8080',
    namespace: 'api/v1'
  });
});