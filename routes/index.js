var express = require('express');
var router = express.Router();
var db=require('../models');


/* GET home page. */
router.get('/', async function(req, res, next) {
 
 
  res.send("drivers")
});

module.exports = router;
