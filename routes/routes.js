const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/say-hello', controllers.sayHello);

module.exports = router;
