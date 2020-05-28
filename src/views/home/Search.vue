<template>
  <div class="search">
    <router-link to="home">
      <van-nav-bar title="搜索" class="header" left-text="返回" left-arrow />
    </router-link>

    <van-search
      v-model="question"
      placeholder="请输入您的问题或症状描述"
      show-action
      @search="onLoadMoreQuestion"
    />

    <van-empty description="没有相关数据" v-if="questionList.length===0" class="empty" image="search" />
    <van-list v-else class="question-list">
      <van-cell
        v-for="(item,index) in questionList"
        :key="index"
        :title="item.question"
        style="border-top:1px solid #ccc"
        @click="showDiseaseDetail(item)"
      />
    </van-list>

    <van-popup v-model="isDiseaseDetailShow" position="bottom">
      <van-collapse v-model="activeDiseaseNames" v-if="Boolean(currentRecordDisease)">
        <van-collapse-item title="症状" name="question">{{currentRecordDisease.question}}</van-collapse-item>
        <van-collapse-item title="回答" name="answer">{{currentRecordDisease.answer}}</van-collapse-item>
      </van-collapse>
    </van-popup>
  </div>
</template>

<script>
import { Search, Field, Notify, List } from 'vant';
import Header from '@components/Header.vue';
import { GET_QUESTION_LIST } from '@config/api.config';
import { axios, encryption } from '@utils/index';

let _self = this;

export default {
  components: {
    Header,
  },
  data() {
    return {
      question: '',
      questionList: [],
      currentRecordDisease: null,
      isDiseaseDetailShow: false,
      activeDiseaseNames: ['question', 'answer'],
    };
  },
  methods: {
    onLoadMoreQuestion() {
      if (!_self.question || !_self.question.trim()) return;

      axios
        .get(GET_QUESTION_LIST, {
          params: {
            question: _self.question,
          },
        })
        .then(res => {
          if (res.data.code === 200) {
            this.questionList = res.data.result;
            if (res.data.result.length === 0) {
              Notify({ type: 'warning', message: '未找到搜索内容' });
            }
          } else {
            Notify({ type: 'danger', message: res.data.msg });
          }
        });
    },
    showDiseaseDetail(item) {
      _self.isDiseaseDetailShow = true;
      _self.currentRecordDisease = item || {};
    },
  },
  created() {
    _self = this;
  },
};
</script>

<style scoped lang="scss">
.search {
  background-color: rgb(247, 250, 252);
  .search-input {
    margin-top: 20px;
  }
  .empty {
    min-height: 90vh;
  }
  .question-list {
    text-align: left;
  }
}
</style>