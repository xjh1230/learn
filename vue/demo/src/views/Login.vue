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
            this.$store.dispatch("user/login", {
                userName: this.userName
            }).then(() => {
                console.log(this.$route, this.$route.redirect)
                this.$router
                    .push({
                        path: this.$route.query.redirect || "/",
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }, err => {
                console.log(err)
            });
        },
    },
};
</script>
