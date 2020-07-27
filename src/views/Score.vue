<template>
  <v-container fluid class="score">
    <v-row>
      <v-col>
        <h1 class="primary--text">{{ $t("score.title") }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <strong
          >{{ $tc("score.text", score) }}
          {{ $tc("score.score", score, { score }) }}</strong
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-container>
          <v-row v-for="item in quizz" :key="item.question" justify="start">
            <v-col align-self="center" cols="12" md="9" lg="6">
              <span v-html="item.question"></span>
            </v-col>
            <v-col align-self="center">
              <span
                class="answer"
                :class="{ 'primary--text': item.good_answer }"
                v-html="item.correct"
              ></span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-btn color="primary" @click="resetQuizz()">{{
          $t("score.btnReset")
        }}</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn color="primary" @click="goHome()">{{
          $t("score.btnGoHome")
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Score",
  data: () => {
    return {};
  },
  computed: {
    score() {
      return this.$store.state.score;
    },
    quizz() {
      return this.$store.state.quizz;
    }
  },
  methods: {
    resetQuizz() {
      this.$router.push("/quizz");
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.score {
  text-align: center;
}
.answer {
  color: red;
}
</style>
