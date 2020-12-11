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
    async login(context, params) {
      const token = await login(params)
      context.commit('setToken', token)
    },
    async getUserInfo(context) {
      const res = await getUserInfo()
      context.commit('getUserInfo', res)
    }
  }

}
