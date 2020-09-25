import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
@Controller('beaches')
export class BeachesController {
  @Post('')
  public async creare(req: Request, res: Response): Promise<void> {
    res.status(201).send({ ...req.body, _id: 'fake-id' });
  }
}
