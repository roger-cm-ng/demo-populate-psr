import mongoose from 'mongoose';

const { Schema } = mongoose;
const picSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Pic must have title'],
  },
  url: {
    type: String,
    required: [true, 'Pic must have url'],
  },
  blurb: {
    type: String
  },
  price: {
    type: Number
  },
  limit: {
    type: Number
  }
});
export default mongoose.model('Pic', picSchema);