import { orderBy } from '../order-by';

describe('orderBy test', () => {
  it('should return an array of the object ordered', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
    ];
    const ordered = orderBy(users, ['name', 'age'], ['asc', 'desc']);

    expect(ordered).toEqual([
      { name: 'barney', age: 36 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 40 },
    ]);
  });
});
