/* eslint-disable @typescript-eslint/ban-types */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/user';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    passowrd: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(passowrd, hashPassword);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, config.get('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn'),
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
  }
}
