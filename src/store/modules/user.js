import { setToken, getToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    }
  }

}
