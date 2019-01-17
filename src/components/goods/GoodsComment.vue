<template>
  <div>
    <h3>商品评论页面</h3>
    <Comment :id="this.$route.params.id"></Comment>
  </div>
</template>

<script>
import Comment from '../subcomponents/Comment'

export default {
  data() {
    return {

    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>

</style>
