<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <textarea placeholder="请输入要发表的内容(最多可输入120字符)" maxlength="120" v-model="msg"></textarea>
    <!-- 按钮 -->
    <mt-button size="large" type="primary" @click="postComment">提交评论</mt-button>
    <!-- 评论div -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(comment, index) in comments" :key="index">
        <div class="cmt-title">
          第{{ index + 1 }}楼&nbsp;&nbsp;
          用户:{{ comment.user_name }}&nbsp;&nbsp;
          发表时间:{{ comment.add_time | dateFormat }}
        </div>
        <div
          class="cmt-body"
        >{{ comment.content === 'undefined' || comment.content.trim() === '' ? '此用户没有发表任何评论' : comment.content }}</div>
      </div>
    </div>

    <mt-button @click="getMore" size="large" type="danger" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      comments: [],
      pageIndex: 1, // 默认展示第一页数据
      msg: "" // 评论内容
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    getComments() {
      // 获取评论
      this.$axios
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(response => {
          this.comments = this.comments.concat(response.data.message);
          // console.log(this.comments.concat(response.data.message))
        })
        .catch(error => {
          Toast("获取数据失败，请稍后再试");
        });
    },
    postComment() {
      // 发表评论
      if (this.msg.trim().length === 0) {
        // 判断评论是否为空
        return Toast("评论内容不能为空");
      }
      this.$axios
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(response => {
          var demo_comment = {
            // 自己封装数据
            user_name: "匿名用户test",
            add_time: Date.now(),
            content: this.msg.trim()
          };
          if (response.data.status === 0) {
            // 提交评论成功
            this.comments.unshift(demo_comment);
            this.msg = ""; // 清空评论
          }
        })
        .catch(error => {
          Toast("发生未知错误");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  textarea {
    font-size: 12px;
    margin: 0;
    height: 100px;
  }
  .cmt-list {
    font-size: 14px;
    margin: 5px 0;
    .cmt-title {
      background-color: #ccc;
      line-height: 30px;
    }
    .cmt-body {
      line-height: 30px;
      text-indent: 2em;
    }
  }
}
</style>
