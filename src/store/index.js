import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: 0,
    quizz: [],
    score: 0,
  },
  getters: {
    getCategory: state => state.category,
    getNextQuestion: (state) => (index) => {
      console.log(state.quizz[index]);
      return (state.quizz[index]);
    }
  },
  mutations: {
    SET_CATEGORY (state, category) {
      state.category = category;
    },
    SET_QUIZZ (state, quizz) {
      console.log(quizz);
      state.quizz = quizz.map(item => {
        return {
          question: item.question,
          answers: item.incorrect_answers.concat(item.correct_answer),
          correct: item.correct_answer,
        }
      });
    }
  },
  actions: {},
  modules: {}
});
