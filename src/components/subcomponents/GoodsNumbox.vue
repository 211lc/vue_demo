<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
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
      // 监听数字改变方法
      this.$emit('getCount', parseInt(this.$refs.numbox.value));
    }
  },
  props: ['max'],
  watch: {
    max: function(newVal, oldVal) {
      // 使用js设置购买最大值
       mui(".mui-numbox").numbox().setOption("max", newVal);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


