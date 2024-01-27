import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home-Page.vue';
import Wizards from './components/FormWizard-Page.vue';
import UserProfile from './components/UserProfile-Page.vue';
import ConsultationList from './components/ConsultationList-Section.vue';
import UserInfo from './components/UserInfo-Section.vue';
import UserSetting from './components/UserSetting-Section.vue';
import ConsultantProfile from './components/ConsultantProfile-Page.vue';
import Signup from './components/Signup-Page.vue';
import Login from './components/Login-Page.vue';
import Charging from './components/Charging-Page.vue'



Vue.use(VueRouter)


const routes = [
  { path: '/charging', name: 'Charging', component: Charging, meta: { requiresAuth: true }},
  { path: "/", name: "home", component: Home },
  { path: "/reserve/:id", name: "Reserve", component: Wizards, meta: { requiresAuth: true } },
  { path: "/consultant/:id", name: "consultant", component: ConsultantProfile },
  { path: "/Signup", name: "Signup", component: Signup, meta: { hideComponent: true } },
  { path: "/Login", name: "Login", component: Login, meta: { hideComponent: true } },
  { path: "/profile", name: "profile", component: UserProfile, meta: { requiresAuth: true }, redirect: '/profile/consultation',
    children: [
      { path: "/profile/consultation", name: "ConsultationList", component: ConsultationList },
      { path: "/profile/info", name: "info", component: UserInfo },
      { path: "/profile/setting", name: "setting", component: UserSetting },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('userLoggedIn')
  if (to.matched.some(record => record?.meta?.requiresAuth)) {
      if (!user) {
          router.push({ path: '/login', query: { to: to.fullPath } })
      }
  }
  return next()
})

export default router;