<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击{{ photoinfo.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <div class="flex-container">
      <div v-for="(small, index) in list" :key="index" @click="showImagePreview(index)">
        <img :src="small" height="100px">
      </div>
    </div>
    <!-- 图片内容 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 引入评论组件
import comment from "../subcomponents/Comment";
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {}, // 图片详情
      list: [] // 缩略图
    };
  },
  created() {
    this.getPhotoinfo();
    this.getThumbs();
  },
  methods: {
    showImagePreview(startid) {
      // 图片预览
      const images = this.list;
      const instance = ImagePreview({
        images,
        startPosition: startid
      });
    },
    getThumbs() {
      // 获取缩略图图片
      this.$axios.get("api/getthumimages/" + this.id).then(response => {
        response.data.message.forEach(element => {
          this.list.push(element.src);
        });
      });
    },
    getPhotoinfo() {
      this.$axios.get("api/getimageInfo/" + this.id).then(response => {
        this.photoinfo = response.data.message[0];
      });
    }
  },
  components: {
    "cmt-box": comment // 注册评论子组件
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    margin: 15px 0;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .flex-container {
    display: flex;
    flex-wrap: wrap;
    div {
      margin: 5px 11px;
      img {
        box-shadow: 0 0 8px #888;
      }
    }
  }
}
</style>
