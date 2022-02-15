
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap-scss'
import VueSessionStorage from 'vue-sessionstorage'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
Vue.use(VueSessionStorage)
Vue.use(Vuex)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
