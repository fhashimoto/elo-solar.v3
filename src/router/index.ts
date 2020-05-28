import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../components/login/Login.vue'
import Seller from '../components/seller/Seller.vue'
import SellerListClient from '../components/seller/seller-list-client/SellerListClient.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller
  },
  {
    path: '/seller/list-client',
    name: 'ListClient',
    component: SellerListClient
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
