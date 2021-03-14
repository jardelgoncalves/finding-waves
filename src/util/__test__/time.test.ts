import { TimeUtil } from '../time';

describe('time.getUnixForFutureDays test', () => {
  it('should return an unix number to 10 days', () => {
    const unix = TimeUtil.getUnixTimeForFutureDays(10);

    expect(unix).toEqual(expect.any(Number));
  });
});
