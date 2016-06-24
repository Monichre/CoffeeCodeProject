import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('user');
  },
  actions: {
    processPlaidToken(public_token){
      Ember.$.ajax({
        url:'http://localhost:8080/api/v1/authenticate',
        method:'POST',
        data:{
        public_token: public_token,
        },
      }).then(function(data){
        // console.log(data);
      });
    },
    saveUser(newUser){
     var savedUser = this.store.createRecord('user', newUser);
     savedUser.save();
   },
   updateUser(user, id){
    //  debugger;
     user.save();
   },
   sortedUser(user){
     user.save();
   },
   displayChains(shops, freeCoffee){
     if(freeCoffee){
       Ember.$('#sortedShops').append("<h1>You have a free coffee at " + freeCoffee);
     }
     Object.keys(shops).forEach(function(shop){
       Ember.$("#sortedShops").append('<li>' + shop + '</li>');
       shops[shop].forEach(function(transaction){
         Ember.$('#sortedShops').append('<li>' + transaction + '</li>');
       });
     });
   },

  }
});
