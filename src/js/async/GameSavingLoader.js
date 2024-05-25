import read from '../reader';
import json from '../parser';
import GameSaving from '../GameSaving';

export default class GameSavingLoader {
  static async load() {
    // '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}'
    console.log('AsyncLoader (начало работы с файлом)');
    try {
      const buffer = await read();
      const str = await json(buffer);
      const obj = await JSON.parse(str);
      return new GameSaving(obj.id, obj.created, obj.userInfo);
    } catch (error) {
      console.warn('AsyncLoader (проброс ошибки в app.js)');
      throw new Error(error);
    } finally {
      console.log('AsyncLoader (работа с файлом завершена)');
    }
  }
}
