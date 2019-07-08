import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const connect = () => mongoose.connect(
    'mongodb+srv://roger:gula1310@cluster0-uvoyw.mongodb.net/sugary-art?retryWrites=true',
    { useNewUrlParser: true }
);

export default connect;
