/**
 * 发布-订阅者事件模式
 */
export class EventEmitter {
  constructor () {
    this._events = {};
  }

  /**
   * 订阅事件
   * @param  {String} event 事件名
   * @param  {Function} handler 事件函数
   */
  on (event, handler) {
    if (!event || typeof event !== 'string') {
      throw new Error('event is unvalidated.');
    } else if (typeof handler !== 'function') {
      throw new Error('handler must be a function.');
    }

    let handlerList = this._events[event] = this._events[event] || [];
    if (handlerList.indexOf(handler) === -1) handlerList.push(handler);
  }

  /**
   * 发布事件
   * @param  {String} event 事件名
   * @param  {...All} args 可选, 事件的额外参数
   */
  emit (event, ...args) {
    if (!this._events[event]) {
      throw new Error('event is undefined.');
    }
    this._events[event].forEach(handler => handler.call(this, ...args));
  }
}
