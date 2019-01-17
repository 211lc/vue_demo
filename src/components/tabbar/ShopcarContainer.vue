<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item, index) in goodslist" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              @change="selectChange(item.id, $store.getters.getGoodsSelected[item.id])"
              v-model="$store.getters.getGoodsSelected[item.id]"
            ></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodslist[item.id]"></numbox>
                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价
              <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/ShopcarNumbox";

export default {
  data() {
    return {
      goodslist: [] // 存放商品信息
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    getGoodslist() {
      // 获取商品信息
      var idArr = [];
      this.$store.state.car.forEach(item => {
        // 获取商品id
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      this.$axios
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(response => {
          this.goodslist = response.data.message;
        });
    },
    remove(id, index) {
      // 删除购物车页面商品列表
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormcar", id);
    },
    selectChange(id, value) {
      // 监听switch按钮
      this.$store.commit("updateGoodsSelected", { id, selected: value });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-content: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 14px;
    }
    .price {
      font-weight: bold;
      color: #ff0000;
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      font-weight: bold;
      color: #ff0000;
      font-size: 16px;
    }
  }
}
</style>
