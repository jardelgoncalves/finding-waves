import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

export interface UserModel extends Omit<User, '_id'>, Document {}

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

// validations
schema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

// hooks
schema.pre<UserModel>('save', async function (): Promise<void> {
  if (!this.password || !this.isModified('password')) return;
  try {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
  } catch (error) {
    console.error(`Error hashing the password for the user ${this.name}`);
  }
});

export async function hashPassword(
  password: string,
  salt = 10
): Promise<string> {
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  passowrd: string,
  hashPassword: string
): Promise<boolean> {
  return bcrypt.compare(passowrd, hashPassword);
}

export const User = mongoose.model<UserModel>('User', schema);
