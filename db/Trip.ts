import mongoose from 'mongoose';

export interface Trip {
  name: string;
}

export const Trips = mongoose.model('Trips', new mongoose.Schema({
  name: String
}));
