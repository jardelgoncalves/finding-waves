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
});
