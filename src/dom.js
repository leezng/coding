/**
 * 事件监听
 * @param  {dom} el 需要绑定的dom元素
 * @param  {string} event 绑定的事件
 * @param  {function} handler 绑定的函数
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(el, event, handler) {
      el && event && handler && el.addEventListener(event, handler, false) // IE 9+
    }
  } else {
    return function(el, event, handler) {
      el && event && handler && el.attachEvent('on' + event, handler) // IE 6-10
    }
  }
})()

/**
 * 解除事件监听
 * @param  {dom} el 需要绑定的dom元素
 * @param  {string} event 解除的事件
 * @param  {function} handler 回调
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(el, event, handler) {
      el && event && el.removeEventListener(event, handler, false) // IE 9+
    }
  } else {
    return function(el, event, handler) {
      el && event && el.detachEvent('on' + event, handler) // IE 6-10
    }
  }
})()

export const hasClass = function (el, className) {
  if (!el || !className) return false
  if (className.indexOf(' ')) return false // 类名本身不可有空格, 防止多类名className存在空格的检验异常

  return el.classList
    ? el.classList.contains(className) // classList接口: IE 10+
    : el.className.indexOf(className) > -1
}

export const addClass = function (el, className) {
  if (!el || !className) return
  let classArr = className.split(' ')
  let elClassStr = el.className
  // forEach: IE 9+
  classArr.forEach(function (item) {
    if (!item) return // unexpectedClassName: 'aa bb   cc'
    if (el.classList) {
      el.add(item)
    } else if (!hasClass(item)) {
      elClassStr += ' ' + item
    }
  })
  el.classList || (el.className = elClassStr)
}
