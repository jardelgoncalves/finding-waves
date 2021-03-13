import moment from 'moment';
import { TimeUtil } from '../time';

describe('time.getUnixForFutureDays test', () => {
  it('should return an unix number to 10 days', () => {
    moment.now = () => {
      return +new Date(2020, 1, 1);
    };

    const unix = TimeUtil.getUnixTimeForFutureDays(10);

    expect(unix).toEqual(1581390000);
  });
});
