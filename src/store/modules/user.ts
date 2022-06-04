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
    [userNames.setUser] (state: any, user: object) {
      Object.assign(state, user)
    },
    [userNames.resetUser] (state: any) {
      Object.assign(state, initialState)
    }
  }
}
