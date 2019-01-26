const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send({ msg: 'Test successful' });
});

module.exports = router;
