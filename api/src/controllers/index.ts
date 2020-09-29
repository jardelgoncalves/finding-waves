import { Response } from 'express';
import mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreateOrUpdateResponseError(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(422).send({ code: 422, error: error.message });
      return;
    }
    res.status(500).send({ code: 500, error: 'Something went wrang!' });
  }
}
