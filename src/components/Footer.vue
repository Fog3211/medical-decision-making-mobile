<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">标签</van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import store from '@store/index';
export default {
  data() {
    return {};
  },
  computed: {
    is_login() {
      return store.state.is_login;
    },
  },
};
</script>

<style scoped lang="scss">
</style>