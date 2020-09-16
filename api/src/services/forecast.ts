import { ForecastPointNormalized, StormGlass } from '@src/clients/stormGlass';

export enum BeachPosition {
  E = 'E',
  S = 'S',
  W = 'W',
  N = 'N',
}

export interface Beach {
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: string;
}

export interface BeachForecast
  extends Omit<Beach, 'user'>,
    ForecastPointNormalized {}

export class Forecast {
  constructor(protected stormGlass = new StormGlass()) {}

  public async proccessForecastForBeaches(
    beaches: Beach[]
  ): Promise<BeachForecast[]> {
    const poinstWithCorrectSources: BeachForecast[] = [];
    for (const beach of beaches) {
      const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
      const enrichedBeachData = points.map((e) => ({
        name: beach.name,
        lat: beach.lat,
        lng: beach.lng,
        position: beach.position,
        rating: 1,
        ...e,
      }));
      poinstWithCorrectSources.push(...enrichedBeachData);
    }
    return poinstWithCorrectSources;
  }
}
