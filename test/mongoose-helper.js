const mongoose = require('mongoose');
const { mongoTest, mongoOpts } = require('../config/keys');

before('Connect to the database', function() {
  mongoose
    .connect(
      mongoTest,
      mongoOpts
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
});

after('Clear the database', function(done) {
  mongoose.connection
    .dropCollection('bugs')
    .then(() => done())
    .catch(() => done());
});
