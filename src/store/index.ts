import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { User } from '../interfaces/user-interface'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {} as User,
    logged: false,
    timeLogged: new Date()
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setLogged(state, logged) {
      state.logged = logged
    },
    logout(state) {
      state.user = {}
      state.logged = false;
    },
    timeLogin(state) {
      state.timeLogged = new Date()
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
