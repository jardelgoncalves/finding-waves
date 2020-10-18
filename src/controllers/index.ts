import { Response } from 'express';
import { CUSTOM_VALIDATION } from '@src/models/user';
import mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreateOrUpdateResponseError(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientError = this.handlerClientError(error);
      res.status(clientError.code).send(clientError);
      return;
    }
    res.status(500).send({ code: 500, error: 'Something went wrang!' });
  }

  private handlerClientError(
    error: mongoose.Error.ValidationError
  ): { code: number; error: string } {
    const duplicatedKinErrors = Object.values(error.errors).filter(
      (err) => err.kind === CUSTOM_VALIDATION.DUPLICATED
    );
    let code = 422;
    if (duplicatedKinErrors.length) code = 409;

    return { code, error: error.message };
  }
}
