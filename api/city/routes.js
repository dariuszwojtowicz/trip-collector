const express = require('express');
const controller = require('./controllers');
const router = express.Router();

router.route('/:name')
  .get(controller.get)

module.exports = router;
