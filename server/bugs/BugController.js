const Bug = require('./Bug');
const { isEmpty } = require('validator');

module.exports = {
  bugFactory: (title, description) => {
    if (isEmpty(title) || isEmpty(description)) {
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
