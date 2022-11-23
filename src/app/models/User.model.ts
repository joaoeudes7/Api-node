// eslint-disable-next-line no-unused-vars
import { Schema, Document, model } from 'mongoose';
import { hash as _hash } from 'bcryptjs';

export interface IUser extends Document {
  name?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  active?: boolean
}

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
  },
  active: {
    type: Boolean,
    default: true
  }
});

UserSchema.pre<IUser>('save', async function (next) {
  this.password = await _hash(this.password, 10); // Encrypt password
  next();
});

const User = model<IUser>('Users', UserSchema);
export default User;
