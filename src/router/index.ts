import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from "@/store"
import { Notify } from "vant"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@views/home/404.vue')
  },
  // {
  //   path: '/',
  //   redirect: '/home/recommend'
  // },
  // {
  //   path: '/index',
  //   redirect: '/home/recommend'
  // },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('@views/home/Home.vue'),
  //   redirect: '/home/recommend',
  //   children: [{
  //     path: "recommend",
  //     name: "recommend",
  //     component: () => import('@views/home/recommend/Recommend.vue'),
  //   },
  //   {
  //     path: "hottest",
  //     name: "hottest",
  //     component: () => import('@views/home/recommend/Hottest.vue'),
  //   }, {
  //     path: "latest",
  //     name: "latest",
  //     component: () => import('@views/home/recommend/Latest.vue'),
  //   }
  //   ]
  // },
  // {
  //   path: '/search',
  //   name: 'search',
  //   component: () => import('@views/home/Search.vue')
  // },
  // {
  //   path: '/subject/:subject_id',
  //   name: 'subject',
  //   component: () => import('@views/home/Subject.vue')
  // },
  // {
  //   path: '/collection',
  //   name: 'collection',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('@views/quiz/Collection.vue')
  // },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      requiresAuth: false
    },
    component: () => import('@views/mine/Mine.vue'),
  },
  // {
  //   path: '/mine/avatar',
  //   name: 'avatar',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('@views/mine/Avatar.vue'),
  // },
  // {
  //   path: '/mine/profile',
  //   name: "profile",
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('@views/mine/other/Profile.vue')
  // },
  // {
  //   path: '/mine/message',
  //   name: "message",
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('@views/mine/other/Message.vue')
  // },
  // {
  //   path: '/mine/about',
  //   name: "about",
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import('@views/mine/other/About.vue')
  // },
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
    if (!store.state.userInfo.is_login) {
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