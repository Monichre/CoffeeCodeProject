import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('user');
  },
  actions: {
    processPlaidToken(public_token){
      $.ajax({
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
   displayChains(shops){
     Object.keys(shops).forEach(function(shop){
       $("#sortedShops").append('<li>'+shop+'</li>');
       shops[shop].forEach(function(transaction){
         $('#sortedShops').append('<li>'+shops[shop] + '</li>');
       })

     })

   }
  }
});
