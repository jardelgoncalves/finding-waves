import bcrypt from 'bcrypt';

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
}
