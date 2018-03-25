var express = require('express');
router = express.Router();
require('dotenv').config();

// router.get('/hello', function(req, res) {
//   res.send('world')
// })

// router.get('/expand-url/:hash', function(req, res) {
//   res.send(req.params.hash)
// })

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "hello express-url-shortener-api" });
});

module.exports = router