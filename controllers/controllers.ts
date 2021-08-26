import mongo from '../db/mongo';
import { Trips, Trip } from '../db/Trip';

let allTrips: Trip[] = [];

mongo().then(() => {
  Trips.find().then((trips) => {
    allTrips = trips as unknown as Trip[];
  });
})

export const sayHello = (req: any, res: any) => {
  return res.status(200).send({
    body: allTrips.map((trip) => trip.name).join(', ')
  });
};
