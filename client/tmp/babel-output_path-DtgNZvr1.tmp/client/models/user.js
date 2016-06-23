define('client/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  // import attr from 'ember-data/attr';
  // import { belongsTo, hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    accounts: _emberData['default'].attr(),
    coffeeShops: _emberData['default'].attr(),
    lastCoffeeId: _emberData['default'].attr()

  });
});