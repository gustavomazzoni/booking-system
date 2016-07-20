// code for initializing the DB w/ an product and slots
var mongoose = require('mongoose');

var initDB = {

  initialize: function(config, callback) {
    // Connect to our mongo database
    mongoose.connect(config.database.dbUrl, function(err) {
      if(err) {
        console.log('connection error', err);
      } else {
        console.log('connection successful');
      }
      if (callback) callback(err);
    });
  },

  dropCollection: function(collection, callback) {
    mongoose.connection.collections[collection].drop( function(err) {
      console.log(collection + ' collection dropped');

      if (callback) {
        callback(err);
      }
    });
  }
  
};

module.exports = initDB;

