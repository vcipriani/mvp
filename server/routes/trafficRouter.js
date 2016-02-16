var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var traffic = require('../models/traffic');

router.route('/pages/:id')
  .post(function(req, res) {
    traffic.increasePageViews(req.params.id)
      .then(function(){
        res.send('success');
      });
  });
  
router.route('/ab/hit/:id')
  .post(function(req, res) {
    traffic.increaseABIterationHits(req.params.id)
      .then(function(){
        res.send('success');
      });
  });
  
module.exports = router;