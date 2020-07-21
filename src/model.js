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

export const trivia_api = {
  getCategories: getCategories
};
