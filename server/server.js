var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

//Serve our admin app
app.use('/app', express.static(path.join(__dirname, '../client')));

//Serve our example user site.  This would normally be hosted by the customer, not us
app.use('/cust', express.static(path.join(__dirname, '../customer')));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(port, function () {
  console.log('App running on port ' + port);
});