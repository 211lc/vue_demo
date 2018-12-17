<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ newsinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击次数:{{ newsinfo.click }}次</span>
    </p>
    <div v-html="newsinfo.content" class="content">

    </div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Comment from '../subcomponents/Comment'

export default {
  data() {
    return {
      id: this.$route.params.id, // 获取url地址中传递的id值
      newsinfo: '',
    }
  },
  components: {
    Comment
  },
  created() {
    this.getNewsinfo();
  },
  methods: {
    getNewsinfo() { // 获取数据
      this.$axios.get('api/getnew/' + this.id).then(response => {
        // console.log(response.data.message)
        this.newsinfo = response.data.message[0]
      }).catch(error => {
        Toast("获取数据失败，请稍后再试");
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container	{
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: #dd524d;
  }
  .subtitle {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    color: #007aff;
    justify-content: space-between;
  }
  .content {
    color: #222;
    font-size: 14px;
  }
}
</style>
