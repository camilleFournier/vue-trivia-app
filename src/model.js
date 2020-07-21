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
    .catch(error => console.log(error));
}

async function getQuizz(category) {
  return api
    .get("api.php", {
      params: {
        amount: 10,
        type: "multiple",
        encode: "base64",
        category,
      },
    })
    .then((response) => {
      return response.data.results
      .map(item => { return {
        question: atob(item.question),
        incorrect_answers: item.incorrect_answers.map(a => atob(a)),
        correct_answer: atob(item.correct_answer),
      }});
    })
    .catch((error) => console.log(error));
}

export const trivia_api = {
  getCategories: getCategories,
  getQuizz: getQuizz
};
