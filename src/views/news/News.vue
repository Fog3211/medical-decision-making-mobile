<template>
  <div class="home">
    <Header title="消息通知" />
    <!-- 搜索部分 -->
    <router-link to="/search" class="search">
      <div class="search-input">
        <i class="iconfont iconsousuo search-icon"></i>
        <span class="search-text">请输入症状关键词进行搜索</span>
      </div>
    </router-link>

    <div v-for="(item,index) in cartoonList" :key="index" class="cartoon-box">
      <div class="cartoon" @click="showCartoonDetail(index)">
        <p class="title">{{item.title}}</p>
        <img :src="item.imgSrc" :alt="item.title" class="img" />
      </div>
      <CartoonDetail
        v-if="currentRecordIndex===index"
        :item="item"
        @closeCartoonDetail="closeCartoonDetail"
      />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@components/Header.vue';
import Footer from '@components/Footer.vue';
import CartoonDetail from '@components/CartoonDetail.vue';
import { Notify, List, Panel } from 'vant';
import store from '@store/index';
import { GET_CARTOON_LIST } from '@config/api.config';
import { axios, encryption } from '@utils/index';

let _self = null;

export default {
  components: {
    Header,
    Footer,
    CartoonDetail,
  },
  name: 'news',
  data() {
    return {
      cartoonList: [],
      currentRecordIndex: -1,
      departmentList: [],
    };
  },
  methods: {
    getCartoons() {
      axios.get(GET_CARTOON_LIST).then(res => {
        if (res.data.code === 200) {
          _self.cartoonList = res.data.result.data;
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      });
    },
    showCartoonDetail(index) {
      _self.currentRecordIndex = index;
    },
    closeCartoonDetail() {
      _self.currentRecordIndex = -1;
    },
  },
  mounted() {
    _self.getCartoons();
  },
  created() {
    _self = this;
  },
};
</script>
<style scoped lang="scss">
.home {
  overflow-x: hidden;
  padding: 0 20px;
  text-align: center;
  .search {
    position: relative;
    width: 100%;
    height: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &-input {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #b7b7b7;
      width: 95vw;
      height: 0.75rem;
      background-color: aliceblue;
      border-radius: 0.3rem;
    }

    &-icon {
      position: absolute;
      left: 0.6rem;
      font-size: 0.38rem;
      line-height: 0.75rem;
      color: #969696;
    }

    &-text {
      font-size: 0.35rem;
      line-height: 0.35rem;
      letter-spacing: 0.05rem;
    }
  }

  .cartoon-box {
    margin: 0 auto;
    width: 100%;
    border-bottom: 1px solid #aaa;
    margin-bottom: 5px;

    .cartoon {
      .title {
        font-size: 14px;
        text-align: left;
        margin: 0;
        color: #000;
        font-weight: bold;
      }
      img {
        width: 100%;
        height: 160px;
        border-radius: 5px;
      }
    }
  }
}
</style>