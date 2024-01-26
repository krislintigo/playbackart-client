export const clearItemBeforeSave = (item: Item) => {
  item.name = item.name.trim()
  item.franchise = item.franchise.trim()

  if (item.config.parts.extended) {
    item.parts.forEach((part) => {
      part.name = part.name.trim()

      part.time = item.config.time.extended
        ? {
            count: 1,
            duration: 0,
            replays: 0,
            sessions: part.time.sessions.map((session) => ({
              ...session,
              name: session.name.trim(),
            })),
          }
        : {
            ...part.time,
            sessions: [],
          }
    })

    item.time = {
      count: 1,
      duration: 0,
      replays: 0,
      sessions: [],
    }
    item.year = ''

    if (item.config.parts.multiplePosters) {
      item.poster = _cloneDeep(EMPTY_FILE_DATA)
    } else {
      item.parts.forEach((part) => (part.poster = _cloneDeep(EMPTY_FILE_DATA)))
    }

    if (item.config.parts.multipleRatings) {
      item.rating = 0
    } else {
      item.parts.forEach((part) => (part.rating = 0))
    }

    if (item.config.parts.multipleDevelopers) {
      item.developers = []
    } else {
      item.parts.forEach((part) => (part.developers = []))
    }
  } else {
    item.config.parts.multiplePosters = false
    item.config.parts.multipleRatings = false
    item.config.parts.multipleDevelopers = false
    item.parts = []

    item.time = item.config.time.extended
      ? {
          count: 1,
          duration: 0,
          replays: 0,
          sessions: item.time.sessions.map((session) => ({
            ...session,
            name: session.name.trim(),
          })),
        }
      : {
          ...item.time,
          sessions: [],
        }
  }
}
