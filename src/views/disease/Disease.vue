<template>
  <div class="disease">
    <Header title="疾病大全" />

    <van-tabs v-model="activeTab">
      <van-tab title="按科室搜索">
        <van-grid>
          <van-grid-item
            :text="item.name"
            v-for="(item,index) in departmentList"
            :key="index"
            @click="getDiseaseData('departmentKey',item.key)"
          />
        </van-grid>
      </van-tab>

      <van-tab title="按部位搜索">
        <van-grid>
          <van-grid-item
            :text="item.name"
            v-for="(item,index) in partList"
            :key="index"
            @click="getDiseaseData('partKey',item.key)"
          />
        </van-grid>
      </van-tab>

      <van-tab title="按名称搜索">
        <van-search
          v-model="diseaseName"
          placeholder="请输入疾病名称"
          show-action
          @search="getDiseaseData('name')"
        />
      </van-tab>
    </van-tabs>

    <van-empty description="没有相关数据" v-if="diseaseList.length===0" class="empty" />
    <van-list v-else class="disease-list">
      <van-cell
        v-for="(item,index) in diseaseList"
        :key="index"
        :title="item.name"
        class="disease-list-cell"
        @click="showDiseaseDetail(item)"
      />
    </van-list>

    <van-popup v-model="isDiseaseDetailShow" position="bottom">
      <van-collapse v-model="activeDiseaseNames" v-if="Boolean(currentRecordDisease)">
        <van-collapse-item title="名称" name="name">{{currentRecordDisease.name}}</van-collapse-item>
        <van-collapse-item title="别名" name="alias">{{currentRecordDisease.alias}}</van-collapse-item>
        <van-collapse-item title="易发人群" name="crowd">{{currentRecordDisease.crowd}}</van-collapse-item>
        <van-collapse-item title="简介" name="introduction">{{currentRecordDisease.introduction}}</van-collapse-item>
        <van-collapse-item title="治疗方式" name="treatment">{{currentRecordDisease.treatment}}</van-collapse-item>
      </van-collapse>
    </van-popup>

    <Footer />
  </div>
</template>

<script>
import Header from '@components/Header.vue';
import Footer from '@components/Footer.vue';
import { Notify } from 'vant';
import { GET_DEPARTMENT_LIST, GET_PART_LIST, GET_DISEASE_LIST } from '@config/api.config';
import { axios } from '@utils/index';

let _self = null;

export default {
  components: {
    Header,
    Footer,
  },
  name: 'disease',
  data() {
    return {
      departmentList: [],
      partList: [],
      activeTab: '',
      diseaseList: [],
      diseaseName: '',
      isDiseaseDetailShow: false,
      currentRecordDisease: null,
      activeDiseaseNames: ['crowd', 'name', 'introduction', 'treatment', 'alias'],
    };
  },
  methods: {
    getDepartmentList() {
      axios.get(GET_DEPARTMENT_LIST).then(res => {
        if (res.data.code === 200) {
          _self.departmentList = res.data.result;
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      });
    },
    getPartList() {
      axios.get(GET_PART_LIST).then(res => {
        if (res.data.code === 200) {
          _self.partList = res.data.result;
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      });
    },
    getDiseaseData(type, value) {
      const params = { pageSize: 500 };
      if (type === 'name') {
        params['name'] = _self.diseaseName;
      } else {
        params[type] = value;
      }
      axios.get(GET_DISEASE_LIST, { params }).then(res => {
        if (res.data.code === 200) {
          _self.diseaseList = res.data.result.data;
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
  mounted() {
    _self.getDepartmentList();
    _self.getPartList();
  },
  created() {
    _self = this;
  },
};
</script>
<style scoped lang="scss">
.disease {
  padding: 0 20px;
  .nav-title {
    font-size: 16px;
  }
  &-list {
    margin-top: 10px;
    &-cell {
      border-top: 1px solid #ddd;
    }
  }
}
</style>