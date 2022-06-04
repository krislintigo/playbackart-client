export const getDeveloperWordByType = (type: string, count: number): string => {
  switch (type) {
    case 'movie':
    case 'series':
      return count === 1 ? 'Студия' : 'Студии'

    case 'game':
      return count === 1 ? 'Разработчик' : 'Разработчики'

    case 'book':
      return count === 1 ? 'Автор' : 'Авторы'

    default:
      return count === 1 ? 'Создатель' : 'Создатели'
  }
}
