<template>
    <v-container fluid id="quizz">
        <v-row>
            <v-col>
            <h1 class="primary--text">Question {{ index }}</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3 class="secondary--text">{{ quizzItem.question }}</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-radio-group v-model="answer" column>
                <v-radio v-for="item in quizzItem.answers" :key="item" :label="item" :value="item" color="primary"></v-radio>
            </v-radio-group>
        </v-row>
        <v-row>
            <v-btn color="primary" @click="next()">Next</v-btn>
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { trivia_api } from "../model.js";

export default {
  name: "Quizz",
  data: () => {
    return {
      category: null,
      quizzItem: {},
      answer: "",
      index: 0
    };
  },
  components: {},
  async beforeMount() {
      this.category = this.$store.getters.getCategory;
      const quizz = await trivia_api.getQuizz(this.category);
      this.$store.commit('SET_QUIZZ', quizz);
      this.quizzItem = this.$store.getters.getNextQuestion(this.index);
      this.index++
  },
  
  methods: {
    next() {
        // console.log(this.index);
        if (this.index < 10) {
            this.quizzItem = this.$store.getters.getNextQuestion(this.index);
            this.index++;
        } else {
            this.$router.push('/score');
        }
    }
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
