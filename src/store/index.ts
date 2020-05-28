import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      isLogin: false,
      username: "",
      token: ""
    }
  },
  mutations: {
    loginSuccess(state, params) {
      state.userInfo = {
        isLogin: true,
        username: params.username,
        token: params.token
      }
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    logout(state) {
      state.userInfo = {
        isLogin: false,
        username: "",
        token: ""
      }
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
  },
  actions: {
  },
  modules: {
  }
})
