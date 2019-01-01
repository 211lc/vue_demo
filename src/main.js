// 这里的Vue必须大写
import Vue from 'vue'
import App from './App.vue'
// 导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入mint-ui
  // import { Header, Swipe, SwipeItem, Button,  Lazyload } from 'mint-ui'
  // Vue.component(Header.name, Header)
  // Vue.component(Swipe.name, Swipe)
  // Vue.component(SwipeItem.name, SwipeItem)
  // Vue.component(Button.name, Button)
  // Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'
// 导入axios
import axios from 'axios'

// 导入vant 组件
import { Button } from 'vant'; // 按钮
// import { ImagePreview } from 'vant'; // 图片预览
// Vue.use(ImagePreview)
Vue.use(Button)

// 将axios 绑定为vue的属性
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
Vue.prototype.$axios = axios
// 使用 moment 定义全局时间过滤器 => 格式化事件
import moment from 'moment'
Vue.filter('dateFormat', function(date, parameter="YYYY-MM-DD HH:mm:ss") {
  return moment(date).format(parameter)
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})