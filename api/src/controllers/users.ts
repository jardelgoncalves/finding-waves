import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '@src/models/user';
import { BaseController } from '.';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      this.sendCreateOrUpdateResponseError(res, error);
    }
  }
  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<void> {
    res.status(200).send({ token: 'fake-token' });
  }
}
