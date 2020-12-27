import Vue from 'vue'
import VueI18n from 'vue-i18n'
//
Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
  en: {
    hello: 'hello world'
  },
  ja: {
    hello: 'こんにちは、世界'
  }
}

// 通过选项创建 VueI18n 实例
export default new VueI18n({
  locale: 'ja', // 设置地区
  messages // 设置地区信息
})
