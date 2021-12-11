import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/assets/css/styles.css';

Vue.config.productionTip = false
Vue.use(Vuex)
new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
