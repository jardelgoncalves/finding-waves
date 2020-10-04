/* eslint-disable @typescript-eslint/ban-types */

import { AuthService } from '@src/services/auth';
import { authMiddleware } from '../auth';

describe('AuthMiddleware', () => {
  it('should verify a JWT token and call the next middleware', async () => {
    const jwtToken = AuthService.generateToken({ data: 'faker-token' });
    const reqFaker = {
      headers: {
        'x-access-token': jwtToken,
      },
    };
    const resFaker = {};
    const nextFaker = jest.fn();
    authMiddleware(reqFaker, resFaker, nextFaker);
    expect(nextFaker).toHaveBeenCalled();
  });

  it('should return UNAUTHORIZED if there is a problem on the token verification', async () => {
    const reqFaker = {
      headers: {
        'x-access-token': 'invalid token',
      },
    };
    const sendMock = jest.fn();
    const resFaker = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const nextFaker = jest.fn();
    authMiddleware(reqFaker, resFaker as object, nextFaker);
    expect(resFaker.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt malformed',
    });
  });
});
