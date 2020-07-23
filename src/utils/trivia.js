const axios = require("axios");

const api = axios.create({
  baseURL: "https://opentdb.com"
});

async function getCategories() {
  return api
    .get("/api_category.php")
    .then(response => {
      return response.data.trivia_categories;
    })
}

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
          console.log(response.data.results);
          return response.data.results.map(item => {
            console.log(item.incorrect_answers);
            return {
              question: item.question,
              correct: item.correct_answer,
              incorrect: item.incorrect_answers,
            };
          });
        case 1:
          throw new Error('Not enough questions available');
        case 2:
          throw new Error('Invalid parameters');
        default:
          throw new Error('Token error');

      }
      
    })
}

export const trivia_api = {
  getCategories: getCategories,
  getQuizz: getQuizz
};
