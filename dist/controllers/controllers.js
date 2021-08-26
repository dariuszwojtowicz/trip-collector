"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
const mongo_1 = __importDefault(require("../db/mongo"));
const Trip_1 = require("../db/Trip");
let allTrips = [];
mongo_1.default().then(() => {
    Trip_1.Trips.find().then((trips) => {
        allTrips = trips;
    });
});
const sayHello = (req, res) => {
    return res.status(200).send({
        body: allTrips.map((trip) => trip.name).join(', ')
    });
};
exports.sayHello = sayHello;
