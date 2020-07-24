<template>
  <div>
    <v-progress-circular v-show="!dataAvailable" class="loading" color="primary" size="64" indeterminate></v-progress-circular>
    <v-container v-show="dataAvailable" fluid id="quizz">
      <v-row>
        <v-col>
          <h1 class="primary--text">{{ $t("quizz.title", { index }) }}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 v-html="quizzItem.question"></h3>
        </v-col>
      </v-row>
      <v-row>
        <v-radio-group v-model="answer" column>
          <v-radio
            v-for="item in quizzItem.answers"
            :key="item"
            :value="item"
            color="primary"
          >
            <template slot="label"><span v-html="item"></span></template>
          </v-radio>
        </v-radio-group>
      </v-row>
      <v-row>
        <v-btn color="primary" @click="submit()">{{ $t("quizz.btnNext")}}</v-btn>
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
    this.$store.dispatch("FETCH_QUIZZ")
      .then(() => {
        this.next();
      // this.quizzItem = this.$store.getters.getNextQuestion(this.index);
      // this.index = 1;
      // this.dataAvailable = true;
    });
  },

  methods: {
    submit() {
      this.$store.commit("SET_ANSWER", {
        index: this.index-1,
        answer: this.answer
      });
      this.index++;
      this.next();
    },
    async next() {
      if (this.index < 10) {
        this.dataAvailable = false;
        this.$store.dispatch('GET_QUESTION', this.index-1)
          .then(quizzItem => {
            this.quizzItem = quizzItem;
            this.answer = "";
            this.dataAvailable = true;
          });
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
