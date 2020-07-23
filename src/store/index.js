import Vue from "vue";
import Vuex from "vuex";
import { trivia_api } from "../utils/trivia.js";
import { mm_api } from '../utils/my_memory.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: 0,
    quizz: [],
    score: 0,
    lang: 'fr',
    error: false,
    errorMsg: ""
  },
  getters: {
    getNextQuestion: state => index => {
      console.log('getNextQuestion0', state.quizz);
      console.log('getNextQuestion1', state.quizz[index].question);
      const answers = state.quizz[index].incorrect;
      console.log('getNextQuestion2', state.quizz[ index ].question);
      const i = Math.floor(Math.random()*answers.length+1);
      console.log('getNextQuestion3', state.quizz[ index ].question);
      answers.splice(i, 0, state.quizz[index].correct);
      console.log('getNextQuestion4', state.quizz[index]);
      return {
        question: state.quizz[index].question,
        answers
      };
    }
  },
  mutations: {
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_QUIZZ(state, quizz) {
      console.log(quizz);
      state.quizz = quizz;
    },
    //replace quizz item with translation
    REPLACE_QUESTION(state, payload) {
      
      state.quizz[payload.index] = payload.quizzItem;
      console.log('replace_question', state.quizz);
    },
    SET_ANSWER(state, payload) {
      if (state.quizz[payload.index].correct == payload.answer) {
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
            context.commit("SET_QUIZZ", quizz);
            resolve();
          })
          .catch((e) => {
            context.dispatch("CATCH_ERROR", e);
            reject();
          });
      });
    },
    TRANSLATE_QUESTION(context, index) {
      //too many incorrect
      console.log(context.state.quizz[ index ]);
      mm_api.translate(context.state.quizz[index])
        .then(quizzItem => {
          context.commit('REPLACE_QUESTION', { index, quizzItem });
          console.log('translate_question', context.state.quizz)
        })
        .catch((e) => {
          context.dispatch("CATCH_ERROR", e);
          throw new Error();
        });
    },
    GET_QUESTION(context, index) {
      //too many incorrect
      console.log(context.state.quizz[ index ]);
      return new Promise((resolve, reject) => {
        if (context.state.lang != "en") {
          console.log('frecnh');
          context.dispatch("TRANSLATE_QUESTION", index)
            .then(() => {
              console.log('get_question', context.state.quizz);
              resolve(context.getters.getNextQuestion(index))
            })
            .catch(() => reject());
        } else {
          console.log('english')
          resolve(context.getters.getNextQuestion(index));
        }
      })
    }
  },
  modules: {}
});
