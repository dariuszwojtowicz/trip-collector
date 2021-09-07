const express = require('express');
const controller = require('./controllers');
const router = express.Router();

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .delete(controller.remove)
  .put(controller.put);

router.route('/:id/weather')
  .get(controller.getTripWeather);

module.exports = router;
