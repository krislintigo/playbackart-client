export const averagePartsRating = (item: Item) => {
  const filtered = item.parts.filter((part) => part.rating)
  if (!filtered.length) return 0
  return round(
    filtered.reduce((acc, cur) => acc + cur.rating, 0) / filtered.length,
  )
}

export const totalPartsCount = (item: Item) =>
  item.parts
    .filter((p) => p.time.duration)
    .reduce((acc, cur) => acc + cur.time.count, 0)

export const averagePartsDuration = (item: Item) =>
  round(computeDuration(item, null, false) / totalPartsCount(item))

export const averagePartsReplays = (item: Item) =>
  round(
    item.parts.reduce((acc, cur) => acc + cur.time.replays, 0) /
      item.parts.length,
  )

export const uniquePartsDevelopers = (item: Item) => [
  ...new Set(
    item.parts.reduce<string[]>((acc, cur) => [...acc, ...cur.developers], []),
  ),
]
