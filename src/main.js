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
import { Button, Swipe, SwipeItem, Lazyload, Loading } from 'vant'; // 按钮
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload)
Vue.use(Loading);
// import { ImagePreview } from 'vant'; // 图片预览
// Vue.use(ImagePreview)
Vue.use(Button)

// 将axios 绑定为vue的属性
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
Vue.prototype.$axios = axios
// 使用 moment 定义全局时间过滤器 => 格式化事件
import moment from 'moment'
Vue.filter('dateFormat', function (date, parameter = "YYYY-MM-DD HH:mm:ss") {
  return moment(date).format(parameter)
})

// Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 调用本地存储,如果car为空，返回空数组
const car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
  state: {
    car: car, // 购物车商品信息 {id: 商品id, count: 购买数量, price: 商品价格, selected: 商品是否被选中结算}
  },
  mutations: {
    addToCar(state, goodsinfo) {
      // 将商品购买信息添加进state.car
      var flag = false;
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })
      if (!flag) {
        state.car.push(goodsinfo);
      }
      // 将购物数据放入本地存储
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo) {
      // 更新商品信息
      state.car.some(item => {
        if (parseInt(item.id) === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true; // return true用来退出some函数
        }
      })
      // 更新本地存储
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFormcar(state, id) {
      // 删除购物车页面商品列表
      state.car.some((item, index) => {
        if (parseInt(item.id) === id) {
          state.car.splice(index, 1);
          return true;
        }
      })
      // 更新本地存储
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info) {
      // 更新car中selected值
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
          return true;
        }
      })
      // 更新本地存储
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    getAllCount(state) {
      // 购物小车计算购买商品总数
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return parseInt(c);
    },
    getGoodslist(state) {
      // 将car的id和count拼接成对象 {88: 3, 89: 2, 90: 5}
      var obj = {};
      state.car.forEach(item => {
        obj[item.id] = item.count;
      })
      return obj;
    },
    getGoodsSelected(state) {
      // 购物车页面商品滑动按钮
      var obj = {};
      state.car.forEach(item => {
        // { [87: true], [88: false]  }
        obj[item.id] = item.selected;
      })
      return obj;
    },
    getGoodsCountAndAmount(state) {
      // 计算商品总件数和总价格
      var obj = {
        count: 0, // 商品总件数
        amount: 0, // 商品总价格
      }
      state.car.forEach(item => {
        if(item.selected) {
          obj.count += item.count
          obj.amount += item.count * item.price
        }
      })
      return obj
    }
  },
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})