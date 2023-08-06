export const averagePartsRating = (item: Item) => {
  const filtered = item.parts.filter((part) => part.rating)
  if (!filtered.length) return 0
  return round(
    filtered.reduce((acc, cur) => acc + cur.rating, 0) / filtered.length
  )
}

export const totalPartsCount = (item: Item) =>
  item.parts.reduce(
    (acc, cur) => acc + (cur.time.duration ? cur.time.count : 0),
    0
  )

export const averagePartsDuration = (item: Item) =>
  round(computeDuration(item, false) / totalPartsCount(item))

export const averagePartsReplays = (item: Item) =>
  round(
    item.parts.reduce((acc, cur) => acc + cur.time.replays, 0) /
      item.parts.length
  )

export const uniquePartsDevelopers = (item: Item) =>
  Array.from(
    new Set(
      item.parts.reduce(
        (acc, cur) => [...acc, ...cur.developers],
        [] as string[]
      )
    )
  )
