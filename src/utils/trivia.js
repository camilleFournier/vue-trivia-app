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
        encode: "base64",
        category
      }
    })
    .then(response => {
      switch (response.data.response_code) {
        case 0:
          return response.data.results.map(item => {
            return {
              question: atob(item.question),
              incorrect: item.incorrect_answers.map(a => atob(a)),
              correct: atob(item.correct_answer)
            };
          });
        case 1:
          throw new Error('Not enough questions available');
        case 2:
          throw new Error('Invalid parameters');
        default:
          console.log(3);
          throw new Error('Token error');

      }
      
    })
}

export const trivia_api = {
  getCategories: getCategories,
  getQuizz: getQuizz
};
