const router = require('express').Router();

router.use('/trips', require('./trip/routes'));
router.use('/cities', require('./city/routes'));

module.exports = router;
