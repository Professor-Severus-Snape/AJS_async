import read from '../reader';
import json from '../parser';
import GameSaving from '../GameSaving';

export default class GameSavingLoader {
  static load() {
    // '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}'
    console.log('PromiseLoader (начало работы с файлом)');
    return read()
      .then(json)
      .then(JSON.parse)
      .then((obj) => new GameSaving(obj.id, obj.created, obj.userInfo))
      .catch((error) => {
        console.warn('PromiseLoader (проброс ошибки в app.js)');
        throw new Error(error);
      })
      .finally(() => console.log('PromiseLoader (работа с файлом завершена)'));
  }
}