import DS from 'ember-data';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  accounts:DS.attr(),
  coffeeShops:DS.attr(),
  lastCoffeeId:DS.attr()

});
