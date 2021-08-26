const mongo = require('../db/mongo');
const Trip = require('../db/Trip');

let allTrips = [];

mongo().then(() => {
  Trip.find().then((trips) => {
    allTrips = trips;
  });
})

const sayHello = (req, res) => {
  return res.status(200).send({
    body: allTrips.map((trip) => trip.name).join(', ')
  });
};

module.exports =  {
  sayHello
};
