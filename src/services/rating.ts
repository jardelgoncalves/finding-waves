import { Beach, GeoPosition } from '@src/models/beach';
import { ForecastPoint } from '@src/clients/stormGlass';

const waveHeights = {
  ankleToKnee: {
    min: 0.3,
    max: 1.0,
  },
  waistHigh: {
    min: 1.0,
    max: 2.0,
  },
  headHigh: {
    min: 2.0,
    max: 2.5,
  },
};
export class Rating {
  constructor(private beach: Beach) {}

  public getRateForPoint(point: ForecastPoint): number {
    const swellDirection = this.getPositionFromLocation(point.swellDirection);
    const windDirection = this.getPositionFromLocation(point.windDirection);
    const windAndWaveRating = this.getRatingBasedOnWindAndWavePosition(
      swellDirection,
      windDirection
    );
    const swellHeightRating = this.getRatingForSwellSize(point.swellHeight);
    const swellPeriodRating = this.getRatingForSwellPeriod(point.swellPeriod);

    const finalRating =
      (windAndWaveRating + swellHeightRating + swellPeriodRating) / 3;

    return Math.round(finalRating);
  }

  public getRatingBasedOnWindAndWavePosition(
    wavePosition: GeoPosition,
    windPosition: GeoPosition
  ): number {
    if (wavePosition === windPosition) return 1;
    if (this.isWindsOffShore(wavePosition, windPosition)) return 5;
    return 3;
  }

  public getRatingForSwellPeriod(period: number): number {
    const rating = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 4, 4, 4, 5];
    return rating[period > 14 ? 14 : period];
  }

  public getRatingForSwellSize(height: number): number {
    if (
      height >= waveHeights.ankleToKnee.min &&
      height < waveHeights.ankleToKnee.max
    ) {
      return 2;
    }

    if (
      height >= waveHeights.waistHigh.min &&
      height < waveHeights.headHigh.max
    ) {
      return 3;
    }

    if (height >= waveHeights.headHigh.min) {
      return 5;
    }

    return 1;
  }

  public getPositionFromLocation(coordinates: number): GeoPosition {
    if (coordinates >= 310 || (coordinates < 50 && coordinates > 0))
      return GeoPosition.N;

    if (coordinates >= 50 && coordinates < 120) return GeoPosition.E;

    if (coordinates >= 120 && coordinates < 220) return GeoPosition.S;

    if (coordinates >= 220 && coordinates < 310) return GeoPosition.W;

    return GeoPosition.E;
  }

  private isWindsOffShore(
    wavePosition: GeoPosition,
    windPosition: GeoPosition
  ): boolean {
    return (
      ('NESW'.indexOf(wavePosition) + 'NESW'.indexOf(windPosition)) % 2 === 0
    );
  }
}
