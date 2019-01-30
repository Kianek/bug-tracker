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
   * @param {Object} request
   * @param {Object} response
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

  /**
   * Sanitizes the request body, filtering out any invalid values.
   * The remaining values are used to update the database.
   * @param {Object} request
   * @param {Object} response
   */
  this.updateBug = async (req, res) => {
    const id = req.params.id;

    // Convert the request body to an array of key-value arrays,
    // and filter out any key-value array with an 'empty' value.
    // Then, convert the resulting array of sanitized objects
    // back into an object.
    const updatedValues = Object.assign(
      {},
      ...Object.entries(req.body)
        .filter(pair => !isEmpty(pair[1]))
        .map(pair => {
          return { [pair[0]]: pair[1] };
        })
    );

    try {
      // Specify that Mongo should respond with the updated document
      const opts = { new: true };
      const result = await Bug.findByIdAndUpdate(id, updatedValues, opts);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ msg: 'Unable to find bug' });
    }
  };

  /**
   * Finds a given bug and deletes it. If no bug is found, or is unable to be deleted,
   * returns a 409 status.
   * @param {Object} request
   * @param {Object} response
   */
  this.deleteBug = async (req, res) => {
    const id = req.params.id;

    try {
      const result = await Bug.findByIdAndDelete(id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(409).json({ msg: 'Unable to find and/or delete bug' });
    }
  };

  /**
   * Deletes all bugs in the database.
   * @param {Object} request
   * @param {Object} response
   */
  this.deleteAllBugs = async (req, res) => {
    try {
      await Bug.deleteMany({});
      return res.status(200).json({ msg: 'All bugs deleted' });
    } catch (err) {
      return res.status(400).json({ msg: 'Unable to delete bugs' });
    }
  };

  /**
   * Finds a single bug by id.
   * @param {Object} request
   * @param {Object} response
   */
  this.findBug = async (req, res) => {
    const id = req.params.id;

    try {
      const result = await Bug.findById(id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ msg: 'Unable to find bug' });
    }
  };

  /**
   * Finds all bugs in the database.
   * @param {Object} request
   * @param {Object} response
   */
  this.findAllBugs = async (req, res) => {
    try {
      const result = await Bug.find({});
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ msg: 'Unable to find bugs' });
    }
  };
}

module.exports = new BugController();
