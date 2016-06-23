define('client/tests/unit/serializers/coffee-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('coffee', 'Unit | Serializer | coffee', {
    // Specify the other units that are required for this test.
    needs: ['serializer:coffee']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});