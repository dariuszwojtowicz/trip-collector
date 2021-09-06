const router = require('express').Router();

router.use('/trips', require('./trip/routes'));

module.exports = router;
