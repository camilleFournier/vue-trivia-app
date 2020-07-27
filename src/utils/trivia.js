const axios = require("axios");

const api = axios.create({
  baseURL: "https://opentdb.com"
});

/**
 * @returns {Array} - all categories available with { name, id }
 */

async function getCategories() {
  return api.get("/api_category.php").then(response => {
    return response.data.trivia_categories;
  });
}
/**
 * 
 * @param {string} category - category of the quizz
 * @returns {Array} - Array of 10 quizzItems 
 * @quizzItem {
 *    question: html-coded string representing the question,
 *    correct: html-coded string representing the correct answer
 *    incorrect: [html-coded string] incorrect answers
 * } 
 */
async function getQuizz(category) {
  return api
    .get("api.php", {
      params: {
        amount: 10,
        type: "multiple",
        category
      }
    })
    .then(response => {
      switch (response.data.response_code) {
        case 0:
          return response.data.results.map(item => {
            return {
              question: item.question,
              correct: item.correct_answer,
              incorrect: item.incorrect_answers
            };
          });
        case 1:
          throw new Error("Not enough questions available");
        case 2:
          throw new Error("Invalid parameters");
        default:
          throw new Error("Token error");
      }
    });
}

export const trivia_api = {
  getCategories: getCategories,
  getQuizz: getQuizz
};
