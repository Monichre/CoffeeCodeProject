define('client/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('user');
    },
    actions: {
      processPlaidToken: function processPlaidToken(public_token) {
        _ember['default'].$.ajax({
          url: 'http://localhost:8080/api/v1/authenticate',
          method: 'POST',
          data: {
            public_token: public_token
          }
        }).then(function (data) {
          // console.log(data);
        });
      },
      saveUser: function saveUser(newUser) {
        var savedUser = this.store.createRecord('user', newUser);
        savedUser.save();
      },
      updateUser: function updateUser(user, id) {
        //  debugger;
        user.save();
      },
      sortedUser: function sortedUser(user) {
        user.save();
      },
      displayChains: function displayChains(shops) {
        Object.keys(shops).forEach(function (shop) {
          _ember['default'].$("#sortedShops").append('<li>' + shop + '</li>');
          shops[shop].forEach(function (transaction) {
            _ember['default'].$('#sortedShops').append('<li>' + shops[shop] + '</li>');
          });
        });
      }
    }
  });
});