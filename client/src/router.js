import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import CoursePage from './views/CoursePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/ColleaguesPage',
      name: 'colleaguesPage',
      component: ColleaguesPage
    },
    {
      path: 'courses/:id',
      name: 'coursePage',
      component: CoursePage
    },
    {
      path: '/ProfilePage',
      name: 'profilePage',
      component: ProfilePage
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage
    }
  ]
})
