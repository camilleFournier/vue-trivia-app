import Vue from "vue";
import Vuex from "vuex";
import { trivia_api } from "../utils/trivia.js";
import { mm_api } from '../utils/my_memory.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: 0,
    lang: "en",
    quizz: [],
    score: 0,
    error: false,
    errorMsg: "",
    categories: [],
    categoriesDisplayed: [],
    langAvailable: [
      { name: "English", id: "en" },
      { name: "Français", id: "fr" },
    ],
  },
  getters: {
    getNextQuestion: (state) => (index) => {
      const answers = state.quizz[index].incorrect;
      const i = Math.floor(Math.random() * answers.length + 1);
      answers.splice(i, 0, state.quizz[index].correct);
      return {
        question: state.quizz[index].question,
        answers,
      };
    },
  },
  mutations: {
    SET_LANG(state, lang) {
      console.log(lang);
      state.lang = lang;
      console.log(state.lang);
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_CATEGORIES(state, categories) {
      Vue.set(state, "categories", categories);
      Vue.set(state, "categoriesDisplayed", categories);
    },
    SET_CATEGORIES_DISPLAYED(state, categories) {
      Vue.set(state, "categoriesDisplayed", categories);
      console.log(state.categoriesDisplayed);
    },
    SET_QUIZZ(state, quizz) {
      console.log("set_quizz", quizz);
      Vue.set(state, "quizz", quizz);
    },
    //replace quizz item with translation
    REPLACE_QUESTION(state, payload) {
      // this is to make the change reactive
      Vue.set(state.quizz, payload.index, payload.quizzItem);
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
    },
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
          .then((quizz) => {
            context.commit("SET_QUIZZ", quizz);
            resolve();
          })
          .catch((e) => {
            context.dispatch("CATCH_ERROR", e);
            reject();
          });
      });
    },
    FETCH_CATEGORIES(context) {
      return trivia_api
        .getCategories()
        .then((response) => {
          context.commit(
            "SET_CATEGORIES",
            [{ id: 0, name: "All" }].concat(response)
          );
        })
        .catch((e) => context.dispatch("CATCH_ERROR", e));
    },
    TRANSLATE_CATEGORIES(context) {
      return mm_api
        .translateCategories(context.state.categories)
        .then((categories) => context.commit("SET_CATEGORIES_DISPLAYED", categories));
    },
    TRANSLATE_QUESTION(context, index) {
      return mm_api
        .translateQuestion(context.state.quizz[index])
        .then((quizzItem) => {
          context.commit("REPLACE_QUESTION", { index, quizzItem });
        })
        .catch((e) => {
          context.dispatch("CATCH_ERROR", e);
          throw new Error();
        });
    },
    GET_QUESTION(context, index) {
      return new Promise((resolve, reject) => {
        console.log(context.state.lang);
        if (context.state.lang != "en") {
          console.log("french");
          context
            .dispatch("TRANSLATE_QUESTION", index)
            .then(() => {
              console.log("get_question", context.state.quizz[0]);
              resolve(context.getters.getNextQuestion(index));
            })
            .catch(() => reject());
        } else {
          console.log("english");
          resolve(context.getters.getNextQuestion(index));
        }
      });
    },
  },
  modules: {},
});
