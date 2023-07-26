export const averageSeasonDuration = (item: Item) =>
  Math.round(
    item.seasons.reduce((acc, cur) => acc + cur.time.duration, 0) /
      item.seasons.length
  )

export const averageSeasonReplays = (item: Item) =>
  Math.round(
    item.seasons.reduce((acc, cur) => acc + cur.time.replays, 0) /
      item.seasons.length
  )

// export const uniqueSeasonDevelopers = (item: Item) =>
//   Array.from(new Set(...item.seasons.map((season) => season.developers)))

export const uniqueSeasonDevelopers = (item: Item) =>
  Array.from(
    new Set(
      item.seasons.reduce(
        (acc, cur) => [...acc, ...cur.developers],
        [] as string[]
      )
    )
  )
