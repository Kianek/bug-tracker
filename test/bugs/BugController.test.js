const bugController = require('../../server/bugs/BugController');
const { expect, should } = require('../chai-config');

describe('BugController', function() {
  const validBug = bugController.bugFactory(
    'Segfault',
    'The program segfaults when I eat apples'
  );

  describe('#bugFactory', function() {
    it('returns a valid Bug', function() {
      validBug.should.not.be.null;
    });

    it('returns null', function() {
      const invalidBug = bugController.bugFactory(
        4,
        'This bug should have a string as its title'
      );
      expect(invalidBug).to.be.null;
    });
  });
});
