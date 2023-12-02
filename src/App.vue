<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header-Section.vue';

export default {
  name: "App",
  components: {
    Header
  }
};

</script>

<style>
</style>