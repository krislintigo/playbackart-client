export const clearItemBeforeSave = (item: Item) => {
  item.name = item.name.trim()
  // item.poster = item.poster.trim()
  item.franchise = item.franchise.trim()

  if (item.config.seasons.extended) {
    item.seasons.forEach((season) => {
      season.name = season.name.trim()
      season.poster = season.poster.trim()
    })
    item.time = {
      count: 1,
      duration: 0,
      replays: 0,
    }
    item.year = ''
    if (item.config.seasons.multiplePosters) {
      item.poster = ''
    } else {
      item.seasons.forEach((season) => (season.poster = ''))
    }
    if (item.config.seasons.multipleRatings) {
      item.rating = 0
    } else {
      item.seasons.forEach((season) => (season.rating = 0))
    }
    if (item.config.seasons.multipleDevelopers) {
      item.developers = []
    } else {
      item.seasons.forEach((season) => (season.developers = []))
    }
  } else {
    item.config.seasons.multiplePosters = false
    item.config.seasons.multipleRatings = false
    item.config.seasons.multipleDevelopers = false
    item.seasons = []
  }
}
