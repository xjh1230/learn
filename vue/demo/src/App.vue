<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <Sidebar></Sidebar> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <div id="nav">
      <router-link to="/">
        <svg-icon icon-class="denglong"></svg-icon>Home </router-link
      >|
      <router-link to="/about">
        <svg-icon icon-class="wx"></svg-icon>About</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "comps/HelloWorld.vue";
import Sidebar from "comps/Sidebar/index.vue";
@Component({
  components: {
    HelloWorld,
    Sidebar,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
