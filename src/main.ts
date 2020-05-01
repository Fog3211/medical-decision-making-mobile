import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import { remConfig } from '@utils/index'

Vue.use(Vant)

Vue.config.productionTip = false

remConfig()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
