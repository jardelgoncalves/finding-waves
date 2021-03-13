import moment from 'moment';

export class TimeUtil {
  public static getUnixTimeForFutureDays(days: number): number {
    return moment().add(days, 'days').unix();
  }
}
