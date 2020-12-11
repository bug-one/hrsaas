import { setToken, getToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    },
    getUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    login(context, params) {
      return login(params).then(token => {
        context.commit('setToken', token)
      })
    },
    getUserInfo(context) {
      return getUserInfo().then(res => {
        context.commit('getUserInfo', res)
      })
    }
  }

}
