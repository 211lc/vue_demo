<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}, // 商品详细信息
    }
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      // 获取商品详情
      this.$axios.get('api/goods/getdesc/' + this.$route.params.id).then(response => {
        this.info = response.data.message[0];
      })
    }
  }
}
</script>

<style lang="scss">
.goodsdesc-container {
  h3 {
    text-align: center;
    font-size: 18px;
    color: #34a7b2;
    margin: 14px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
