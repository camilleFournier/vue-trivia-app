import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../lang/en.json';
import fr from '../lang/fr.json';
Vue.use(VueI18n);

const messages = {
    fr,
    en
};
// Object.assign(messages, en);
console.log(messages);

export default new VueI18n({
    locale: "en",
    messages
});