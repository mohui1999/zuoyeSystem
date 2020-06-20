import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
import enterClass from '@/components/enterClass'
import hmTea from '@/components/hmTea'
import hmStu from '@/components/hmStu'
import assignHm from '@/components/assignHm'
import datePicker from "../../static/datePicker"


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
    },
    {
      path: '/hmStu',
      name: 'hmStu',
      component: hmStu
    },
    {
      path: '/hmTea',
      name: 'hmTea',
      component: hmTea
    },
    {
      path: '/assignHm',
      name: 'assignHm',
      component: assignHm
    }


    //
  ]
})
