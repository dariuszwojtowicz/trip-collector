const axios = require('axios');
const mongoose = require('mongoose');
const Trip = require('./model');

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely'
  + '&APPID=8faa7769b2066e22513f02e6aa871489';


const getTripToSee = (req, res) => {
  const {id} = req.params;
  let tripId;
  try {
    tripId = mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(500).json({
      message: `Wrong id: ${id}`,
      error: err.toString()
    });
  }
  Trip
    .findById(tripId)
    .populate('toSee')
    .then((trip) => {
      if (trip) {
        return res.status(200).json(trip.toSee || []);
      }
      return res.status(404).json({ message: `Trip with id: ${id} does not exists` });
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during fetching Trip with id: ${id}`,
        error: err
      })
    );
};

const putTripToSee = (req, res) => {
  const {id} = req.params;
  let tripId;
  try {
    tripId = mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(500).json({
      message: `Wrong id: ${id}`,
      error: err.toString()
    });
  }
  Trip
    .findById(tripId)
    .then((trip) => {
      if (trip) {
        Trip.findByIdAndUpdate(tripId, { ...trip.toJSON(), toSee: req.body }, { new: true, runValidators: true })
          .then((updatedTrip) => {
            return res.status(200).json(updatedTrip.toSee);
          })
      } else {
        return res.status(404).json({message: `Trip with id: ${id} does not exists`});
      }
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during updating To See for Trip with id: ${id}`,
        error: err
      })
    );
};


const getTripWeather = (req, res) => {
  const {id} = req.params;
  let tripId;
  try {
    tripId = mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(500).json({
      message: `Wrong id: ${id}`,
      error: err.toString()
    });
  }
  Trip
    .findById(tripId)
    .populate('city', 'coord')
    .then(async (trip) => {
      console.log(trip);
      if (trip) {
        const { lon, lat } = trip.city.coord;
        try {
          const response = await axios.get(`${weatherApiUrl}&lon=${lon}&lat=${lat}`);
          return res.status(200).json(response.data);
        } catch (err) {
          return res.status(500).json({
            message: `Error during fetching weather for trip with id: ${id}`,
            error: err.toString()
          });
        }
      }
      return res.status(404).json({ message: `Trip with id: ${id} does not exists` });
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during fetching Trip with id: ${id}`,
        error: err
      })
    );
};

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
    .populate('city', 'name')
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
  remove,
  getTripWeather,
  getTripToSee,
  putTripToSee
};
