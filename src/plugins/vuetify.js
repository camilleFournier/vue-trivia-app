import Vue from "vue";
import Vuetify, {
  VContainer,
  VRow,
  VCol,
  VBtn,
  VSelect,
  VRadio,
  VRadioGroup,
  VProgressCircular,
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VContainer,
    VRow,
    VCol,
    VBtn,
    VSelect,
    VRadio,
    VRadioGroup,
    VProgressCircular
  }
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#42b983",
        secondary: "#2c3e50"
      }
    }
  },
});
