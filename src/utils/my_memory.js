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
