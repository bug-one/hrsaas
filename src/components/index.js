import pageTools from './PageTools'
import imageUpload from './ImageUpload'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('imageUpload', imageUpload)
  }
}
