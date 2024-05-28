# Домашнее задание к лекции «Promises, async/await»

[![Build status](https://ci.appveyor.com/api/projects/status/tec62wpnumwpc579?svg=true)](https://ci.appveyor.com/project/Professor-Severus-Snape/ajs-async)

## Важно:
1. Код должен проходить ESLint без ошибок.
2. Unit-тесты должны обеспечивать 100% покрытие тестируемых функций и классов по строкам.

---

## Задача №1 (Promises)

### Легенда

JavaScript живёт в асинхронном мире и большинство операций в нём так же выполняются асинхронно. Вы реализовали возможность экспорта сохранённого прогресса игры в виде JSON. Теперь нужно реализовать загрузку из файла.

### Описание

Для вас реализованы функции-заглушки, которые эмулируют чтение файла и преобразование прочитанного в json. Ваша задача - реализовать класс `GameSavingLoader` с методом `load`, который загружает данные (с помощью функции `read`), парсит их (с помощью функции `json()`) и создаёт объект типа `GameSaving`.

Модуль `parser.js`:
```javascript
export default function json(data) {
  return new Promise((resolve, reject) => {
    // эмуляция обработки ArrayBuffer
    setTimeout(() => {
      resolve(String.fromCharCode.apply(null, new Uint16Array(data)));
    }, 500);
  });
}
```

Модуль `reader.js`:
```javascript
export default function read() {
  return new Promise((resolve, reject) => {
    // эмуляция чтения файла
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return (input => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i++) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 1000); 
  });
}
```

Пример использования класса (если бы это был синхронный код):
```javascript
export default class GameSavingLoader {
  static load() {
    const data = read(); // возвращается Promise!
    const value = json(data); // возвращается Promise!
    return value;
  }
}
```

Вам нужно переписать метод `load` так, чтобы он возвращал `Promise` с данными (см. формат ниже).

Спецификации объекта типа `GameSaving`:
```javascript
{
  "id": <number>, // id сохранения
  "created": <timestamp>, // timestamp создания
  "userInfo": {
    "id": <number>, // user id
    "name": <string>, // user name
    "level": <number>, // user level
    "points": <number> // user points
  }
}
```

Т.е. итоговый ваш код (модуль `app.js`) должен работать так:
```javascript
GameSavingLoader.load().then((saving) => {
  // saving объект класса GameSaving
}, (error) => {
  // ...
});
```

---

## Задача №2 (Async/await)

### Легенда

Вы устали от бесконечной цепочки `.then().then().catch()` и решили перейти на `async/await`.

### Описание

Перепишите предыдущую задачу с использованием `async/await`. Не забудьте про `try-catch` для отлова ошибок. Для этого используйте async IIFE (модуль `app.js`):
```javascript
(async () => {
  // Your code here with await
})();
```

---

## Задача №3 (Testing async code) - задача со звёздочкой

### Легенда

Асинхронный код - это здорово, но заглушки, которые были в предыдущих задачах всегда resolv'ятся, а в реальной жизни так бывает не всегда.

### Описание

Используя механизмы Jest, замокайте функции-заглушку `read`, чтобы у вас была возможность протестировать как `resolve`, так и `reject` на выходе из этой функции.

Должно обеспечиваться 100% покрытие функций и классов, которые вы тестируете. Обратите внимание, что вы тестируете асинхронный код.

**Подсказка**: чтобы было удобно замокать эту функцию, вынесите её в отдельный модуль.