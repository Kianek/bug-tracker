const bugController = require('../../server/bugs/BugController');
const { should } = require('../chai-config');

describe('BugController', function() {
  const validBug = bugController.bugFactory(
    'Segfault',
    'The program segfaults when I eat apples'
  );

  describe('#bugFactory', function() {
    it('returns a valid Bug', function() {
      validBug.should.not.equal(null);
    });

    it('returns null');
  });
});
