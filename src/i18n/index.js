import Vue from 'vue'
import VueI18n from 'vue-i18n'
//
Vue.use(VueI18n)

import eleLangEn from 'element-ui/lib/locale/lang/en' // lang i18n
import eleLangCn from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// 准备翻译的语言环境信息
const messages = {
  en: {
    hello: 'hello',
    Dashboard: 'Dashboard',
    departments: 'departments',
    settings: 'settings',
    approvals: 'approvals',
    employees: 'employees',
    permission: 'permission',
    attendances: 'attendances',
    salarys: 'salarys',
    social_securitys: 'social_securitys',
    Languages: 'Languages',
    ...eleLangEn
  },
  cn: {
    hello: '你好',
    Dashboard: '首页',
    departments: '组织架构',
    settings: '公司设置',
    approvals: '审批',
    employees: '员工',
    permission: '权限控制',
    attendances: '考勤',
    salarys: '工资',
    social_securitys: '社保',
    Languages: '语言',
    ...eleLangCn
  }
}

// 通过选项创建 VueI18n 实例
export default new VueI18n({
  locale: 'cn', // 设置地区
  messages // 设置地区信息
})
