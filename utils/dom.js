/**
 * 事件监听
 * @param  {dom} element 需要绑定的dom元素
 * @param  {string} event 绑定的事件
 * @param  {function} handler 绑定的函数
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      element && event && handler && element.addEventListener(event, handler, false)
    }
  } else {
    return function(element, event, handler) {
      element && event && handler && element.attachEvent('on' + event, handler) // IE 6-10
    }
  }
})()

/**
 * 解除事件监听
 * @param  {dom} element 需要绑定的dom元素
 * @param  {string} event 解除的事件
 * @param  {function} handler 回调
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      element && event && element.removeEventListener(event, handler, false)
    }
  } else {
    return function(element, event, handler) {
      element && event && element.detachEvent('on' + event, handler) // IE 6-10
    }
  }
})()