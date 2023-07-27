export const averageSeasonRating = (item: Item) => {
  const filtered = item.seasons.filter((season) => season.rating)
  if (!filtered.length) return 0
  return Math.round(
    filtered.reduce((acc, cur) => acc + cur.rating, 0) / filtered.length
  )
}

export const averageSeasonDuration = (item: Item) =>
  Math.round(
    computeDuration(item, false) /
      item.seasons.reduce((acc, cur) => acc + cur.time.count, 0)
  )

export const averageSeasonReplays = (item: Item) =>
  Math.round(
    item.seasons.reduce((acc, cur) => acc + cur.time.replays, 0) /
      item.seasons.length
  )

export const uniqueSeasonDevelopers = (item: Item) =>
  Array.from(
    new Set(
      item.seasons.reduce(
        (acc, cur) => [...acc, ...cur.developers],
        [] as string[]
      )
    )
  )
