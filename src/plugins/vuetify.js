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
  VProgressLinear,
  VDialog
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
    VProgressCircular,
    VProgressLinear,
    VDialog
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
  }
});
