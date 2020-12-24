import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    myRoutes: []
  },
  mutations: {
    setMyRoutes(state, data) {
      state.myRoutes = [...constantRoutes, ...data]
    }
  },
  actions: {
    getRoutes(context, roles) {
      const myRoutes = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > -1)
      myRoutes.push({ path: '*', redirect: '/404', hidden: true })
      context.commit('setMyRoutes', myRoutes)
      return myRoutes
    }
  }
}
