import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Vuelidate from "vuelidate";
import VueTheMask from "vue-the-mask";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../store";

// axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://elosolar.herokuapp.com/v1'
axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/" +
  "https://dc159ff22bdf.ngrok.io" +
  "/v1";
axios.defaults.headers.get[
  "Authorization"
] = `Bearer ${store.state.user.token}`;
axios.defaults.headers.post[
  "Authorization"
] = `Bearer ${store.state.user.token}`;
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

Vue.prototype.$http = axios;

Vue.use(Vuetify, Vuelidate, VueTheMask, VueAxios, axios);

const opts = {
  iconfont: "fa",
};

export default new Vuetify(opts);
