export const averageSeasonsRating = (item: Item) => {
  const filtered = item.seasons.filter((season) => season.rating)
  if (!filtered.length) return 0
  return Math.round(
    filtered.reduce((acc, cur) => acc + cur.rating, 0) / filtered.length
  )
}

export const totalSeasonsCount = (item: Item) => {
  return item.seasons.reduce(
    (acc, cur) => acc + (cur.time.duration ? cur.time.count : 0),
    0
  )
}

export const averageSeasonsDuration = (item: Item) => {
  return Math.round(computeDuration(item, false) / totalSeasonsCount(item))
}

export const averageSeasonsReplays = (item: Item) =>
  Math.round(
    item.seasons.reduce((acc, cur) => acc + cur.time.replays, 0) /
      item.seasons.length
  )

export const uniqueSeasonsDevelopers = (item: Item) =>
  Array.from(
    new Set(
      item.seasons.reduce(
        (acc, cur) => [...acc, ...cur.developers],
        [] as string[]
      )
    )
  )
