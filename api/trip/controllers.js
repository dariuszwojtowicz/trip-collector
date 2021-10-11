const axios = require('axios');
const mongoose = require('mongoose');
const Trip = require('./model');

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely'
  + '&APPID=8faa7769b2066e22513f02e6aa871489';


const paramId = (req, res, next, id) =>
  Trip
    .findById(id)
    .populate('city', 'name country')
    .then((trip) => {
      if (trip) {
        req.trip = trip;
        next();
      } else {
        return next(new Error(`Trip with id: ${id} does not exists`));
      }
    })
    .catch(() => next(new Error(`Error during fetching Trip with id: ${id}`)));

const getTripToSee = (req, res) => res.status(200).json(req.trip.toSee || []);

const putTripToSee = (req, res) => {
  Trip.findByIdAndUpdate(req.trip._id, { ...req.trip.toJSON(), toSee: req.body }, { new: true, runValidators: true })
    .then((updatedTrip) => {
      return res.status(200).json(updatedTrip.toSee);
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during updating To See for Trip with id: ${req.params.id}`,
        error: err
      })
    );
};

const getTripWeather = async (req, res) => {
  const { lon, lat } = req.trip.city.coord;
  try {
    const response = await axios.get(`${weatherApiUrl}&lon=${lon}&lat=${lat}`);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({
      message: `Error during fetching weather for trip with id: ${req.params.id}`,
      error: err.toString()
    });
  }
};

const get = (req, res, next) => Trip
  .find({})
    .then((trips) => res.json(trips))
    .catch((err) => next(err));

const getOne = (req, res) => res.json(req.trip);

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
  Trip.findByIdAndUpdate(req.trip._id, req.body, { new: true, runValidators: true })
    .then((trip) => {
      if (!trip) {
        res.status(404).json({ message: `Trip with id: ${req.params.id} does not exists` });
      }
      res.status(200).json(trip);
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during updating Trip with id: ${req.params.id}`,
        error: err
      })
    );
};

const remove = (req, res) => {
  Trip.findByIdAndRemove(req.trip._id)
    .then((trip) => {
      if (!trip) {
        res.status(404).json({ message: `Trip with id: ${req.params.id} does not exists` });
      }
      res.status(200).send();
    })
    .catch(err => res.status(500)
      .json({
        message: `Error during deleting Trip with id: ${req.params.id}`,
        error: err
      })
    );
};

module.exports = {
  paramId,
  get,
  getOne,
  post,
  put,
  remove,
  getTripWeather,
  getTripToSee,
  putTripToSee
};
