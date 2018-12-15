// 这里的Vue必须大写
import Vue from 'vue'
import App from './App.vue'
// 导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 按需导入mint-ui
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})