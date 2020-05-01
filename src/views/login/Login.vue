<template>
  <div class="page">
    <Header :title="title" :showBack="true">
      <router-link to="/register" class="register-btn">注册</router-link>
    </Header>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" class="login-form" @keyup.enter="onSubmit">
      <van-field
        label="用户名"
        v-model="login_form.username"
        class="edit"
        :state="form_state.username"
        placeholder="请输入用户名"
      />
      <van-field
        label="密码"
        type="password"
        v-model="login_form.password"
        class="edit"
        :state="form_state.password"
        placeholder="请输入密码"
      />
      <button class="submit-btn" @click="onSubmit">登录</button>
    </van-form>
  </div>
</template>

<script lang='ts'>
import Header from '@components/Header.vue'
import { Toast } from 'vant'
import store from '@store/index'
import { formCheck, axios } from '@utils/index'
export default {
  components: {
    Header,
  },
  data() {
    return {
      title: '登录',
      login_form: {
        username: '',
        password: '',
      },
      form_state: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      // 表单校验
      if (this.form_state.username == 'warning') {
        Toast({
          message: '用户名不能为空',
        })
        return
      }
      if (this.form_state.password == 'warning') {
        Toast({
          message: '密码错误',
        })
        return
      }

      // Service.login(this.login_form).then(res => {
      //   if (!res) {
      //     Toast({
      //       message: '出错啦，请稍后再试',
      //     })
      //   } else {
      //     if (res.code == 1) {
      //       Toast({ message: '登录成功' })
      //       store.commit('loginSuccess', res)

      //       if (!this.$route.query.redirect) {
      //         this.$router.push('/home')
      //       }
      //       this.$router.replace({
      //         path: this.$route.query.redirect,
      //       })
      //     } else if (res.code == 0) {
      //       Toast({
      //         message: '密码有误',
      //       })
      //     } else if (res.code == 2) {
      //       Toast({
      //         message: '用户名不存在',
      //       })
      //     } else {
      //       Toast({
      //         message: '出错啦，请稍后再试',
      //       })
      //     }
      //   }
      // })
    },
  },
  watch: {
    login_form: {
      handler(newValue, oldValue) {
        this.form_state.username = formCheck.usernameCheck(this.login_form.username)
        this.form_state.password = formCheck.passwordCheck(
          this.login_form.password,
          this.login_form.password,
        )
      },
      deep: true,
    },
  },
  deactivated() {
    this.login_form = {
      username: '',
      password: '',
    }
  },
};
</script>

<style scoped lang="scss">
.register-btn {
  font-size: 0.3rem;
}

.login-form {
  margin-top: 2rem;

  .edit {
    margin: 0.6rem auto;
    width: 80%;
    border-radius: 0.25rem;
  }

  .submit-btn {
    width: 70%;
    height: 0.8rem;
    border-radius: 0.1rem;
    margin-top: 0.5rem;
    font-size: 0.35rem;
    font-weight: bolder;
    color: #fff;
    letter-spacing: 0.2rem;
    background-color: #18ac18;
  }
}
</style>