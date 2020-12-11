const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  company: state => state.user.userInfo.company,
  username: state => state.user.userInfo.username
}
export default getters
