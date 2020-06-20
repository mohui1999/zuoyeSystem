// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import Element from 'element-ui'
Vue.use(Element)

import axios from 'axios'
Vue.prototype.axios = axios //修改原始数据
// axios.defaults.baseURL = 'https://andatong.top'

axios.defaults.withCredentials=false

// 设置axios请求的token
axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
//设置请求头
axios.defaults.headers.post["Content-type"] = "application/json"

//user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36 SE 2.X MetaSr 1.0
import './style/main.css'
import './style/login.css'
import './style/index.css'
import './style/homework.css'
import './style/plus/bootstrap-3.3.7/dist/css/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css'
// import 'http://at.alicdn.com/t/font_1396919_9f9t4yg35f.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 设置cookie
Vue.prototype.setCookie = function (name, value,day) {
  /*
  * 使用
  * this.setCookie("XXXX",res.token);
  */
  var Days = day || 365;    //这里设置天数
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  // document.cookie = name + "="+ escape (value) + ";domain=(这里可以放入指定使用的域名);expires=" + exp.toGMTString();
}


// 获取cookie
Vue.prototype.getCookie = function (name) {
  /*
  * 使用
  * console.log(this.getCookie("XXX"))
  */
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}


// 删除cookie
Vue.prototype.delCookie = function (name) {
  /*
  * 使用
  * this.delCookie("XXX")
  */
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = this.getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
