import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from "@/views/SignUpView";
import LogInView from "@/views/LogInView";
import auth from "../auth";
import AddPostView from "@/views/AddPostView";
import EditPostView from "@/views/EditPostView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next('/login')
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/post/new',
    name: 'new-post',
    component: AddPostView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next('/login')
      } else {
        next();
      }
    }
  },
  {
    path: '/post/:id',
    name: 'edit-post',
    component: EditPostView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next('/login')
      } else {
        next();
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
