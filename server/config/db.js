import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export const connect = () => mongoose.connect(
    'mongodb+srv://roger:gula1310@cluster0-uvoyw.mongodb.net/pics?retryWrites=true',
    { useNewUrlParser: true }
);

