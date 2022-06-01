export const userNames = {
  setUser: 'user/setUser',
  resetUser: 'user/resetUser'
}

const initialState = {
  _id: '',
  login: ''
}

export default {
  store: initialState,
  mutations: {
    [userNames.setUser] (state, user) {
      Object.assign(state, user)
    },
    [userNames.resetUser] (state) {
      Object.assign(state, initialState)
    }
  }
}
