export const imageerror = {
  inserted(dom, options) {
    // dom.src = options.value
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
