const mongoose = require('mongoose');
const request = require('supertest');
const Bug = require('../../server/bugs/Bug');
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

  describe('#addBug', function() {
    it('should add a new bug', async function() {
      try {
        const newBug = await validBug.save();
        const result = validBug.equals(newBug);
        result.should.be.true;
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('#updateBug', function() {});
});
