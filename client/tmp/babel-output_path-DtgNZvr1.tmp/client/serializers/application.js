define('client/serializers/application', ['exports', 'ember', 'ember-data/serializers/json'], function (exports, _ember, _emberDataSerializersJson) {
  exports['default'] = _emberDataSerializersJson['default'].extend({

    keyForAttribute: function keyForAttribute(key) {
      return _ember['default'].String.decamelize(key);
    }

  });
});