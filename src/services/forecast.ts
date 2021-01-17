import { ForecastPoint, StormGlass } from '@src/clients/stormGlass';
import logger from '@src/logger';
import { Beach } from '@src/models/beach';
import { InternalError } from '@src/util/error/internal-error';

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

export interface TimeForecast {
  time: string;
  forecast: BeachForecast[];
}

export class ForecastProcessingInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during the forecast processing: ${message}`);
  }
}
export class Forecast {
  constructor(protected stormGlass = new StormGlass()) {}

  public async proccessForecastForBeaches(
    beaches: Beach[]
  ): Promise<TimeForecast[]> {
    const poinstWithCorrectSources: BeachForecast[] = [];
    logger.info(`Preparing the forecast for ${beaches.length} beaches`);
    try {
      for (const beach of beaches) {
        const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
        const enrichedBeachData = this.enrichedBeach(points, beach);

        poinstWithCorrectSources.push(...enrichedBeachData);
      }
      return this.mapForecastByTime(poinstWithCorrectSources);
    } catch (error) {
      logger.error(error);
      throw new ForecastProcessingInternalError(error.message);
    }
  }

  private enrichedBeach(
    points: ForecastPoint[],
    beach: Beach
  ): BeachForecast[] {
    return points.map((e) => ({
      name: beach.name,
      lat: beach.lat,
      lng: beach.lng,
      position: beach.position,
      rating: 1,
      ...e,
    }));
  }

  private mapForecastByTime(forecast: BeachForecast[]): TimeForecast[] {
    const forecastByTime: TimeForecast[] = [];
    for (const point of forecast) {
      const timePoint = forecastByTime.find((f) => f.time === point.time);
      if (timePoint) {
        timePoint.forecast.push(point);
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        });
      }
    }
    return forecastByTime;
  }
}
