import { Beach, Position } from '@src/models/beach';

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

  public getRatingBasedOnWindAndWavePosition(
    wavePosition: Position,
    windPosition: Position
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

  private isWindsOffShore(
    wavePosition: Position,
    windPosition: Position
  ): boolean {
    return (
      ('NESW'.indexOf(wavePosition) + 'NESW'.indexOf(windPosition)) % 2 === 0
    );
  }
}
