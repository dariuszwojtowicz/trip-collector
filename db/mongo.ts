import mongoose from 'mongoose';
const mongoPath = 'mongodb+srv://trip-collector:2XotZgXjncD8y6t7@trip-collector.hhxdi.mongodb.net/trip-collector?retryWrites=true&w=majority';

export default async () => {
  await mongoose.connect(mongoPath);

  return mongoose;
}
