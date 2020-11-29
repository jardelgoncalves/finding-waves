import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Dashboard from './pages/Dashboard.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/', component: Dashboard
    },
    {
      path: '/register', component: Register
    },
    {
      path: '/login', component: Login
    }
  ]
})