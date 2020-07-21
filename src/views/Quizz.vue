<template>
    <v-container fluid fill-height id="quizz" align="center" align-items="center" justify="center">
      <v-row>
        <v-col>
          <h1 class="primary--text">Quizz!</h1>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
// import { trivia_api } from "../model.js";

export default {
  name: "Quizz",
  data: () => {
    return {
      category: null,
      questions: [],
    };
  },
  components: {},
  beforeMount() {
      this.category = this.$store.getters.getCategory;
      console.log(this.category);
  },
  
  methods: {
    
  }
};
</script>

<style>
#home {
  text-align: center;
}
.category-selector {
  max-width: 30rem!important;
  margin: auto;
  /* margin: auto; */
}
</style>
