import PromiseLoader from '../js/promises/GameSavingLoader';
import AsyncLoader from '../js/async/GameSavingLoader';
import read from '../js/reader';

jest.mock('../js/reader'); // мокаем весь модуль

beforeEach(() => jest.resetAllMocks());

test('testing promises reject: ', () => {
  read.mockRejectedValueOnce('Ошибка из promises!'); // возвращаемый результат из функции-мока
  PromiseLoader.load()
    .catch((error) => expect(error.message).toBe('Ошибка из promises!'));
});

test('testing async/await reject: ', async () => {
  try {
    read.mockRejectedValueOnce('Ошибка из async/await!'); // возвращаемый результат из функции-мока
    await AsyncLoader.load();
  } catch (error) {
    expect(error.message).toBe('Ошибка из async/await!');
  }
});
