import { Response } from 'express';
import { CUSTOM_VALIDATION } from '@src/models/user';
import mongoose from 'mongoose';
import logger from '@src/logger';
import ApiError, { APIError } from '@src/util/error/api-error';

export abstract class BaseController {
  protected sendCreateOrUpdateResponseError(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientError = this.handlerClientError(error);
      res.status(clientError.code).send(
        ApiError.format({
          code: clientError.code,
          message: clientError.error,
        })
      );
      return;
    }
    logger.error(error);
    res
      .status(500)
      .send(ApiError.format({ code: 500, message: 'Something went wrang!' }));
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

  protected sendErrorResponse(res: Response, apiError: APIError): Response {
    return res.status(apiError.code).send(ApiError.format(apiError));
  }
}
