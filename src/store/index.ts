import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      is_login: false,
      username: "",
    }
  },
  mutations: {
    loginSuccess(state, params) {
      state.userInfo = {
        is_login: true,
        username: params.username
      }
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    logout(state) {
      state.userInfo = {
        is_login: false,
        username: null
      }
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
  },
  actions: {
  },
  modules: {
  }
})
