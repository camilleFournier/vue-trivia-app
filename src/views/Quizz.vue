<template>
  <v-container fluid id="quizz">
    <v-row>
      <h1 class="primary--text">Quizz</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-progress-linear color="primary" height="30" :value="index*10">
          <h3>{{ $t("quizz.title", { index }) }}</h3>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-progress-circular class="loading" indeterminate color="primary" size="48" v-show="!dataAvailable"></v-progress-circular>
        <v-container v-show="dataAvailable" fluid>
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
        </v-container>
      </v-col>
      <v-col>
        <v-progress-circular color="primary" size="48" rotate="-90" :value="100-countdown*10">
          <span>{{ countdown }}</span>
        </v-progress-circular>
      </v-col>
    </v-row>
    <v-row>
      <v-btn color="primary" @click="submit()">{{ $t("quizz.btnNext")}}</v-btn>
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "Quizz",
  data: () => {
    return {
      category: null,
      quizzItem: {},
      answer: "",
      index: 1,
      dataAvailable: false,
      countdown: 0,
      willCountdown: null
    };
  },
  watch: {
    countdown: function(newCountdown) {
      if (newCountdown > 0) {
        this.willCountdown = setTimeout(() => this.countdown--, 1000);
      } else {
        this.submit();
      }
    },
    quizzItem: function() {
      console.log("new quizzItem");
      this.dataAvailable = true;
      this.answer = "";
      this.countdown = 10;
    }
  },
  components: {},
  async created() {
    this.$store.dispatch("FETCH_QUIZZ")
      .then(() => {
        this.next();
    });
  },

  methods: {
    submit() {
      this.$store.commit("SET_ANSWER", {
        index: this.index-1,
        answer: this.answer
      });
      clearTimeout(this.willCountdown);
      this.index++;
      this.next();
    },
    async next() {
      if (this.index <= 10) {
        this.dataAvailable = false;
        this.$store.dispatch('GET_QUESTION', this.index-1)
          .then(quizzItem => {
            this.quizzItem = quizzItem;
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
