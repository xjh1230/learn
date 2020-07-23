<template>
  <div>
    <h2>用户登录</h2>
    <div>
      <input type="text" v-model="userName" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "admin",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("user/login", { userName: userName }).then(() => {
        this.$router
          .push({
            path: this.$router.query.redirect || "/",
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>
