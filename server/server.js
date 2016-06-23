// server.js
var client_id = require('./../.env').client_id;
var secret = require('./../.env').secret;
var jsonData = require('./../.env').jsonData;

// BASE SETUP
// call the packages we need
var User = require('./models/user');
var plaid = require('plaid');

var express    = require('express'),        // call express
    app        = express(),                 // define our app using express
    bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add CORS headers
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Resource", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get('/', function(request, response) {
    response.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

router.route('/users')


  // create a user accessed at POST http://localhost:8080/api/v1/users
  .post(function(request, response){
    var user = new User(); // new instance of the model
    console.log(user);
    console.log(request.body);
    user.accounts = request.body.accounts;
    user.coffeeShops = request.body.coffee_shops;
    user.lastCoffeeId = request.body.last_coffee_id;

    user.save(function(error){
      if(error)
        response.send(error);

      response.json({message:'user created!'});
    });

  })
  .put(function(request, response){
    console.log(request.body);
  })

  // get all users(shops) accessed at  http://localhost:8080/api/v1/users
  .get(function(request, response){
    User.find(function(error, users){
      if (error) response.send(error);
      response.json(users);
    });
  });
  router.post('/test', function(request, response) {
    console.log(jsonData);
    response.json(jsonData);
  })

  //listening from Ember plaid link
router.route('/authenticate')

  .post(function(request, response){
    var plaidClient = new plaid.Client(client_id, secret, plaid.environments.tartan);
    var public_token = request.body.public_token;
    var foundAccount;
    console.log(plaidClient);

    // Exchange a public_token for a Plaid access_token
    plaidClient.exchangeToken(public_token, function(err, res) {
      if (err != null) {
        // Handle error!
      } else {
      // This is my Plaid access token -
      //exchange public token for a plaid access token
      plaidClient.getConnectUser(access_token, {
        gte: '30 days ago',
      }, function(err, res) {
        response.json(res.transactions);
      });
      }
    });
  });


  //routes by id -- user/:user
router.route('/users/:users_id')

 // update the User with this Id --> is working but getting  strange adapter error
  .put(function(request, response){
    console.log(response);
    User.findById(request.params.users_id, function(error, user){
      console.log(user);
      if(error) response.send(error);
      //update

      user.accounts = request.body.accounts;
      user.coffeeShops = request.body.coffee_shops;
      user.lastCoffeeId = request.body.last_coffee_id;

      //save the udpate
      console.log(user);
      user.save(function(error){
        if(error) response.send(error);
        response.json({message:'updated!'});
      });
    });
  })

  .delete(function (request, response){
    User.remove({
      _id:request.params.users_id
    }, function(error, user){
      if(error) res.send(error);

      response.json({message: 'Successfully Deleted'});
    });
  });
// *******************************************************************************



// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api/v1
app.use('/api/v1/', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

//*****************************************************************************
//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://ellisliam:coffee@ds033865.mlab.com:33865/user_coffee');
