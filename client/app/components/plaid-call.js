import Ember from 'ember';

export default Ember.Component.extend({
  plaidCompleted: true,
  coffeeShops: null,
  coffeeChains: null,
  thisUser: null,
  freeCoffee: false,
  users: function(){
    return this.store.findAll('user');
  },
  actions: {
    callApi(token) {
      var self = this;
      Ember.$.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/test",
        }).then(function(data) {
        var users = self.users;
        var noUser = true;
        var coffeeShops = []; // local variable

        users.forEach(function(user){
          if(user.get('accounts').includes(data[0].account)){
            noUser = false;
            data.forEach(function(transaction) {
              if(transaction._id === user.get('lastCoffeeId')){
                var mostRecentTrans = data.splice(data.indexOf(transaction), data.length - 1);
                mostRecentTrans.forEach(function(transaction){
                  if(transaction.category.includes("Coffee Shop")){

                    coffeeShops.push(transaction);
                  }
                });
                user.set('coffeeShops', coffeeShops);
                self.set('thisUser', user);
                self.sendAction('updateUser', user, user.id);
              }
            });
          }
        });
        self.set('coffeeShops', coffeeShops); //component property
        // **********************************
        //new user code
        if(noUser){
          var newUser = {accounts:[], coffeeShops:[], lastCoffeeId: ""};
          var newUserCoffee = [];
          data.forEach(function(transaction){
            // this if block populates the user account model property
            if(newUser.accounts.indexOf(transaction._account) < 0){
              newUser.accounts.push(transaction._account);
            }
            // this if block populates the user coffeeShops model property
            if(transaction.category){
              if(transaction.category.includes("Coffee Shop")){
                if(!(newUserCoffee.includes(transaction))){
                  newUserCoffee.push(transaction);
                }
              }
            }
          });
          //This if block popoulates the lastCoffeeId model property
          newUser.lastCoffeeId = newUserCoffee[newUserCoffee.length - 4]._id;
          var newUserShops = newUserCoffee.splice(-3, 3);
          newUser.coffeeShops = newUserShops;
          self.set('coffeeShops', newUserShops);
          // self.set('thisUser', user);
          self.sendAction('newUser', newUser);
        }


        var sortedShops = {};

          // Ember.$(".coffee-cards").text("<li>" + sortedShops[0] + "</li>");
          // Ember.$(".coffee-cards").text("<li>" + sortedShops[shop.name] + "</li>")

        self.coffeeShops.forEach(function(shop){
          if(!(Object.keys(sortedShops).includes(shop.name))){
            sortedShops[shop.name] = [shop._id];
          } else {
            sortedShops[shop.name].push(shop._id);
          }
          // Ember.$(".coffee-cards").text("<li>" + shop + "TEST </li>");

        });

          ////DROPDOWN MENU CRAP
          console.log()
          var shops = Object.keys(sortedShops);
          shops.forEach(function(shop){

            Ember.$("#dropdown").append("<li class='droplist'><a href=''>" + shop + "  (" + sortedShops[shop].length + ")</a></li>");
          });

        Object.keys(sortedShops).forEach(function(key){
          if(sortedShops[key].length >= 5){
            self.set('freeCoffee', key);
            sortedShops[key].splice(0, 5);
            self.thisUser.set("coffeeShops", []);
            self.thisUser.set('lastCoffeeId', sortedShops[key]);
            self.thisUser.set('coffeeShops', sortedShops);
            self.sendAction('sortedUser', self.thisUser);
          }
        });
        self.sendAction('coffeeChains', sortedShops, self.freeCoffee);
        self.set('plaidCompleted', false);

        shops.forEach(function(shop){
          Ember.$(".coffee-cards").append("TEST");
        })
      });
    }
  }
});

// processPlaidToken(token) {
//   var self = this;
//   Ember.$.ajax({
//     type: "POST",
//     url: "http://localhost:8080/api/v1/authenticate",
//     data: {
//       public_token: token,
//     }}).then(function(data) {
//     console.log(data);
//     self.set('plaidCompleted', false);
//   });
// }

// callApi(users) {
//   var self = this;
//   Ember.$.ajax({
//     type: "POST",
//     url: "http://localhost:8080/api/v1/test"
//   }).then(function(data) {
