<template>
  <div class="register">
    <Header title="注册" showLink showBack>
      <router-link to="/login" class="login-btn">登录</router-link>
    </Header>
    <van-form @submit="onSubmit" class="form" @keyup.enter="onSubmit">
      <van-field
        v-model="formFileds.telphone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '手机号不能为空' },
          { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }]"
      />
      <van-field
        v-model="formFileds.name"
        name="姓名"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '姓名不能为空' }]"
      />
      <van-field
        v-model="formFileds.nickName"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '昵称不能为空' }]"
      />
      <van-field name="性别" label="性别">
        <template #input>
          <van-radio-group v-model="formFileds.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="formFileds.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' },
         { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码必须为6~15位数字字母组合' }]"
      />
      <van-field
        v-model="formFileds.rePassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请再次输入密码' },
         { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码必须为6~15位数字字母组合' }]"
      />
      <div class="register-btn-box">
        <van-button round block type="info" native-type="submit" class="btn">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang='ts'>
import Header from '@components/Header.vue'
import { USER_REGISTER } from '@config/api.config'
import { axios, encryption } from '@utils/index'
import { Notify } from 'vant'

let _self = null

export default {
  components: {
    Header,
  },
  data() {
    return {
      formFileds: {
        name: '',
        nickName: '',
        telphone: '',
        sex: 1,
        password: '',
        rePassword: '',
      },
    }
  },
  methods: {
    onSubmit() {
      axios.post(USER_REGISTER, {
        ..._self.formFileds,
        rePassword: null,
        password: encryption.encrypt(_self.formFileds.password),
      }).then(res => {
        if (res.data.code === 200) {
          Notify({ type: 'success', message: '注册成功，正在前往登录页面' })
          _self.$router.push({
            path: 'login'
          })
        } else {
          Notify({ type: 'danger', message: res.data.msg })
        }
      })
    },
  },
  created() {
    _self = this
  },
};
</script>

<style scoped lang="scss">
.register {
  background-color: #f7f7f7;
  height: 100vh;
  .form {
    margin-top: 40px;
  }
  &-btn-box {
    padding: 20px;
    margin-top: 20px;
    font-size: 2rem;
    .btn {
      font-size: 18px;
      letter-spacing: 3px;
    }
  }
}
</style>