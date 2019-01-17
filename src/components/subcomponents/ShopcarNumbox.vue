<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  mounted() {
    // 初始化数字选择框
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      // 调用store方法更新商品信息
      this.$store.commit('updateGoodsInfo', {
        id: this.goodsid, 
        count: this.$refs.numbox.value
      })
    }
  },
  props: ["initcount", "goodsid"]
}
</script>

<style lang="scss" scoped>
.mui-numbox {
  height: 25px;
}
</style>


