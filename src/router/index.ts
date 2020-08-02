import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../components/login/Login.vue'
import Seller from '../components/seller/Seller.vue'
import SellerListClient from '../components/seller/seller-list-client/SellerListClient.vue'
import NewClient from '../components/seller/new-client/NewClient.vue'
import EditClient from '../components/seller/edit-client/EditClient.vue'

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
  },
  {
    path: '/seller/new-client',
    name: 'NewClient',
    component: NewClient
  },
  {
    path: '/seller/edit/:id',
    name: 'EditClient',
    component: EditClient
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
