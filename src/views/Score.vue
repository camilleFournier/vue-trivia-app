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
    data: () => {
        return {
            score: 0,
        }
    },
    beforeMount() {
        this.score = this.$store.getters.getScore();
    },
    methods: {
        resetQuizz() {
            this.$router.push('/quizz');
        },
        goHome() {
            this.$router.push('/');
        }
    }

}
</script>