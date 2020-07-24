import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";

Vue.config.productionTip = false;
// Vue.config.lang = 'en';

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
  i18n,
}).$mount("#app");
