import mongoose, { Document, Schema } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique'],
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

export interface UserModel extends Omit<User, '_id'>, Document {}

export const User = mongoose.model<UserModel>('User', schema);
