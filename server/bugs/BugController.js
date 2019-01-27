const Bug = require('./Bug');
const isEmpty = require('../../util/is-empty');

function BugController() {
  this.bugFactory = (title, description) => {
    if (typeof title !== 'string' || typeof description !== 'string') {
      return null;
    }

    return new Bug({ title, description });
  };

  this.addBug = async (req, res) => {
    const { title, description } = req.body;
    const newBug = this.bugFactory(title, description);

    if (!newBug) {
      return res.status(400).json({ msg: 'Title and/or description invalid ' });
    }

    try {
      const result = await newBug.save();
      console.log(result);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ error: 'Unable to add bug' });
    }
  };

  this.editBug = async () => {};
  this.deleteBug = async () => {};
  this.findBug = async () => {};
  this.findAllBugs = async () => {};
}

module.exports = new BugController();
