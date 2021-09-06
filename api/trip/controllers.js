const Trip = require('./model');
const mongoose = require('mongoose');

const get = (req, res, next) => Trip
  .find({})
    .then((trips) => res.json(trips))
    .catch((err) => next(err));

const getOne = (req, res) => {
  const { id } = req.params;
  let tripId;
  try {
    tripId = mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(500).json({
        message: `Wrong id: ${id}`,
        error: err.toString()
      });
  }
  return Trip
    .findById(tripId)
    .then((trip) => {
      if (trip) {
        return res.json(trip);
      }
      res.status(404).json({ message: `Trip with id: ${id} does not exists` });
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during fetching Trip with id: ${id}`,
        error: err
      })
    );
};

const post = (req, res) => {
  const newTrip = new Trip(req.body);
  newTrip.save((err, trip) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(trip);
  });
};

const put = (req, res) => {
  const { id } = req.params;
  let tripId;
  try {
    tripId = mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(500).json({
      message: `Wrong id: ${id}`,
      error: err.toString()
    });
  }
  return Trip.findByIdAndUpdate(tripId, req.body, { new: true, runValidators: true })
    .then((trip) => {
      if (!trip) {
        res.status(404).json({ message: `Trip with id: ${id} does not exists` });
      }
      res.status(200).json(trip);
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during updating Trip with id: ${id}`,
        error: err
      })
    );
};

const remove = (req, res) => {
  const { id } = req.params;
  let tripId;
  try {
    tripId = mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(500).json({
      message: `Wrong id: ${id}`,
      error: err.toString()
    });
  }
  return Trip.findByIdAndRemove(tripId)
    .then((trip) => {
      if (!trip) {
        res.status(404).json({ message: `Trip with id: ${id} does not exists` });
      }
      res.status(200).send();
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during deleting Trip with id: ${id}`,
        error: err
      })
    );
};

module.exports = {
  get,
  getOne,
  post,
  put,
  remove
};
