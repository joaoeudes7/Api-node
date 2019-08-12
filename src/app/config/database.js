import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
  process.env.URI_MONGODB,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  });
mongoose.Promise = Promise; // Mongoose using ES6

export default mongoose;
