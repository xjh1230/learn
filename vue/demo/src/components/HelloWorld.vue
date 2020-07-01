<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button @click="showNotice">弹窗</button>
  </div>
</template>

<script>
import Notice from "./notice/index";

// 导出的是组件配置对象，它是一个普通js对象
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {},
  methods: {
    showNotice() {
      let msg = Math.random()
        .toFixed(16)
        .substring(2, 10);
      this.$createNotice({
        title: "村长喊你来搬砖",
        msg: msg,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
