const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

module.exports = (app) => {
  app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
};
