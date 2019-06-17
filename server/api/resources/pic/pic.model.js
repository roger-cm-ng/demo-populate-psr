import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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
picSchema.plugin(mongoosePaginate);
export default mongoose.model('Pic', picSchema);