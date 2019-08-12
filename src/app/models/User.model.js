import mongoose from '../config/database';
import { hash as _hash } from 'bcryptjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  this.password = await _hash(this.password, 10); // Encrypt password
  next();
});

const User = mongoose.model('User', UserSchema);
export default User;
