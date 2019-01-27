const router = require('express').Router();
const bugController = require('../server/bugs/BugController');

router.get('/test', (req, res) => {
  res.send({ msg: 'Test successful' });
});

router.post('/add', bugController.addBug);

module.exports = router;
