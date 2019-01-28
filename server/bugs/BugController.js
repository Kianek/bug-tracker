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

  /**
   * Sanitizes the request body, filtering out any invalid values.
   * Then, the remaining values are used to update the database.
   * @param request
   * @param response
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

  this.deleteBug = async () => {};
  this.findBug = async () => {};
  this.findAllBugs = async () => {};
}

module.exports = new BugController();
