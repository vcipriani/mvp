var express = require('express');
var router = express.Router();

var db = require('../database');

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

//A sample endpoint which would contain the logic required to render the content specified by the customer
router.get('/demo', function(req, res) {
  res.send('var div = document.createElement(\'div\'); ' +
                      'var text = document.createTextNode(\'Hello World\'); ' +
                      'div.appendChild(text); ' +
                      'document.body.appendChild(div);');
});

//Main route that delivers the dynamic content
router.get('/:id', function(req, res) {
  var pageId = req.params.id;
  //Look up the page
  db.knex.raw('select id from pages where id=' + pageId)
  .then(function(pages) {
    if (pages[0].length === 1) {
      res.send('found your page')
    } else {
      res.send('didnt find');
    }
  });
  //Look up corresponding interactions
  
  //Generate and return JS
  // res.send(req.params.id);
});



module.exports = router;