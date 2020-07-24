<template>
  <v-container>
    <h1 text-color="primary">{{ $t("score.title") }}</h1>
    <p>{{ $tc("score.text", score) }} {{ $tc("score.score", score, { score }) }}</p>
    <div>
      <v-btn color="primary" @click="resetQuizz()">{{ $t("score.btnReset") }}</v-btn>
      <v-btn color="primary" @click="goHome()">{{ $t("score.btnGoHome") }}</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Score",
  data: () => {return {}},
  // beforeMount() {
    // this.score = this.$store.score
  computed: {
    score() {
      return this.$store.state.score;
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
