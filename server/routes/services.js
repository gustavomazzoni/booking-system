var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Service = require('../models/Service.js');

exports.addRoutes = function(app, config) {

	var resource = "/services";

	/* GET /api/v1/services listing. */
	// router.get('/', function(req, res, next) {
	//   Service.find(function (err, services) {
	//     if (err) return next(err);
	//     res.json(services);
	//   });
	// });

	/*  "/api/v1/services/:id"
	 *    GET: 
	 */
	router.get('/:id', function(req, res, next) {
	  Service.findById(req.params.id, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  });
	});

	/* POST /services */
	// router.post('/', function(req, res, next) {
	//   Service.create(req.body, function (err, post) {
	//     if (err) return next(err);
	//     res.json(post);
	//   });
	// });

	/* PUT /services/:id */
	// router.put('/:id', function(req, res, next) {
	//   Service.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	//     if (err) return next(err);
	//     res.json(post);
	//   });
	// });


 	// Set Service resource to API v1
 	app.use(config.server.apiV1Url + resource, router);
};
