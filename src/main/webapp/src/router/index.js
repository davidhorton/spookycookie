import Vue from 'vue'
import Router from 'vue-router'
import Quiz from '@/components/Quiz'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import LoginFailed from '@/components/LoginFailed'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/loginFailed',
      name: 'LoginFailed',
      component: LoginFailed
    },
  ]
})
