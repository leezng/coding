export class EventEmitter {
  constructor () {
    this._events = {};
  }

  on (event, handler) {
    if (!event || typeof event !== 'string') {
      throw new Error('event is unvalidated.');
    } else if (typeof handler !== 'function') {
      throw new Error('handler must be a function.');
    }

    let handlerList = this._events[event] = this._events[event] || [];
    if (handlerList.indexOf(handler) !== -1) handlerList.push(handler);
  }

  emit (event, ...args) {
    if (!this._events[event]) {
      throw new Error('event is undefined.');
    }
    this._events[event].forEach(handler => handler.call(this, ...args));
  }
}
