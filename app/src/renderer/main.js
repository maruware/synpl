import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'font-awesome/css/font-awesome.css'

import { ResizeObserver } from 'vue-resize'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(ElementUI)
Vue.component('resize-observer', ResizeObserver)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
