import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { asyncRoutes } from '@/router'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  Nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
        router.addRoutes(asyncRoutes)
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  Nprogress.done()
})

router.afterEach(() => {
  Nprogress.done()
})
