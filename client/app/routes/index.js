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
  //  sortedUser(user){
  //    user.save();
  //  },
   displayChains(shops, freeCoffee){
     if(freeCoffee){
       $('#sortedShops').append("<h1>You have a free coffee at " + freeCoffee);
     }

     Object.keys(shops).forEach(function(shop){
       console.log(shops[shop]);
      //  shops[shop].forEach(function(transaction){
         console.log(shops[shop].length);
         if (shops[shop].length === 1){
           Ember.$('#sortedShops').append('<div class="shop-tile"><li class="shop-name">' + shop + '</li></div><li class="shop-transaction"><img src="../images/CCUP1.jpg" width="400px"></li>');
         } else if (shops[shop].length === 2){
           Ember.$('#sortedShops').append('<div class="shop-tile"><li class="shop-name">' + shop + '</li></div><li class="shop-transaction"><img src="../images/CCUP2.jpg" width="400px"></li>');
         } else if (shops[shop].length === 3){
           Ember.$('#sortedShops').append('<div class="shop-tile"><li class="shop-name">' + shop + '</li></div><li class="shop-transaction"><img src="../images/CCUP3.jpg" width="400px"></li>');
         } else if (shops[shop].length === 4){
           Ember.$('#sortedShops').append('<div class="shop-tile"><li class="shop-name">' + shop + '</li></div><li class="shop-transaction"><img src="../images/CCUP4.jpg" width="400px"></li>');
         } else if (shops[shop].length === 5){
           Ember.$('#sortedShops').append('<div class="shop-tile"><li class="shop-name">' + shop + '</li></div><li class="shop-transaction"><img src="../images/CCUP4.jpg" width="400px"></li>');
           alert("You get a free coffee at " + shop[shop] + "!");
         }
      //  })
       Ember.$("#sortedShops").append('');
     })
   },
  }
});
