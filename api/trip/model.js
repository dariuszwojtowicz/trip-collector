const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToSeeSchema = new Schema({
  name: { type: String, required: true },
  coords: [String]
});

const NoteSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
});

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const ExpenseSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'PLN' },
  userCurrencyAmount: {
    type: Number,
    required: true,
    default: function() {
      return this.amount;
    }
  }
});

const TodoSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false }
});

const TripSchema = new Schema({
  name: { type: String, required: true, unique: true },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  dateFrom: { type: String, required: true },
  dateTo: { type: String, required: true },
  toSee: [ToSeeSchema],
  events: [EventSchema],
  expenses: [ExpenseSchema],
  notes: [NoteSchema],
  toTake: [TodoSchema],
  toHandle: [TodoSchema],
  accommodation: {
    name: { type: String, required: true },
    coords: [String]
  },
  flight: {
    to: {
      line: String,
      date: String,
      time: String,
      fromAirport: {
        name: String,
        coords: [String]
      },
      toAirport: {
        name: String,
        coords: [String]
      }
    },
    from: {
      line: String,
      date: String,
      time: String,
      fromAirport: {
        name: String,
        coords: [String]
      },
      toAirport: {
        name: String,
        coords: [String]
      }
    }
  }
});

module.exports = mongoose.model('Trip', TripSchema);

// TODO make Arrays (toSee, events) have values unique by name
