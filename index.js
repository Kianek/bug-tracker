const app = require('./server/app');
const { port } = require('./config/keys');

app.listen(port, () => console.log(`Server running on port ${port}`));
