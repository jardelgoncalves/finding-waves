import { Beach, Position } from '@src/models/beach';

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

  private isWindsOffShore(
    wavePosition: Position,
    windPosition: Position
  ): boolean {
    return (
      ('NESW'.indexOf(wavePosition) + 'NESW'.indexOf(windPosition)) % 2 === 0
    );
  }
}
