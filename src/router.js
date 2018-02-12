/**
 * Usage
 * 
 * new Route([
 *   {
 *     path: '/module1',
 *     component: component1
 *   }, {
 *     path: '/module2/:name',
 *     component: component2
 *   }, {
 *     path: '/module3(/:name)(/:age)',
 *     component: component3,
 *     render: function
 *   }
 * ], render)
 *
 * 可定义一个通用的 render {Function(component, args)}, 如上例, 也可为单个路由定义 render(优先级高)
 */
export class Router {
  constructor (routerTable, render) {
    if (!Array.isArray(routerTable)) {
      throw new Error('routerTable must be an Array.')
    } else if (typeof render !== 'function') {
      throw new Error('render must be a function.')
    }
    let defaultRouterIndex = routerTable.findIndex(item => item.path === '*')
    if (defaultRouterIndex !== -1) {
      this.defaultRouter = routerTable[defaultRouterIndex]
      routerTable.splice(defaultRouterIndex, 1)
    }
    this.routes = routerTable
    this.render = render
    this.init()
  }

  /**
   * Init
   */
  init () {
    if ('onhashchange' in window) {
      window.onhashchange = this.onChange.bind(this)
      this.onChange()
    } else {
      throw new Error('sorry, your browser doesn\'t support router.')
    }
  }

  /**
   * From backbone
   * @param {String} path
   * @return {RegExp}
   */
  getRegExp (path) {
    const optionalParam = /\((.*?)\)/g
    const namedParam = /(\(\?)?:\w+/g
    const splatParam = /\*\w+/g
    const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g
    path = path.replace(escapeRegExp, '\\$&')
      .replace(optionalParam, '(?:$1)?')
      .replace(namedParam, function (match, optional) {
        return optional ? match : '([^/?]+)'
      })
      .replace(splatParam, '([^?]*?)')
    return new RegExp('^' + path + '(?:\\?([\\s\\S]*))?$')
  }

  /**
   * 监听hash值改变
   * @param  {Object} e 事件对象(onhashchange)
   */
  onChange (e) {
    const url = window.location.hash.replace(/.*#/, '') // 获取当前hash值并去除#号
    const found = url ? this.routes.some(item => {
      let reg = this.getRegExp(item.path)
      let result = reg.exec(url)
      if (result && result[0] && result[0] != '') {
        this.routerItemCallback(item, result.slice(1, -1))
        return true
      }
    }) : false

    if (!found && this.defaultRouter) {
      this.routerItemCallback(this.defaultRouter)
    }
  }

  /**
   * hash变化后对当前应激活的路由进行处理
   * @param  {Object} routerItem 路由项
   * @param  {Array}  args 可选的路径参数
   */
  routerItemCallback (routerItem, args = []) {
    const handler = routerItem.render || this.render
    if (typeof handler !== 'function') throw new Error('render must be a function.')
    handler(routerItem.component, args)
  }
}
