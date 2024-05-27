import read from '../reader';
import json from '../parser';
import GameSaving from '../GameSaving';

export default class GameSavingLoader {
  static load() {
    // '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}'
    console.log('PromiseLoader - начало работы с файлом!');
    return read()
      .then(json)
      .then((str) => {
        const obj = JSON.parse(str);
        return new GameSaving(obj);
      })
      .catch((error) => {
        console.warn('PromiseLoader - проброс ошибки в app.js!');
        throw new Error(error);
      })
      .finally(() => console.log('PromiseLoader - работа с файлом завершена!'));
  }
}
