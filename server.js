const express = require('express');
const api = require('./api/api');
const mongoose = require('mongoose');
const path = require('path');
const applyMiddleware = require('./middleware/middleware');
const mongoPath = 'mongodb+srv://trip-collector:2XotZgXjncD8y6t7@trip-collector.hhxdi.mongodb.net/trip-collector?retryWrites=true&w=majority';

const port = process.env.PORT || 5000;

const app = express();

applyMiddleware(app);

app.use('/api/v1/', api);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
};

app.get('*', (req, res) => {
  res.status(200).json({
    msg: 'Catch All'
  });
});

mongoose.connect(mongoPath).then(() => {
  app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
});
