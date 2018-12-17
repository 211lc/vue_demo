<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../lib/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../lib/images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

    <h3>Home</h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.mint-swipe-item:nth-child(1) {
  background-image: url("../../lib/images/demo1.jpg");
}
.mint-swipe-item:nth-child(2) {
  background-image: url("../../lib/images/demo2.jpg");
  background-color: #ffc5e3;
}
.mint-swipe-item:nth-child(3) {
  background-image: url("../../lib/images/demo3.jpg");
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border-top: none;
  border-left: none;
  .mui-table-view-cell {
    border-right: none;
    border-bottom: none;
  }
  img {
    height: 60px;
    width: 60px;
  }
  .mui-media-body {
    font-size: 14px;
  }
}
</style>
