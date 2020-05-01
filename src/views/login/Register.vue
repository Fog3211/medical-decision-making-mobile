<template>
  <div class="page">
    <Header :title="title" :showBack="true">
      <router-link to="/login" class="login-btn">登录</router-link>
    </Header>
    <van-form @submit="onSubmit" class="register-form" @keyup.enter="onSubmit">
      <van-field
        label="用户名"
        v-model="register_form.username"
        class="edit"
        :state="form_state.username"
        placeholder="请输入用户名"
      />
      <van-field
        label="密码"
        type="password"
        v-model="register_form.password"
        class="edit"
        :state="form_state.password"
        placeholder="请输入密码"
      />
      <van-field
        label="重复密码"
        type="password"
        v-model="register_form.repassword"
        class="edit"
        :state="form_state.repassword"
        placeholder="请再次输入密码"
      />
      <button class="submit-btn" @click="onSubmit">注册</button>
    </van-form>
  </div>
</template>

<script>
import Header from '@components/Header.vue';
import {} from '@config/api.config';
import { axios, formCheck } from '@utils/index';
export default {
  components: {
    Header,
  },
  data() {
    return {
      title: '注册',
      register_form: {
        username: '',
        password: '',
        repassword: '',
      },
      form_state: {
        username: '',
        password: '',
        repassword: '',
      },
    };
  },
  methods: {
    onSubmit() {
      // 表单校验
      if (this.form_state.username == 'warning') {
        Toast({
          message: '用户名不能为空',
        });
        return;
      } else if (this.form_state.password == 'error') {
        Toast({
          message: '两次密码不一致',
        });
        return;
      } else if (this.form_state.password == 'warning') {
        Toast({
          message: '密码长度限制为6~16位',
        });
        return;
      }

      // Service.register(this.register_form).then(res => {

      //   if (!res) {
      //     Toast({
      //       message: '出错啦，请稍后再试',
      //       position: 'bottom',
      //     });
      //   } else {
      //     if (res.code == 1) {
      //       Toast({
      //         message: '注册成功，请登录',
      //         position: 'bottom',
      //       });
      //       this.$router.back(-1);
      //     } else if (res.code == 0) {
      //       Toast({
      //         message: '用户名已存在',
      //         position: 'bottom',
      //       });
      //     } else {
      //       Toast({
      //         message: '出错啦，请稍后再试',
      //         position: 'bottom',
      //       });
      //     }
      //   }
      // });
    },
  },
  watch: {
    register_form: {
      handler(newValue, oldValue) {
        this.form_state.username = formCheck.usernameCheck(this.register_form.username);
        this.form_state.repassword = this.form_state.password = formCheck.passwordCheck(
          this.register_form.password,
          this.register_form.repassword,
        );
      },
      deep: true,
    },
  },
  deactivated() {
    this.register_form = {
      username: '',
      password: '',
      repassword: '',
    };
  },
};
</script>

<style scoped lang="scss">
.login-btn {
  font-size: 0.3rem;
}

.register-form {
  margin-top: 2rem;

  .edit {
    margin: 0.5rem auto;
    width: 80%;
    border-radius: 0.25rem;
  }

  .submit-btn {
    width: 5rem;
    height: 0.8rem;
    border-radius: 0.1rem;
    margin-top: 0.5rem;
    font-size: 0.4rem;
    font-weight: bolder;
    color: #fff;
    letter-spacing: 0.2rem;
    background-color: #18ac18;
  }
}
</style>