const mongoose = require('mongoose');
const mongoPath = 'mongodb+srv://trip-collector:2XotZgXjncD8y6t7@trip-collector.hhxdi.mongodb.net/trip-collector?retryWrites=true&w=majority';

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return mongoose;
}
