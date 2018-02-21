import { Router } from 'src/router'
import waterfall from './components/waterfall'

function render (component, args) {
  if (!component) return
  document.getElementById('coding-container').innerHTML = component.template || ''
  typeof component.created === 'function' && component.created()
}

new Router([
  {
    path: '/waterfall',
    component: waterfall
  }, {
    path: '/module1',
    component: {
      template: 'test'
    }
  }, {
    path: '/module2/:name'
  }, {
    path: '*',
    component: {}
  }
], render)
