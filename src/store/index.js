import Vue from "vue";
import Vuex from "vuex";
import { trivia_api } from "../utils/trivia.js";
import { mm_api } from "../utils/my_memory.js";

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
      { name: "Français", id: "fr" }
    ]
  },
  getters: {
    /**
     * @param {number} index - index of quizzItem requested
     * @returns {Object} quizzItem
     * @returns {String} quizzItem.question - html-encoded string
     * @returns {Array} quizzItem.answers - list of possible answers. The position of the correct one is randomely defined.
     */
    getNextQuestion: state => index => {
      const answers = state.quizz[index].incorrect;
      const i = Math.floor(Math.random() * answers.length + 1);
      answers.splice(i, 0, state.quizz[index].correct);
      return {
        question: state.quizz[index].question,
        answers
      };
    }
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang;
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
    },
    SET_QUIZZ(state, quizz) {
      Vue.set(state, "quizz", quizz);
      Vue.set(state, "score", 0);
    },
    //replace quizz item with translation
    REPLACE_QUESTION(state, payload) {
      Vue.set(state.quizz, payload.index, payload.quizzItem);
    },
    SET_ANSWER(state, payload) {
      if (state.quizz[payload.index].correct == payload.answer) {
        state.score++;
        Object.assign(state.quizz[payload.index], { good_answer: true });
      } else {
        Object.assign(state.quizz[payload.index], { good_answer: false });
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
    /**
     * Trigger the display of an error message for 5s
     * @param {*} context - equivalent to this
     * @param {Error|String} error - Error to display
     */
    CATCH_ERROR(context, error) {
      context.commit("SET_ERROR", error);
      setTimeout(() => {
        context.commit("RESET_ERROR");
      }, 5000);
    },
    /**
     * Fetch new questions with OpenTrivia api
     * @param {*} context - equivalent to this 
     */
    FETCH_QUIZZ(context) {
      return new Promise((resolve, reject) => {
        trivia_api
          .getQuizz(context.state.category)
          .then(quizz => {
            context.commit("SET_QUIZZ", quizz);
            resolve();
          })
          .catch(e => {
            context.dispatch("CATCH_ERROR", e);
            reject();
          });
      });
    },
    /**
     * Fetch categories available from OpenTrivia api
     * @param {*} context - equivalent to this
     */
    FETCH_CATEGORIES(context) {
      return trivia_api
        .getCategories()
        .then(response => {
          context.commit(
            "SET_CATEGORIES",
            [{ id: 0, name: "All" }].concat(response)
          );
        })
        .catch(e => context.dispatch("CATCH_ERROR", e));
    },
    /**
     * Reset the english categories, or fetch the translation from MyMemory API
     * @param {*} context - equivalent to this
     */
    TRANSLATE_CATEGORIES(context) {
      if (context.state.lang == "en") {
        context.commit("SET_CATEGORIES_DISPLAYED", context.state.categories);
        return;
      }
      return mm_api
        .translateCategories(context.state.categories, context.state.lang)
        .then(categories =>
          context.commit("SET_CATEGORIES_DISPLAYED", categories)
        )
        .catch(e => context.dispatch("CATCH_ERROR", e));
    },
    /**
     * Translate the question via MyMemory API. Only called when lang is not english
     * @param {*} context - equivalent to this 
     * @param {*} index - index of question too translate
     */
    TRANSLATE_QUESTION(context, index) {
      return mm_api
        .translateQuestion(context.state.quizz[index], context.state.lang)
        .then(quizzItem => {
          context.commit("REPLACE_QUESTION", { index, quizzItem });
        })
        .catch(e => {
          context.dispatch("CATCH_ERROR", e);
          throw new Error();
        });
    },
    /**
     * Calls 'TRANSLATE_QUESTION if need be, and returns quizzItem;
     * @param {*} context - equivalent to this 
     * @param {number} index - index of question requested
     * @returns see getters.getNextQuuestion()
     */
    GET_QUESTION(context, index) {
      return new Promise((resolve, reject) => {
        if (context.state.lang != "en") {
          context
            .dispatch("TRANSLATE_QUESTION", index)
            .then(() => {
              resolve(context.getters.getNextQuestion(index));
            })
            .catch(() => reject());
        } else {
          resolve(context.getters.getNextQuestion(index));
        }
      });
    }
  },
  modules: {}
});
