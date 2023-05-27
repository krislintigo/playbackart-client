export const statuses = [
  {
    title: 'В процессе',
    icon: ElIconVideoPlay,
    value: 'in-process',
    color: 'var(--el-color-primary-light-3)',
  },
  {
    title: 'Запланировано',
    icon: ElIconPlus,
    value: 'planned',
    color: 'var(--el-color-warning-light-3)',
  },
  {
    title: 'Завершено',
    icon: ElIconSelect,
    value: 'completed',
    color: 'var(--el-color-success-light-3)',
  },
  {
    title: 'Отложено',
    icon: ElIconVideoPause,
    value: 'postponed',
    color: 'var(--el-color-info-light-3)',
  },
  {
    title: 'Брошено',
    icon: ElIconCloseBold,
    value: 'abandoned',
    color: 'var(--el-color-danger)',
  },
]

export const navigationTabs = [
  {
    icon: ElIconList,
    label: 'Все',
    searchType: '',
  },
  {
    icon: ElIconVideoCameraFilled,
    label: 'Фильмы',
    searchType: 'movie',
  },
  {
    icon: ElIconFilm,
    label: 'Сериалы',
    searchType: 'series',
  },
  {
    icon: ElIconMonitor,
    label: 'Игры',
    searchType: 'game',
  },
  {
    icon: ElIconCollection,
    label: 'Книги',
    searchType: 'book',
  },
]

export const rating = {
  texts: [
    'Отвратительно',
    'Ужасно',
    'Очень плохо',
    'Плохо',
    'Так себе',
    'Средне',
    'Нормально',
    'Хорошо',
    'Отлично',
    'Шедевр',
  ],
  colors: {
    1: '#f56c6c',
    2: '#f1755f',
    3: '#ed8153',
    4: '#e99047',
    5: '#e6a23c',
    6: '#dec03b',
    7: '#d2d73b',
    8: '#add03b',
    9: '#89c93a',
    10: '#67c23a',
  },
}

export const types = [
  {
    value: 'movie',
    path: '/movies',
    title: 'Фильм',
  },
  {
    value: 'series',
    path: '/series',
    title: 'Сериал',
  },
  {
    value: 'game',
    path: '/games',
    title: 'Игра',
  },
  {
    value: 'book',
    path: '/books',
    title: 'Книга',
  },
]

export const restrictions = ['G', 'PG', 'PG-13', 'R', 'NC-17']

export const rules = {
  name: [
    {
      required: true,
      message: 'Пожалуйста, введите название',
      trigger: 'blur',
    },
  ],
  status: [
    {
      required: true,
      message: 'Пожалуйста, выберите статус',
      trigger: 'change',
    },
  ],
  type: [
    { required: true, message: 'Пожалуйста, выберите тип', trigger: 'change' },
  ],
}
