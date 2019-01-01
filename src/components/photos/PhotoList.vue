<template>
  <div>
    <!-- 顶部列表区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
            v-for="(item, id) in cates"
            :key="id"
            @tap="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <!-- 图片区域 -->
    <ul class="photo-list">
      <router-link v-for="(item, id) in list" :key="id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <div class="info-titl">{{ item.title }}</div>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], // 顶部导航栏所有标题
      list: [] // 所有图片
    };
  },
  mounted() {
    // 让mui能滚动
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0); // 默认id传入0，展示全部图片
  },
  methods: {
    getPhotoListByCateId(cateid) {
      // 获取所有图片
      this.$axios
        .get("api/getimages/" + cateid)
        .then(response => {
          // console.log(response.data.message)
          this.list = response.data.message;
        })
        .catch(error => {
          Toast("获取失败，请稍后再试");
        });
    },
    getAllCategory() {
      // 获取所有图片
      // console.log('ok')
      this.$axios
        .get("api/getimgcategory")
        .then(response => {
          // console.log(response.data.message);
          response.data.message.unshift({ title: "全部", id: 0 });
          this.cates = response.data.message;
        })
        .catch(error => {
          Toast("获取失败，请稍后再试");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// 取消chrome浏览器warning
* {
  touch-action: none;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    img {
      width: 100%;
      vertical-align: middle;
    }
    .info {
      position: absolute;
      bottom: 0;
      color: aliceblue;
      text-align: left;
      background-color: rgba($color: #000000, $alpha: 0.5);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
}
</style>
