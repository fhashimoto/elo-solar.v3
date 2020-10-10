import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../components/login/Login.vue";
import Seller from "../components/seller/Seller.vue";
import SellerListClient from "../components/seller/seller-list-client/SellerListClient.vue";
import NewClient from "../components/seller/new-client/NewClient.vue";
import EditClient from "../components/seller/edit-client/EditClient.vue";
import Adm from "../components/adm/Adm.vue";
import ListUser from "../components/adm/users/User-List.vue";
import NewUser from "../components/adm/users/User-Form.vue";
import EditUser from "../components/adm/users/User-Edit.vue";
import Engineer from "../components/engineer/Engineer.vue";
import SolarPanel from "../components/engineer/SolarPanel/Solar-Panel-List.vue";
import NewSolarPanel from "../components/engineer/SolarPanel/Solar-Panel-Form.vue";
import EditSolarPanel from "../components/engineer/SolarPanel/Solar-Panel-Edit.vue";
import GeneratorKit from "../components/engineer/GeneratorKit/Generator-Kit-List.vue"
import NewGeneratorKit from "../components/engineer/GeneratorKit/Generator-Kit-Form.vue";
import EditGeneratorKit from "../components/engineer/GeneratorKit/Generator-Kit-Edit.vue";
import Inversor from "../components/engineer/Inversor/Inversor-List.vue"
import NewInversor from "../components/engineer/Inversor/Inversor-Form.vue";
import EditInversor from "../components/engineer/Inversor/Inversor-Edit.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/seller",
    name: "Seller",
    component: Seller,
  },
  {
    path: "/seller/list-client",
    name: "ListClient",
    component: SellerListClient,
  },
  {
    path: "/seller/new-client",
    name: "NewClient",
    component: NewClient,
  },
  {
    path: "/seller/edit/:id",
    name: "EditClient",
    component: EditClient,
  },
  {
    path: "/administrator",
    name: "Administrator",
    component: Adm,
  },
  {
    path: "/administrator/list-user",
    name: "ListUser",
    component: ListUser,
  },
  {
    path: "/administrator/new-user",
    name: "NewUser",
    component: NewUser,
  },
  {
    path: "/administrator/edit-user/:id",
    name: "EditUser",
    component: EditUser,
  },
  {
    path: "/engineer",
    name: "Engineer",
    component: Engineer,
  },
  {
    path: "/engineer/solar-panel",
    name: "SolarPanel",
    component: SolarPanel,
  },
  {
    path: "/engineer/solar-panel/new-equip",
    name: "NewSolarPanel",
    component: NewSolarPanel,
  },
  {
    path: "/engineer/solar-panel/edit/:id",
    name: "EditSolarPanel",
    component: EditSolarPanel,
  },
  {
    path: "/engineer/generator-kit",
    name: "GeneratorKit",
    component: GeneratorKit,
  },
  {
    path: "/engineer/generator-kit/new-equip",
    name: "NewGeneratorKit",
    component: NewGeneratorKit,
  },
  {
    path: "/engineer/generator-kit/edit/:id",
    name: "EditGeneratorKit",
    component: EditGeneratorKit,
  },
  {
    path: "/engineer/inversor",
    name: "Inversor",
    component: Inversor,
  },
  {
    path: "/engineer/inversor/new-equip",
    name: "NewInversor",
    component: NewInversor,
  },
  {
    path: "/engineer/inversor/edit/:id",
    name: "EditInversor",
    component: EditInversor,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
