import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
import enterClass from '@/components/enterClass'

Vue.use(Router)
//app.js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/enterClass',
      name: 'enterClass',
      component: enterClass
    }
  ]
})
