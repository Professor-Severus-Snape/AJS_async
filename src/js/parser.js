export default function json(buffer) {
  return new Promise((resolve) => {
    // эмуляция обработки ArrayBuffer (преобразование в строку):
    setTimeout(() => {
      resolve(String.fromCharCode.apply(null, new Uint16Array(buffer)));
    }, 500);
  });
}
