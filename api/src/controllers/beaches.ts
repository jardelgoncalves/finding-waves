import { Controller, Post } from '@overnightjs/core';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
@Controller('beaches')
export class BeachesController {
  @Post('')
  public async creare(req: Request, res: Response): Promise<void> {
    const beach = new Beach(req.body);
    const result = await beach.save();

    res.status(201).send(result);
  }
}
