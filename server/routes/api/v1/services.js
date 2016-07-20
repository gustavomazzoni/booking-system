var router = require('express').Router();
var mongoose = require('mongoose');
var Service = require('../../../models/Service.js');

/* GET /api/v1/services listing. */
// router.get('/', function(req, res, next) {
//   Service.find(function (err, services) {
//     if (err) return next(err);
//     res.json(services);
//   });
// });

/*  "/api/v1/services/:serviceId"
 *    GET: 
 */
router.get('/:serviceId', function(req, res, next) {
  Service.findById(req.params.serviceId, function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

// Nesting routers by attaching them as middleware:
router.use('/:serviceId/availability', require('./availability'));

/* POST /services */
// router.post('/', function(req, res, next) {
//   Service.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* PUT /services/:serviceId */
// router.put('/:serviceId', function(req, res, next) {
//   Service.findByIdAndUpdate(req.params.serviceId, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
