var router = require('express').Router();

// split up route handling
router.use('/services', require('./services'));
router.use('/bookings', require('./booking'));
router.use('/chronicHealthProblems', require('./chronicHealthProblems'));
// etc.

module.exports = router;