const Model = require('mongoose').Model;
const Bug = require('./Bug');
const isEmpty = require('../../util/is-empty');

/**
 * @constructor
 */
function BugController() {
  /**
   *
   * @param {string} title - title of the new bug
   * @param {string} description - describes the problem
   * @returns {Model} new Bug model
   */
  this.bugFactory = (title, description) => {
    if (typeof title !== 'string' || typeof description !== 'string') {
      return null;
    }

    return new Bug({ title, description });
  };

  /**
   * Attempts to instantiate a new Bug model. If successful, returns a success response
   * with the newly saved bug; otherwise, returns a 400 error.
   * @async
   * @method
   * @param request
   * @param response
   */
  this.addBug = async (req, res) => {
    const { title, description } = req.body;
    const newBug = this.bugFactory(title, description);

    if (!newBug) {
      return res.status(400).json({ msg: 'Title and/or description invalid ' });
    }

    try {
      const result = await newBug.save();
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ error: 'Unable to add bug' });
    }
  };

  this.updateBug = async () => {};
  this.deleteBug = async () => {};
  this.findBug = async () => {};
  this.findAllBugs = async () => {};
}

module.exports = new BugController();
