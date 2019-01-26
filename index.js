const app = require('./server/app');
const mongoose = require('mongoose');
const { port } = require('./config/keys');

const { mongoURI, mongoOpts } = require('./config/keys-dev');
mongoose
  .connect(
    mongoURI,
    mongoOpts
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server running on port ${port}`));
