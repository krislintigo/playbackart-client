import { EMPTY_FILE_DATA } from '~/lib/data/default'

export const clearItemBeforeSave = (item: Item) => {
  item.name = item.name.trim()
  item.franchise = item.franchise.trim()

  if (item.config.seasons.extended) {
    item.seasons.forEach((season) => {
      season.name = season.name.trim()
    })
    item.time = {
      count: 1,
      duration: 0,
      replays: 0,
    }
    item.year = ''
    if (item.config.seasons.multiplePosters) {
      item.poster = _cloneDeep(EMPTY_FILE_DATA)
    } else {
      item.seasons.forEach(
        (season) => (season.poster = _cloneDeep(EMPTY_FILE_DATA))
      )
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
