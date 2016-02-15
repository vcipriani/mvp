var express = require('express');
var router = express.Router();

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

// define the about route
router.get('/:id', function(req, res) {
  res.send(req.params.id);
});



module.exports = router;