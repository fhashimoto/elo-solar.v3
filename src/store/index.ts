import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { User } from '../interfaces/user-interface'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {} as User,
    logged: false,
    timeLogged: new Date(),
    loading: false
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      console.log(data)
      axios.defaults.headers.get['Authorization'] = `Bearer ${data.token}`
    },
    setLogged(state, logged) {
      state.logged = logged            
    },
    logout(state) {
      state.user = {}
      state.logged = false;
    },
    timeLog(state, date) {
      state.timeLogged = date
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
