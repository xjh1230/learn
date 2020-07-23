<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h2>Home</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "comps/HelloWorld";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
