<template>
  <div class="cartoon-detail">
    <van-nav-bar title="漫画详情" class="header" left-text="返回" left-arrow @click-left="closeCartoon" />
    <iframe :src="item.link" frameborder="0" class="wrapper" />
  </div>
</template>

<script>
import Header from '@components/Header.vue';
import { Notify } from 'vant';
import store from '@store/index';
import { axios } from '@utils/index';

let _self = null;

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  name: 'cartoonDetail',
  data() {
    return {};
  },
  methods: {
    closeCartoon() {
      _self.$emit('closeCartoonDetail');
    },
  },
  created() {
    _self = this;
  },
};
</script>
<style scoped lang="scss">
.cartoon-detail {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  .wrapper {
    width: 100%;
    min-height: 100vh;
  }
}
</style>