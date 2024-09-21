export function convertEpochToDate(seconds) {
  // Створюємо об'єкт Date, передавши кількість мілісекунд
  let date = new Date(seconds * 1);

  // Отримуємо день, місяць і рік
  let day = date.getUTCDate().toString().padStart(2, '0'); // Додаємо 0, якщо день менше 10
  let month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Місяці починаються з 0, тому додаємо 1
  let year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
