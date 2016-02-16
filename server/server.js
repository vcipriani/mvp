var express = require('express');
var app = express();
var path = require('path');

var port = 3000;

//Initialize database
var bookshelf = require('./database');


//Serve our admin app
app.use('/app', express.static(path.join(__dirname, '../client')));

//Serve our example customer site.  This would normally be hosted by the customer, not us
app.use('/cust', express.static(path.join(__dirname, '../customer')));

//Load routers
var contentRouter = require('./routes/contentRouter');

app.use('/content/', contentRouter);

//Dev only nodeserver - should remove and run as separate project
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));


app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(port, function () {
  console.log('App running on port ' + port);
});