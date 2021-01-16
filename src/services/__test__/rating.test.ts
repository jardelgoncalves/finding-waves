import { Beach, Position } from '@src/models/beach';
import { Rating } from '../rating';

describe('Rating Service', () => {
  const defaultBeach: Beach = {
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: Position.E,
    user: 'john-doe',
  };
  const defaultRating = new Rating(defaultBeach);

  describe('Calculate rating for a given point', () => {
    // TODO
  });

  describe('Get rating based on wind and wave position', () => {
    it('should get rating 1 for a beach with onshore winds', () => {
      const rating = defaultRating.getRatingBasedOnWindAndWavePosition(
        Position.E,
        Position.E
      );

      expect(rating).toBe(1);
    });

    it('should get rating 1 for a beach with cross winds', () => {
      const rating = defaultRating.getRatingBasedOnWindAndWavePosition(
        Position.E,
        Position.S
      );

      expect(rating).toBe(3);
    });

    it('should get rating 5 for a beach with offshore winds', () => {
      const rating = defaultRating.getRatingBasedOnWindAndWavePosition(
        Position.E,
        Position.W
      );

      expect(rating).toBe(5);
    });
  });

  describe('Get rating based on swell period', () => {
    it('should get a rating of 1 for a period of 5 seconds', () => {
      const rating = defaultRating.getRatingForSwellPeriod(5);
      expect(rating).toBe(1);
    });
    it('should get a rating of 2 for a period of 9 seconds', () => {
      const rating = defaultRating.getRatingForSwellPeriod(9);
      expect(rating).toBe(2);
    });
    it('should get a rating of 4 for a period of 12 seconds', () => {
      const rating = defaultRating.getRatingForSwellPeriod(12);
      expect(rating).toBe(4);
    });
    it('should get a rating of 5 for a period of 16 seconds', () => {
      const rating = defaultRating.getRatingForSwellPeriod(16);
      expect(rating).toBe(5);
    });
  });

  describe('Get rating based on swell height', () => {
    it('should get a rating of 1 for less than ankle to knee high swell', () => {
      const rating = defaultRating.getRatingForSwellSize(0.2);
      expect(rating).toBe(1);
    });

    it('should get a rating of 2 for an ankle to knee high swell', () => {
      const rating = defaultRating.getRatingForSwellSize(0.6);
      expect(rating).toBe(2);
    });

    it('should get a rating of 3 for waist high swell', () => {
      const rating = defaultRating.getRatingForSwellSize(1.5);
      expect(rating).toBe(3);
    });

    it('should get a rating of 5 for overhead swell', () => {
      const rating = defaultRating.getRatingForSwellSize(2.5);
      expect(rating).toBe(5);
    });
  });
});
