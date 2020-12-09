import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'

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
      login(params).then(res => {
        const { data, message, success } = res.data
        if (success) {
          context.commit('setToken', data)
          Message.success(message)
        } else {
          Message.error(message)
        }
      })
    }
  }

}
