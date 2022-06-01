import { CloseBold, Plus, Select, VideoPause, VideoPlay } from '@element-plus/icons-vue'

export default [
  {
    title: 'Смотрю',
    icon: VideoPlay,
    value: 'looking',
    color: '#79bbff'
  },
  {
    title: 'Запланировано',
    icon: Plus,
    value: 'planned',
    color: '#f7b954'
  },
  {
    title: 'Просмотрено',
    icon: Select,
    value: 'viewed',
    color: '#95d475'
  },
  {
    title: 'Отложено',
    icon: VideoPause,
    value: 'postponed',
    color: '#b1b3b8'
  },
  {
    title: 'Брошено',
    icon: CloseBold,
    value: 'abandoned',
    color: '#f56c6c'
  }
]
