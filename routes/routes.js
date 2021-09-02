const express = require('express');
const { sayHello } = require('../controllers/controllers');
const router = express.Router();

router.get('/say-hello', sayHello);

module.exports = router;
