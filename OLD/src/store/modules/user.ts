export const userNames = {
  setUser: 'user/setUser',
  setWatching: 'user/setWatching',
  resetUser: 'user/resetUser'
}

const initialState = {
  _id: '',
  login: '',
  watching: ''
}

export default {
  store: initialState,
  mutations: {
    [userNames.setUser] (state: any, user: object) {
      Object.assign(state, user)
    },
    [userNames.setWatching] (state: any, watching: string) {
      state.watching = watching
    },
    [userNames.resetUser] (state: any) {
      Object.assign(state, initialState)
    }
  }
}
