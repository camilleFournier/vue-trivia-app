const axios = require("axios");

const api = axios.create({
  baseURL:
    "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host":
      "translated-mymemory---translation-memory.p.rapidapi.com",
    "x-rapidapi-key": process.env.VUE_APP_MM_API_KEY,
    useQueryString: true
  }
});

/**
 * 
 * @param {Object} quizzItem
 * @param {String} quizzItem.question - html-encoded question
 * @param {String} quizzItem.correct - html-encoded correct answer
 * @param {Array} quizzItem.incorrect - html-encoded incorrect answers
 * @returns {Object} quizzItem with translated strings
 */
async function translateQuestion(quizzItem) {
  const q = `${quizzItem.question}|${quizzItem.incorrect.join("|")}|${
    quizzItem.correct
  }`;
  return api
    .get("", {
      params: {
        langpair: "en|fr",
        q
      }
    })
    .then(response => {
      const translation = response.data.responseData.translatedText.split("|");
      return {
        question: translation.shift(),
        correct: translation.pop(),
        incorrect: translation
      };
    });
}

/**
 * 
 * @param {Array} categories - array of categories available {id, name}
 * @param {String} lang - code of language to translate into (ex: en for english, fr for french) 
 * @returns {Array} categories available translated
 */
async function translateCategories(categories, lang) {
  return api
    .get("", {
      params: {
        langpair: `en|${lang}`,
        q: categories.map(cat => cat.name).join("|")
      }
    })
    .then(response => {
      const translation = response.data.responseData.translatedText.split("|");
      return categories.map((cat, index) => {
        return { id: cat.id, name: translation[index] };
      });
    });
}

export const mm_api = {
  translateQuestion: translateQuestion,
  translateCategories: translateCategories
};
