import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"
import Axios from 'axios'
import router from './router'
import { TOKEN } from'./utils/constants'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_APIKEY,
  }
});

Vue.config.productionTip = false
Vue.prototype.$http = Axios

const token = localStorage.getItem(TOKEN)
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
