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
});
