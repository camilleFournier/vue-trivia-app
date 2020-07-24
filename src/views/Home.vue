<template>
  <v-container
    fluid
    fill-height
    id="home"
    align="center"
    align-items="center"
    justify="center"
  >
    <v-row>
      <v-col>
        <h1 class="primary--text">{{ $t("home.title") }} !</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>
          {{ $t("home.presentation") }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          class="category selector"
          color="primary"
          :items="categories"
          item-text="name"
          item-value="id"
          v-model="category"
        >
          <template slot="label"><span>{{ $t('home.labelCategory') }}</span></template>
        </v-select>
        <v-select
          class="lang selector"
          color="primary"
          :items="langAvailable"
          item-text="name"
          item-value="id"
          v-model="lang"
        >
          <template slot="label">{{ $t("home.labelLanguage") }}</template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="startQuizz()">{{ $t("home.btnStart") }} !</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { trivia_api } from "../utils/trivia.js";

export default {
  name: "Home",
  data: () => {
    return {
      category: 0,
      lang: { name: "English", id: "en" }
    };
  },
  computed: {
    langAvailable() { return  this.$store.state.langAvailable },
    categories() { return this.$store.state.categoriesDisplayed }
  },
  watch: {
    lang: function(newLang) {
      console.log(newLang);
      this.$store.commit('SET_LANG', newLang);
      this.$i18n.locale = newLang;
      this.$store.dispatch('TRANSLATE_CATEGORIES');
    }
  },
  components: {},
  async beforeMount() {
    this.$store.dispatch('FETCH_CATEGORIES');
  },
  methods: {
    async startQuizz() {
      console.log(this.category);
      this.$store.commit("SET_CATEGORY", this.category);
      this.$router.push("/quizz");
    }
  }
};
</script>

<style>
#home {
  text-align: center;
}
.selector {
  max-width: 30rem !important;
  margin: auto;
  /* margin: auto; */
}
</style>
