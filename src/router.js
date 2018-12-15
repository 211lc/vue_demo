import VueRouter from 'vue-router'
// 导入路由组件
import HomeContainer from './components/tabbar/HomeContainer'
import MemberContainer from './components/tabbar/MemberContainer'
import SearchContainer from './components/tabbar/SearchContainer'
import ShopcarContainer from './components/tabbar/ShopcarContainer'

const router = new VueRouter({
  routes: [  // 设置路由规则
    {path: '/', redirect: '/home'}, // 重定向，默认打开home首页
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/search', component: SearchContainer},
    {path: '/shopcar', component: ShopcarContainer}
  ],
  linkActiveClass: 'mui-active' // 修改默认的active样式
})

export default router