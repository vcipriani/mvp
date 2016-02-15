var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

//Serve our admin app
app.use('/app', express.static(path.join(__dirname, '../client')));

//Serve our example customer site.  This would normally be hosted by the customer, not us
app.use('/cust', express.static(path.join(__dirname, '../customer')));

app.get('/', function(req, res) {
  res.send('hello world');
});

//A sample endpoint which would contain the logic required to render the content specified by the customer
app.get('/content/1', function(req, res) {
  res.send('var div = document.createElement(\'div\'); ' +
                      'var text = document.createTextNode(\'Hello World\'); ' +
                      'div.appendChild(text); ' +
                      'document.body.appendChild(div);');
});

app.listen(port, function () {
  console.log('App running on port ' + port);
});