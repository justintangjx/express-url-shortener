var express = require('express');
router = express.Router();

router.get('/hello', function(req, res) {
  res.send('world')
})

router.get('/expand-url/:hash', function(req, res) {
  res.send(req.params.hash)
})

module.exports = router