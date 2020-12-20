import Vue from 'vue'
import Axios from 'axios'
import Vuex from 'vuex'
import * as VueGoogleMaps from "vue2-google-maps"
import App from './App.vue'
import router from './router'
import store from './store'
import { TOKEN } from'./utils/constants'

Vue.use(Vuex)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_APIKEY,
  }
});

Vue.config.productionTip = false
Vue.prototype.$http = Axios

const token = localStorage.getItem(TOKEN)
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
