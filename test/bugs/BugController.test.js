const mongoose = require('mongoose');
const Bug = require('../../server/bugs/Bug');
const bugController = require('../../server/bugs/BugController');
const { expect, should } = require('../chai-config');

async function clearDB() {
  try {
    await mongoose.connection.dropCollection('bugs');
  } catch (err) {
    console.log(err);
  }
}

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

    after('clear the database', async function() {
      clearDB();
    });
  });

  context('#findBug', function() {
    const newBug = bugController.bugFactory('New Bug', 'New description');

    before('Add bug to the database', async function() {
      try {
        await newBug.save();
      } catch (err) {
        console.log(err);
      }
    });

    it('should find the bug by id', async function() {
      try {
        const result = await Bug.findById(newBug._id);
        expect(result.isNew).to.be.false;
      } catch (err) {
        console.log(err);
      }
    });

    after('clear the database', async function() {
      clearDB();
    });
  });

  context.only('#findAllBugs', function() {
    before('Add three bugs to the database', async function() {
      let bugs = [];
      for (let i = 0; i < 3; ++i) {
        bugs[i] = bugController.bugFactory(
          `Bug ${i + 1}`,
          `This is bug ${i + 1}`
        );
        console.log(bugs[i]);

        try {
          await bugs[i].save();
        } catch (err) {
          console.log(err);
        }
      }
    });

    it('should load all bugs from the database', async function() {
      try {
        const result = await Bug.find({});
        console.log(result);
        result.should.be.an('array').with.lengthOf(3);
      } catch (err) {
        console.log(err);
      }
    });

    after('Clear the database', async function() {
      clearDB();
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
