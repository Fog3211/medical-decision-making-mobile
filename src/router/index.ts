import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from "@/store"
import { Notify } from "vant"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@views/home/404.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@views/home/Home.vue'),
  },
  {
    path: '/disease',
    name: 'disease',
    component: () => import('@views/disease/Disease.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      requiresAuth: true
    },
    component: () => import('@views/home/Search.vue'),
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      requiresAuth: true
    },
    component: () => import('@views/news/News.vue'),
  },
  {
    path: '/cartoonDetail',
    name: "cartoonDetail",
    meta: {
      requiresAuth: true
    },
    component: () => import('@components/CartoonDetail.vue')
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@views/login/Login.vue')
  },
  {
    path: '/register',
    name: "register",
    component: () => import('@views/login/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.userInfo.isLogin) {
      Notify({
        message: "请先登录"
      })
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router