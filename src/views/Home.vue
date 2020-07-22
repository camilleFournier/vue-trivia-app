<template>
  <!-- <div id="home"> -->
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
        <h1 class="primary--text">Welcome !</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="secondary--text">
          This game is a Trivia quizz. To play, select a category (or not) and
          press start. You will have to answer 10 questions.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          class="category-selector"
          color="primary"
          :items="categories"
          label="Category"
          item-text="name"
          item-value="id"
          v-model="category"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="startQuizz()">Start !</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { trivia_api } from "../utils/trivia.js";

export default {
  name: "Home",
  data: () => {
    return {
      categories: [],
      category: 0
    };
  },
  components: {},
  async beforeMount() {
    trivia_api
      .getCategories()
      .then(response => {
        this.categories = [{ id: 0, name: "All" }].concat(response);
      })
      .catch(e => {
        console.log(e);
        this.$store.dispatch('CATCH_ERROR', e.message);
      })
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
.category-selector {
  max-width: 30rem !important;
  margin: auto;
  /* margin: auto; */
}
</style>
