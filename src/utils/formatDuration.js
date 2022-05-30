export default function formatDuration (min) {
  const days = Math.floor(min / 1440)
  const hours = Math.floor((min % 1440) / 60)
  const minutes = min % 60
  return (days > 0 ? days + 'д ' : '') +
    (hours > 0 ? hours + 'ч ' : '') +
    (minutes > 0 ? minutes + 'мин ' : '')
}
