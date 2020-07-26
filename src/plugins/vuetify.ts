import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueTheMask)

const opts = {
  iconfont: 'fa'
}

export default new Vuetify(opts);
