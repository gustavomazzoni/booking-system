var path = require('path');

module.exports = {
  database: {
    dbUrl: process.env.MONGOLAB_URI || 'localhost/bookingflow'   // The base url of the MongoLab DB server
    // apiKey: '4fb51e55e4b02e56a67b0b66'                 // Our MongoLab API key
  },
  server: {
    listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    distFolder: path.resolve(__dirname, '../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
    apiV1Url: '/api/v1',                                // The base url from which we serve API v1 resources
    cookieSecret: 'bookingflow'                         // The secret for encrypting the cookie
  }
};