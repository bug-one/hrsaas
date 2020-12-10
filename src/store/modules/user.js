import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'

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
  },
  actions: {
    login(context, params) {
      return login(params).then(token => {
        context.commit('setToken', token)
      })
    }
  }

}
