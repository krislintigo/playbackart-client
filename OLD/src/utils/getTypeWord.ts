export const getTypeWord = (type: string): string => {
  switch (type) {
    case 'movie':
      return 'Фильм'
    case 'series':
      return 'Сериал'
    case 'game':
      return 'Игра'
    case 'book':
      return 'Книга'
    default:
      return 'Неизвестный тип'
  }
}
