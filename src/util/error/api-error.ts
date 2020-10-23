import httpStatusCodes from 'http-status-codes';

export interface APIError {
  message: string;
  code: number;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface ApiErrorResponse extends Omit<APIError, 'codeAsString'> {
  error: string;
}

export default class ApiError {
  public static format(error: APIError): ApiErrorResponse {
    return {
      ...{
        message: error.message,
        code: error.code,
        error: error?.codeAsString ?? httpStatusCodes.getStatusText(error.code),
      },
      ...(error.description && { description: error.description }),
      ...(error.documentation && { documentation: error.documentation }),
    };
  }
}
