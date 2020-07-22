import Vue from "vue";
import Vuex from "vuex";
import { trivia_api } from "../utils/trivia.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: 0,
    quizz: [],
    score: 0,
    error: false,
    errorMsg: ""
  },
  getters: {
    getNextQuestion: state => index => {
      const answers = state.quizz[index - 1].incorrect;
      const i = Math.floor(Math.random()*answers.length+1);
      console.log(i);
      answers.splice(i, 0, state.quizz[index-1].correct);
      return {
        question: state.quizz[index - 1].question,
        answers
      };
    }
  },
  mutations: {
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_QUIZZ(state, quizz) {
      state.quizz = quizz;
    },
    SET_ANSWER(state, payload) {
      if (state.quizz[payload.index - 1].correct == payload.answer) {
        state.score++;
      }
    },
    SET_ERROR(state, error) {
      state.error = true;
      state.errorMsg = error;
    },
    RESET_ERROR(state) {
      state.error = false;
      state.errorMsg = "";
    }
  },
  actions: {
    CATCH_ERROR(context, error) {
      context.commit("SET_ERROR", error);
      setTimeout(() => {
        context.commit("RESET_ERROR");
      }, 5000);
    },
    FETCH_QUIZZ(context) {
      return new Promise((resolve, reject) => {
        trivia_api
          .getQuizz(context.state.category)
          .then(quizz => {
            console.log(quizz);
            context.commit("SET_QUIZZ", quizz);
            resolve();
          })
          .catch((e) => {
            context.dispatch("CATCH_ERROR", e);
            reject();
          });
      });
    }
  },
  modules: {}
});
