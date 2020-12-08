/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validMobile(data) {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(data)
}
