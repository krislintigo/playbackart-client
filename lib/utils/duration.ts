export const formatDuration = (min: number) => {
  const days = min > 14400 ? Math.floor(min / 1440) : 0
  const hours =
    min > 14400 ? Math.floor((min % 1440) / 60) : Math.floor(min / 60)
  const minutes = min % 60
  return (
    (days > 0 ? days + 'д ' : '') +
    (hours > 0 ? hours + 'ч ' : '') +
    (minutes > 0 ? minutes + 'мин ' : '')
  )
}

export const computeDuration = (item: Item, full: boolean) => {
  const part = (i: Item['time']) =>
    (full ? i.replays + 1 : 1) * i.count * i.duration
  return (
    part(item.time) + item.seasons.reduce((acc, cur) => acc + part(cur.time), 0)
  )
}
