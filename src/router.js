import VueRouter from 'vue-router'
// 导入路由组件
import HomeContainer from './components/tabbar/HomeContainer'
import MemberContainer from './components/tabbar/MemberContainer'
import SearchContainer from './components/tabbar/SearchContainer'
import ShopcarContainer from './components/tabbar/ShopcarContainer'
import NewsList from './components/news/NewsList'
import Newsinfo from './components/news/Newsinfo'
import PhotoList from './components/photos/PhotoList'
import Photoinfo from './components/photos/Photoinfo'
import Goodslist from './components/goods/Goodslist'
import GoodsInfo from './components/goods/GoodsInfo'

const router = new VueRouter({
  routes: [  // 设置路由规则
    { path: '/', redirect: '/home' }, // 重定向，默认打开home首页
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: Newsinfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: Photoinfo },
    { path: '/home/goodslist', component: Goodslist },
    { path: '/home/goodsinfo/:id', component: GoodsInfo }
  ],
  linkActiveClass: 'mui-active', // 修改默认的active样式
  scrollBehavior(to, from, savedPosition) { // vue-router打开新页面强制到顶部
    return { x: 0, y: 0 }
  }
})

export default router