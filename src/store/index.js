import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: null,
    questions: [],
    score: 0,
    current: 0,
  },
  getters: {
    getCategory: state => state.category
  },
  mutations: {
    SET_CATEGORY (state, category) {
      state.category = category;
    }
  },
  actions: {},
  modules: {}
});
