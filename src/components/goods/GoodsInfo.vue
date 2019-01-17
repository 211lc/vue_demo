<template>
  <div class="goodsinfo-container">
    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <van-swipe :autoplay="3000" indicator-color="green">
            <van-swipe-item v-for="(item, index) in photos" :key="index">
              <img v-lazy="item.src">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <span class="old_price">￥{{ goodsinfo.market_price }}</span>
            <span class="now_price">销售价：￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：
            <numbox :max="goodsinfo.stock_quantity" @getCount = "getSelectedCount"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button size="large" type="primary" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button size="large" type="danger" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入数字选择框组件
import numbox from "../subcomponents/GoodsNumbox";

export default {
  data() {
    return {
      id: this.$route.params.id, // 获取路由id
      photos: [], // 接收图片数组
      goodsinfo: {}, // 接收商品信息
      ballFlag: false, // 小球显示隐藏
      selectedCount: 1, // 保存商品数量
    };
  },
  created() {
    this.getSwipe();
    this.getGoodsInfo();
  },
  methods: {
    addToShopCar() {
      // 显示隐藏小球
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {id: this.id, count: this.selectedCount, price: this.goodsinfo.sell_price, selected: true};
      // 将商品信息加入到Vuex.store.state.car
      this.$store.commit('addToCar', goodsinfo);
    },
    getSwipe() {
      // 获取轮播图图片
      this.$axios.get("api/getthumimages/" + this.id).then(response => {
        this.photos = response.data.message;
      });
    },
    getGoodsInfo() {
      // 获取商品信息
      this.$axios.get("api/goods/getinfo/" + this.id).then(response => {
        this.goodsinfo = response.data.message[0];
      });
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到商品详情页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击使用编程式导航跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    // 下面三个是小球动画的方法
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document.getElementById('badge').getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all .7s cubic-bezier(.4, -0.3, 1, .68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #cb3737;
    position: absolute;
    z-index: 99;
    top: 496px;
    left: 148px;
  }
  background-color: #eee;
  overflow: hidden;
  .old_price {
    text-decoration: line-through;
    margin-right: 8px;
  }
  .now_price {
    color: #cb3737;
    font-size: 16px;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 16px 0;
    }
  }
}
</style>
