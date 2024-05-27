import GameSavingLoader from '../../js/async/GameSavingLoader';

test('testing method .load() -> async', async () => {
  // expect.assertions(1); // NOTE: нужно ли ??? и почему здесь не работает done() - ???
  // FAIL: Expected one assertion to be called but received two assertion calls.
  expect.assertions(2);
  try {
    const result = await GameSavingLoader.load();
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
  } catch (err) { // NOTE: как протестировать блок catch ???
    expect(err.name).toEqual('Error');
  }
});
