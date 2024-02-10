export const GENRES = [
  {
    label: 'Тематика и сюжет',
    options: [
      {
        label: 'Комедия',
        value: 'comedy',
        description: 'Вызов смеха и развлечение аудитории',
      },
      {
        label: 'Романтика',
        value: 'romance',
        description: 'Любовные отношения в центре сюжета',
      },
      {
        label: 'Драма',
        value: 'drama',
        description: 'Эмоциональные отношения между персонажами',
      },
      {
        label: 'Криминал',
        value: 'crime',
        description: 'Преступления и их расследование',
      },
      {
        label: 'Сатира',
        value: 'satire',
        description: 'Ироничное изображение недостатков и пороков общества',
      },
      {
        label: 'Спорт',
        value: 'sports',
        description: 'Соревнования, тренировки и спортсмены',
      },
      {
        label: 'Биография',
        value: 'biography',
        description: 'Жизнь и деятельность реальных людей',
      },
      {
        label: 'Документальный',
        value: 'documentary',
        description: 'Реальные события и их описание',
      },
    ],
  },
  {
    label: 'Окружение и сеттинг',
    options: [
      {
        label: 'Фэнтези',
        value: 'fantasy',
        description: 'Магия и фантастика в вымышленных мирах',
      },
      {
        label: 'Научная фантастика',
        value: 'sci-fi',
        description: 'Технологический прогресс и его влияние на общество',
      },
      {
        label: 'Мюзикл',
        value: 'musical',
        description: 'Музыкальные номера и песни для движения сюжета',
      },
      {
        label: 'Исторический',
        value: 'historical',
        description: 'События прошлого и их влияние на современность',
      },
      {
        label: 'Выживание',
        value: 'survival',
        description: 'Борьба за выживание в экстремальных условиях',
      },
      {
        label: 'Ужасы',
        value: 'horror',
        description: 'Страх и ужас, вызванные сверхъестественным',
      },
      {
        label: 'Триллер',
        value: 'thriller',
        description: 'Напряженный сюжет и неожиданные повороты событий',
      },
      {
        label: 'Мультфильм',
        value: 'animation',
        description: 'Произведения с применением анимации',
      },
      {
        label: 'Многопользовательская',
        value: 'mmo',
        description: 'Множество игроков в одном мире и их взаимодейтвие',
      },
    ],
  },
  {
    label: 'Действие и продвижение',
    options: [
      {
        label: 'Приключения',
        value: 'adventure',
        description: 'Путешествия и исследования локаций',
      },
      {
        label: 'Платформер',
        value: 'platform',
        description: 'Перемещение по платформам и преодоление препятствий',
      },
      {
        label: 'Файтинг',
        value: 'fighting',
        description: 'Ближний бой с различными приемами',
      },
      {
        label: 'Экшен',
        value: 'action',
        description: 'Высокий уровень динамики, также погони, бои и взрывы',
      },
      {
        label: 'Шутер',
        value: 'shooter',
        description: 'Стрельба и боевые действия',
      },
      {
        label: 'Головоломка',
        value: 'puzzle',
        description: 'Решение логических задач и головоломок',
      },
      {
        label: 'Симулятор',
        value: 'simulation',
        description: 'Имитация реальных процессов и деятельности',
      },
      {
        label: 'Стратегия',
        value: 'strategy',
        description: 'Стратегическое планирование для достижения целей',
      },
      {
        label: 'RPG',
        value: 'rpg',
        description: 'Развитие персонажа и следование за сюжетом',
      },
      {
        label: 'Песочница',
        value: 'sandbox',
        description: 'Свободное исследование без четких целей',
      },
    ],
  },
]

export const PLAIN_GENRES = GENRES.flatMap((group) =>
  group.options.map((option) => ({
    label: option.label,
    value: option.value,
  })),
)
