<template>
  <div>
    <v-progress-circular v-show="!dataAvailable" class="loading" color="primary" size="64" indeterminate></v-progress-circular>
    <v-container v-show="dataAvailable" fluid id="quizz">
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
          <v-radio
            v-for="item in quizzItem.answers"
            :key="item"
            :label="item"
            :value="item"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-row>
      <v-row>
        <v-btn color="primary" @click="next()">Next</v-btn>
      </v-row>
    </v-container>
  </div>
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
      quizzItem: {},
      answer: "",
      index: 1,
      dataAvailable: false
    };
  },
  components: {},
  async created() {
    this.$store.dispatch("FETCH_QUIZZ").then(() => {
      console.log(this.quizzItem);
      this.quizzItem = this.$store.getters.getNextQuestion(this.index);
      this.index = 1;
      this.dataAvailable = true;
    });
    // this.category = this.$store.getters.getCategory;
    // const quizz = await trivia_api.getQuizz(this.category);
    // this.$store.commit('SET_QUIZZ', quizz);
    // this.quizzItem = this.$store.getters.getNextQuestion(this.index);
    // this.index++
  },

  methods: {
    next() {
      console.log(this.index, this.answer);
      this.$store.commit("SET_ANSWER", {
        index: this.index,
        answer: this.answer
      });
      if (this.index < 10) {
        this.index++;
        this.quizzItem = this.$store.getters.getNextQuestion(this.index);
        this.answer = "";
      } else {
        this.$router.push("/score");
      }
    }
  }
};
</script>

<style>
.loading {
  margin: auto;
  margin-top: 5rem;
  display: flex;
}
</style>
