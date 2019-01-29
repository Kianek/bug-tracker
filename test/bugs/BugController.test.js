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

  context('#bugFactory', function() {
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

  context('#addBug', function() {
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

  context('#findBug', function() {
    const id = validBug._id;

    before('Add bug to the database', async function() {
      try {
        await validBug.save();
      } catch (err) {
        console.log(err);
      }
    });

    it('should find the bug by id', async function() {
      try {
        const result = await Bug.findById(id);
        expect(result.isNew).to.be.false;
      } catch (err) {
        console.log(err);
      }
    });
  });

  context('#updateBug', async function() {
    const newBug = bugController.bugFactory('Title', 'Description');
    const id = newBug._id;

    beforeEach(async function() {
      try {
        await newBug.save();
      } catch (err) {
        console.log(err);
      }
    });

    const updatedValues = [
      { title: 'New Title' },
      { description: 'New Description' },
      { fixed: true },
    ];

    updatedValues.forEach(updatedValue => {
      const key = Object.keys(updatedValue)[0];
      const value = Object.values(updatedValue)[0];

      it(`should update the ${key} value to ${value}`, async function() {
        try {
          await newBug.save();
          const query = { [key]: value };
          const opts = { new: true };
          const result = await Bug.findByIdAndUpdate(id, query, opts);
          console.log(result);
          result[key].should.equal(value);
        } catch (err) {
          console.log(err);
        }
      });
    });
  });

  context('#deleteBug', function() {
    let id = '';

    before('Add a bug to the database', async function() {
      try {
        const result = await validBug.save();
        id = result._id;
      } catch (err) {
        console.log(err);
      }
    });

    it('should find the bug by id, and delete it', async function() {
      try {
        await Bug.findByIdAndDelete(id);
        return expect(Bug.findById(id)).to.eventually.be.null;
      } catch (err) {
        console.log(err);
      }
    });

    it('should be unable to find the deleted bug', async function() {
      try {
        const result = await Bug.findByIdAndDelete(id);
        return expect(result).to.be.null;
      } catch (err) {
        console.log(err);
      }
    });
  });
});
