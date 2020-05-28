<template>
  <van-nav-bar :title="title" class="header">
    <template #left @click="handleGoBack" v-if="showBack">
      <van-icon name="arrow-left" size="18" />
      <span>返回</span>
    </template>
  </van-nav-bar>
</template>

<script lang='ts'>
import store from '@store/index'
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    showBack: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleGoBack() {
      this.$router.push('llll')
      // this.$router.back(-1)
    },
  }
};
</script>

<style scoped lang="scss">
.header {
  background-color: #fafafa;
}
</style>