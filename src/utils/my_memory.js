const axios = require("axios");

const api = axios.create({
    baseURL: "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
    headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "translated-mymemory---translation-memory.p.rapidapi.com",
        "x-rapidapi-key": "19af3c0aa3mshfe439abbf55e681p1cccecjsnb355b2253668",
        "useQueryString": true
    }
});

async function translate(quizzItem) {
    //too many incorrect
    const q = `${quizzItem.question}|${quizzItem.incorrect.join("|")}|${quizzItem.correct}`;
    console.log(quizzItem);
    return api
        .get('', {
            params: {
                langpair: "en|fr",
                q
            }
        })
        .then(response => {
            console.log(response.data.responseData.translatedText);
            const translation = response.data.responseData.translatedText.split("|");
            return {
                question: translation.shift(),
                correct: translation.pop(),
                incorrect: translation,
            };
        })
}

export const mm_api = {
    translate: translate 
};