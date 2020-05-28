<template>
  <div class="login">
    <Header title="登录" showLink showBack />
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="formFileds.telphone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[  { required: true, message: '手机号不能为空' },
          { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }]"
      />
      <van-field
        v-model="formFileds.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' },
         { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码必须为6~15位数字字母组合' }]"
      />
      <div class="login-btn-box">
        <van-button round block type="info" native-type="submit" class="btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang='ts'>
import Header from '@components/Header.vue'
import { Notify } from 'vant'
import store from '@store/index'
import { USER_LOGIN } from '@config/api.config'
import { axios, encryption } from '@utils/index'

let _self = null

export default {
  components: {
    Header,
  },
  data() {
    return {
      formFileds: {
        telphone: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      const { telphone, password } = _self.formFileds

      axios.post(USER_LOGIN, {
        telphone: _self.formFileds.telphone,
        password: encryption.encrypt(_self.formFileds.password),
      }).then(res => {
        if (res.data.code === 200) {
          Notify({ type: 'success', message: '登录成功' })
          store.commit('loginSuccess', res.data.result)

          if (!_self.$route.query.redirect) {
            _self.$router.push('/home')
          } else {
            _self.$router.replace({
              path: _self.$route.query.redirect,
            })
          }
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
.login {
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