import store from '@/store'
export const checkPermissionMixin = {
  methods: {
    checkPermission(point) {
      return store.state.user.userInfo.roles.points.indexOf(point) === -1
    }
  }
}
