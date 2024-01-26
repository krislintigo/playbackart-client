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

export const orderedMainStatuses: Item['status'][] = [
  'postponed',
  'planned',
  'in-process',
  'completed',
]
