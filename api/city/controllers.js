const City = require('./model');

const get = (req, res, next) => {
  const regex = new RegExp('^' + req.params.name, 'i');
  City
    .find({ name: regex })
    .then((trips) => res.json(trips))
    .catch((err) => next(err));
}

module.exports = {
  get
};
