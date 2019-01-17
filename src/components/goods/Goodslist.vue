<template>
  <div class="goods-list">
    <div
      class="goods-item"
      v-for="(item, index) in goodsList"
      :key="index"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1, // 分页的页数
      goodsList: [] // 存放商品列表
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取商品列表数据
      this.$axios
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(response => {
          this.goodsList = this.goodsList.concat(response.data.message);
        });
    },
    getMore() {
      // 加载更多
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      // 跳转到商品详情页面
      this.$router.push("/home/goodsinfo/" + id);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  .goods-item {
    padding: 2px;
    box-shadow: 0 0 8px #ccc;
    border: 1px solid #ccc;
    margin: 4px 0;
    width: 49%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: #f44;
          font-size: 16px;
          font-weight: bold;
        }
        .old {
          font-size: 13px;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
