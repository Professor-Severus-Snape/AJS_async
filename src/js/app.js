import PromiseLoader from './promises/GameSavingLoader';
import AsyncLoader from './async/GameSavingLoader';
import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

// статический метод .load() объекта GameSavingLoader на промисах:
PromiseLoader.load().then(
  (result) => console.log('PromiseLoader (результат): ', result),
  (error) => console.error('PromiseLoader (ошибка): ', error),
);

// статический метод .load() объекта GameSavingLoader на async/await:
async function testAsyncLoader() {
  try {
    const result = await AsyncLoader.load();
    console.log('AsyncLoader (результат): ', result);
  } catch (error) {
    console.error('AsyncLoader (ошибка): ', error);
  }
}

testAsyncLoader();

// вариант с IIFE для асинхронной функции на async/await:
(async () => {
  console.log('IIFE - начало работы с файлом!');
  try {
    const buffer = await read();
    const str = await json(buffer);
    const obj = JSON.parse(str);
    console.log('IIFE (результат): ', new GameSaving(obj));
  } catch (error) {
    console.error('IIFE (ошибка): ', error);
  } finally {
    console.log('IIFE - работа с файлом завершена!');
  }
})();
