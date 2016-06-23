define('client/components/plaid-link', ['exports', 'ember-plaid/components/plaid-link', 'client/config/environment'], function (exports, _emberPlaidComponentsPlaidLink, _clientConfigEnvironment) {

  var plaidConfig = _clientConfigEnvironment['default']['ember-plaid'];

  exports['default'] = _emberPlaidComponentsPlaidLink['default'].extend({
    clientName: plaidConfig.clientName,
    product: plaidConfig.product,
    key: plaidConfig.key,
    env: plaidConfig.env
  });
});