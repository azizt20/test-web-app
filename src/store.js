import { createStore } from 'vuex'
import auth from './store/auth'
import student from './store/student'
import test from './store/test'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    student,
    test
  }
})
