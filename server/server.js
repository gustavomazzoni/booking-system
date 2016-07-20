var express = require('express');
var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var initDB = require('./lib/initDB');
var seed = require('./db/seed');
var protectJSON = require('./lib/protectJSON');
var cors = require('./lib/cors');
var routesAPIv1 = require('./routes/api/v1');

// Initialize DB
initDB.initialize(config, function() {
  // Uncomment in case you want to clean your DB
  // initDB.dropCollection('slots', function(err) {
  //   if(!err) {
  //     initDB.dropCollection('services', function() {
  //       // Set up database
  //       seed.setUp();
  //     });
  //   }
  // });
  // Set up database
  seed.setUp();
});

var app = express();

// JSON Vulnerability Protection
app.use(protectJSON);

// Allow CrossDomain
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Expose REST API endpoints
// anything beginning with "/api/v1" will go into this
app.use(config.server.apiV1Url, routesAPIv1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// For Resource not found by ID (ObjectID)
// Change response status to 404
app.use(function(err, req, res, next) {
  var msg = "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters";
  if (err.message === msg) {
    res.status(404);
    res.json({
      message: err.message,
      error: {}
    });
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


exports = module.exports = app;
