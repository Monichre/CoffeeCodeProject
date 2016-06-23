//models/user.js
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  accounts: [String],
  coffeeShops: [Schema.Types.Mixed],
  lastCoffeeId: String,
});

module.exports = mongoose.model('User', UserSchema);
