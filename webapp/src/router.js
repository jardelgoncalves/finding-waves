import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated } from './utils/auth'

import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Dashboard from './pages/Dashboard.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard,
      meta: {
        routerPrivate: true
      },
    },
    {
      path: '/register', component: Register
    },
    {
      path: '/login', component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.routerPrivate)) {
    if (isAuthenticated()) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})


export default router;
