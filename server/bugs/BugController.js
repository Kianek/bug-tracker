const Bug = require('./Bug');
const isEmpty = require('../../util/is-empty');

module.exports = {
  bugFactory: (title, description) => {
    if (typeof title !== 'string' || typeof description !== 'string') {
      return null;
    }

    return new Bug({ title, description });
  },
  addBug: () => {},
  editBug: () => {},
  deleteBug: () => {},
  findBug: () => {},
  findAllBugs: () => {},
};
