'use strict';

var express = require('express');
var morgan = require("morgan");
var bodyParser = require("body-parser");
var nconf = require('nconf');
var app = express();
nconf
  .argv()
  .env()
  .file({ file: './config.json' });

var port = process.env.PORT || nconf.get('app:port');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

var router = require('./routes/index');
app.use('/api', router);

app.listen(port, function () {
  console.log( "Express server listening on port " + port);
});
