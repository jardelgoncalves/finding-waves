import { StormGlass } from '@src/clients/stormGlass';
import { Beach, BeachPosition } from '@src/models/beach';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import { Forecast, ForecastProcessingInternalError } from '../forecast';

jest.mock('@src/clients/stormGlass');

describe('Forecast Service', () => {
  const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;
  const beaches: Beach[] = [
    {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: BeachPosition.E,
    },
  ];

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
            rating: 1,
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
            rating: 1,
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
            rating: 1,
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
    const beachesWithRaiting = await forecast.proccessForecastForBeaches(
      beaches
    );
    expect(beachesWithRaiting).toEqual(expectedResponse);
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
