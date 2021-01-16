import { Beach, Position } from '@src/models/beach';
import nock from 'nock';
import stormGlass3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import apiForecastResponse1BeachFixture from '@test/fixtures/api_forecast_response_1_beach.json';
import { User } from '@src/models/user';
import { AuthService } from '@src/services/auth';

describe('Beach forecast functional test', () => {
  const defaultBeach = {
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: Position.E,
  };
  let token: string;
  const defaultUser = {
    name: 'John Doe',
    email: 'john@email.com',
    password: '1234',
  };

  beforeEach(async () => {
    await Beach.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    await new Beach({ ...defaultBeach, ...{ user: user.id } }).save();
    token = AuthService.generateToken(user.toJSON());
  });
  it('should return a forecast with just a few times', async () => {
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({
        lat: '-33.792726',
        lng: '151.289824',
        params: /(.*)/,
        source: 'noaa',
      })
      .reply(200, stormGlass3HoursFixture);

    const { body, status } = await global.testRequest
      .get('/forecast')
      .set({ 'x-access-token': token });
    expect(status).toBe(200);
    expect(body).toEqual(apiForecastResponse1BeachFixture);
  });

  it('should return 500 if something goes wrong during the ptocessing', async () => {
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({
        lat: '-33.792726',
        lng: '151.289824',
      })
      .replyWithError('Somthing went wrong');

    const { status } = await global.testRequest
      .get('/forecast')
      .set({ 'x-access-token': token });
    expect(status).toBe(500);
  });
});
