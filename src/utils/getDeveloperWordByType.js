export const getDeveloperWordByType = (type, count) => {
  switch (type) {
    case 'movie':
    case 'series':
      return count === 1 ? 'Студия' : 'Студии'

    case 'game':
      return count === 1 ? 'Разработчик' : 'Разработчики'

    case 'book':
      return count === 1 ? 'Автор' : 'Авторы'
  }
}
