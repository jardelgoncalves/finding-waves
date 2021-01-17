import { InternalError } from '@src/util/error/internal-error';
import config, { IConfig } from 'config';
import * as HTTPUtil from '@src/util/request';

export interface StormGlassPointSource {
  [key: string]: number;
}

export interface StormGlassPoint {
  readonly time: string;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly waveDirection: StormGlassPointSource;
  readonly waveHeight: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[];
}

export interface ForecastPoint {
  time: string;
  waveHeight: number;
  waveDirection: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  windDirection: number;
  windSpeed: number;
}

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error when trying to communicate to StormGlass';
    super(`${internalMessage}: ${message}`);
  }
}

export class StormGlassResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error returned by the StormGlass service';
    super(`${internalMessage} ${message}`);
  }
}

const stormGlassResourceConfig: IConfig = config.get(
  'App.resources.StormGlass'
);

export class StormGlass {
  readonly stormGlassApiSource = 'noaa';
  readonly stormGlassApiParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';

  constructor(protected request = new HTTPUtil.Request()) {}

  public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    try {
      const { data } = await this.request.get<StormGlassForecastResponse>(
        `${stormGlassResourceConfig.get(
          'apiUrl'
        )}/weather/point?lat=${lat}&lng=${lng}&params=${
          this.stormGlassApiParams
        }&source=${this.stormGlassApiSource}`,
        {
          headers: {
            Authorization: stormGlassResourceConfig.get('apiToken'),
          },
        }
      );

      return this.normalizeResponse(data);
    } catch (err) {
      if (HTTPUtil.Request.isRequestError(err))
        throw new StormGlassResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`
        );
      throw new ClientRequestError(err.message);
    }
  }

  private normalizeResponse(
    points: StormGlassForecastResponse
  ): ForecastPoint[] {
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      time: point.time,
      swellDirection: point.swellDirection[this.stormGlassApiSource],
      swellHeight: point.swellHeight[this.stormGlassApiSource],
      swellPeriod: point.swellPeriod[this.stormGlassApiSource],
      waveDirection: point.waveDirection[this.stormGlassApiSource],
      waveHeight: point.waveHeight[this.stormGlassApiSource],
      windDirection: point.windDirection[this.stormGlassApiSource],
      windSpeed: point.windSpeed[this.stormGlassApiSource],
    }));
  }

  private isValidPoint(points: Partial<StormGlassPoint>): boolean {
    return !!(
      points.time &&
      points.swellDirection?.[this.stormGlassApiSource] &&
      points.swellHeight?.[this.stormGlassApiSource] &&
      points.swellPeriod?.[this.stormGlassApiSource] &&
      points.waveDirection?.[this.stormGlassApiSource] &&
      points.waveHeight?.[this.stormGlassApiSource] &&
      points.windDirection?.[this.stormGlassApiSource] &&
      points.windSpeed?.[this.stormGlassApiSource]
    );
  }
}
