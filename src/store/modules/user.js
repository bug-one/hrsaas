import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserInfoById } from '@/api/user'
import { resetRouter } from '@/router'

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
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    }
  },
  actions: {
    async login(context, params) {
      const token = await login(params)
      context.commit('setToken', token)
      setTimeStamp()
    },
    async getUserInfo(context) {
      const userInfo = await getUserInfo()
      const userDetail = await getUserInfoById(userInfo.userId)
      context.commit('getUserInfo', { ...userInfo, ...userDetail })
      return { ...userInfo, ...userDetail }
    },
    logout({ commit }) {
      commit('removeUserInfo')
      commit('removeToken')
      resetRouter()
    }

  }

}
