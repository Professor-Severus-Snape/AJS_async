import PromiseLoader from '../js/promises/GameSavingLoader';

test('testing method .load() -> promises', () => {
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    },
  };
  return PromiseLoader.load().then((data) => expect(data).toEqual(expected));
});
