<template>
  <v-container>
    <h1 text-color="primary">Score</h1>
    <p>Congratulations ! You achieved a score of {{ score }}</p>
    <div>
      <v-btn color="primary" @click="resetQuizz()">Try again</v-btn>
      <v-btn color="primary" @click="goHome()">Change settings</v-btn>
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
