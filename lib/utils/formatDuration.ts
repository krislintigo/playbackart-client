export default function formatDuration(min: number): string {
  const days = min > 10080 ? Math.floor(min / 1440) : 0
  const hours =
    min > 10080 ? Math.floor((min % 1440) / 60) : Math.floor(min / 60)
  const minutes = min % 60
  return (
    (days > 0 ? days + 'д ' : '') +
    (hours > 0 ? hours + 'ч ' : '') +
    (minutes > 0 ? minutes + 'мин ' : '')
  )
}
