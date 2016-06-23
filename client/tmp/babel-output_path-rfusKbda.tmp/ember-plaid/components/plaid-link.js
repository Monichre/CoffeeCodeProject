define('ember-plaid/components/plaid-link', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var OPTIONS = ['clientName', 'product', 'key', 'env', 'webhook', 'longtail', 'selectAccount'];
  var DEFAULT_LABEL = 'Link Bank Account';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    type: 'button',
    action: 'processPlaidToken',
    attributeBindings: ['type'],

    label: DEFAULT_LABEL,
    institution: null,
    clientName: null,
    product: null,
    key: null,
    env: null,
    webhook: null,

    _link: null,

    _open: _ember['default'].on('click', function () {
      this._link.open(this.get('institution'));
    }),

    _setup: _ember['default'].on('init', function () {
      var options = _ember['default'].merge(this.getProperties(OPTIONS), {
        onSuccess: this._onSuccess.bind(this)
      });

      this._link = Plaid.create(options);
    }),

    _onSuccess: function _onSuccess(token) {
      this.sendAction('action', token);
    }
  });
});