import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    role: '',
    token: '',
    logged: false,
    timeLogged: new Date()
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    setRole(state, role) {
      state.role = role
    },
    setToken(state, token) {
      state.token = 'Bearer ' + token
    },
    setLogged(state, logged) {
      state.logged = logged
    },
    logout(state) {
      state.name = '';
      state.role = '';
      state.token = '';
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
