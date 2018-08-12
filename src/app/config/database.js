import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/api', { useNewUrlParser: true });
mongoose.Promise = Promise; // Mongoose using ES6

export default mongoose;
