import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
  process.env.URI_MONGODB,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as mongoose.ConnectionOptions);

export default mongoose;
