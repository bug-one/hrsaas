import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const timeKey = 'hrsaas_timestamp_key'
const LanguageKey = 'lang'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}

export function removeTimeStamp() {
  return Cookies.remove(timeKey)
}

export function setLanguage(lang) {
  return Cookies.set(LanguageKey, lang)
}

export function getLanguage() {
  return Cookies.get(LanguageKey)
}
