import AsyncLoader from '../js/async/GameSavingLoader';

test('testing method .load() -> async', async () => {
  const result = await AsyncLoader.load();
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
  expect(result).toEqual(expected);
});
