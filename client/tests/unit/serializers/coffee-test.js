import { moduleForModel, test } from 'ember-qunit';

moduleForModel('coffee', 'Unit | Serializer | coffee', {
  // Specify the other units that are required for this test.
  needs: ['serializer:coffee']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
