// 这里的Vue必须大写
import Vue from 'vue'
import App from './App.vue'
// 导入mui样式
import './lib/mui/css/mui.min.css'
// 按需导入mint-ui
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

new Vue({
  el: '#app',
  render: h => h(App)
})