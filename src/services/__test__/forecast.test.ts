import { StormGlass } from '@src/clients/stormGlass';
import { Beach, GeoPosition } from '@src/models/beach';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import { Forecast, ForecastProcessingInternalError } from '../forecast';
import { Rating } from '../rating';

jest.mock('@src/clients/stormGlass');

describe('Forecast Service', () => {
  const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;
  const beaches: Beach[] = [
    {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: GeoPosition.E,
      user: 'fake-id',
    },
  ];

  it('should return the forecast for mutiple beaches in the same hour with different ratings ordered by rating', async () => {
    mockedStormGlassService.fetchPoints.mockResolvedValueOnce([
      {
        swellDirection: 123.41,
        swellHeight: 0.21,
        swellPeriod: 3.67,
        time: '2020-04-26T00:00:00+00:00',
        waveDirection: 232.12,
        waveHeight: 0.46,
        windDirection: 310.48,
        windSpeed: 100,
      },
    ]);
    mockedStormGlassService.fetchPoints.mockResolvedValueOnce([
      {
        swellDirection: 64.26,
        swellHeight: 0.15,
        swellPeriod: 13.89,
        time: '2020-04-26T00:00:00+00:00',
        waveDirection: 231.38,
        waveHeight: 2.07,
        windDirection: 299.45,
        windSpeed: 100,
      },
    ]);
    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: GeoPosition.E,
        user: 'fake-id',
      },
      {
        lat: -33.792726,
        lng: 141.289824,
        name: 'Dee Why',
        position: GeoPosition.S,
        user: 'fake-id',
      },
    ];
    const expectedResponse = [
      {
        time: '2020-04-26T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 141.289824,
            name: 'Dee Why',
            position: 'S',
            rating: 3,
            swellDirection: 64.26,
            swellHeight: 0.15,
            swellPeriod: 13.89,
            time: '2020-04-26T00:00:00+00:00',
            waveDirection: 231.38,
            waveHeight: 2.07,
            windDirection: 299.45,
            windSpeed: 100,
          },
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 2,
            swellDirection: 123.41,
            swellHeight: 0.21,
            swellPeriod: 3.67,
            time: '2020-04-26T00:00:00+00:00',
            waveDirection: 232.12,
            waveHeight: 0.46,
            windDirection: 310.48,
            windSpeed: 100,
          },
        ],
      },
    ];
    const forecast = new Forecast(mockedStormGlassService, Rating);
    const beachesWithRating = await forecast.proccessForecastForBeaches(
      beaches
    );
    expect(beachesWithRating).toEqual(expectedResponse);
  });

  it('shoul return the forecast for a list of beaches', async () => {
    mockedStormGlassService.fetchPoints.mockResolvedValue(
      stormGlassNormalized3HoursFixture
    );

    const expectedResponse = [
      {
        time: '2020-04-26T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 2,
            swellDirection: 64.26,
            swellHeight: 0.15,
            swellPeriod: 3.89,
            time: '2020-04-26T00:00:00+00:00',
            waveDirection: 231.38,
            waveHeight: 0.47,
            windDirection: 299.45,
            windSpeed: 100,
          },
        ],
      },
      {
        time: '2020-04-26T01:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 2,
            swellDirection: 123.41,
            swellHeight: 0.21,
            swellPeriod: 3.67,
            time: '2020-04-26T01:00:00+00:00',
            waveDirection: 232.12,
            waveHeight: 0.46,
            windDirection: 310.48,
            windSpeed: 100,
          },
        ],
      },
      {
        time: '2020-04-26T02:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 2,
            swellDirection: 182.56,
            swellHeight: 0.28,
            swellPeriod: 3.44,
            time: '2020-04-26T02:00:00+00:00',
            waveDirection: 232.86,
            waveHeight: 0.46,
            windDirection: 321.5,
            windSpeed: 100,
          },
        ],
      },
    ];

    const forecast = new Forecast(mockedStormGlassService);
    const beachesWithRating = await forecast.proccessForecastForBeaches(
      beaches
    );
    expect(beachesWithRating).toEqual(expectedResponse);
  });

  it('should return an empty list when the beaches is empty', async () => {
    const forecast = new Forecast();
    const response = await forecast.proccessForecastForBeaches([]);

    expect(response).toEqual([]);
  });

  it('should throw internal processing error when something goes wrong during the rating process', async () => {
    mockedStormGlassService.fetchPoints.mockRejectedValue('Erro fetching data');
    const forecast = new Forecast(mockedStormGlassService);
    await expect(forecast.proccessForecastForBeaches(beaches)).rejects.toThrow(
      ForecastProcessingInternalError
    );
  });
});
