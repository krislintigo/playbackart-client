export const EMPTY_FILE_DATA = {
  name: '',
  key: '',
  uploadedAt: '',
  buffer: '',
  preview: '',
}

export const EMPTY_PART_DATA = {
  name: '',
  poster: _cloneDeep(EMPTY_FILE_DATA),
  rating: 0,
  time: {
    count: 1,
    duration: 0,
    replays: 0,
    sessions: [],
  },
  year: '',
  developers: [],
  status: '',
}

export const EMPTY_SESSION_DATA = {
  name: '',
  duration: 0,
}
