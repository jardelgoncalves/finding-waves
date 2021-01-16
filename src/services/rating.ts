import { Beach, Position } from '@src/models/beach';

export class Rating {
  constructor(private beach: Beach) {}

  getRatingBasedOnWindAndWavePosition(
    wavePosition: Position,
    windPosition: Position
  ): number {
    if (wavePosition === windPosition) return 1;
    if (this.isWindsOffShore(wavePosition, windPosition)) return 5;
    return 3;
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
