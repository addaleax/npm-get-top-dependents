'use strict';

var getTopDependents = require('../');
var assert = require('assert');

describe('get-top-dependents', function() {
  it('works', function(done) {
    this.timeout(60000);
    getTopDependents('object-hash', function(err, result) {
      if (err) {
        return done(err);
      }

      assert.ok(result);
      assert.ok(result.length);
      assert.ok(result[0].downloads);
      assert.ok(result[0].package);
      done();
    });
  });
});
