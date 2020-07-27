<template v-on:keydown.enter="submit()">
  <v-container fluid id="quizz">
    <v-row>
      <h1 class="primary--text quizz-title">{{ $t("quizz.title") }}</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-progress-linear
          color="primary"
          height="30"
          :value="(index - 1) * 10"
        >
          <h3>{{ $t("quizz.subtitle", { index }) }}</h3>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        order-sm="last"
        md="5"
        sm="4"
        align-self="center"
        class="countdown-col"
      >
        <v-progress-circular
          class="countdown"
          color="primary"
          :size="countdownSize"
          :width="countdownWidth"
          rotate="-90"
          :value="100 - countdown * 10"
        >
          <h4>{{ countdown }}</h4>
        </v-progress-circular>
      </v-col>
      <v-col align-self="center" class="quizz-question">
        <v-progress-circular
          class="loading"
          indeterminate
          color="primary"
          size="48"
          v-show="!dataAvailable"
        ></v-progress-circular>
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
    </v-row>
    <v-row justify="end">
      <v-col class="btn-next">
        <v-btn color="primary" @click="submit()">{{
          $t("quizz.btnNext")
        }}</v-btn>
      </v-col>
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
      this.dataAvailable = true;
      this.answer = "";
      //prevent behavior of countdown frozen when next is pressed too quickly
      if (this.countdown == 10) {
        this.willCountdown = setTimeout(() => this.countdown--, 1000);
      } else {
        this.countdown = 10;
      }
    }
  },
  computed: {
    countdownSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
        case "lg":
        case "md":
          return 120;
        case "sm":
          return 60;
        case "xs":
          return 48;
        default:
          return 48;
      }
    },
    countdownWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
        case "lg":
        case "md":
          return 20;
        case "sm":
          return 10;
        case "xs":
          return 8;
        default:
          return 8;
      }
    }
  },
  components: {},
  async created() {
    this.$store.dispatch("FETCH_QUIZZ").then(() => {
      this.next();
    });
  },

  methods: {
    submit() {
      this.$store.commit("SET_ANSWER", {
        index: this.index - 1,
        answer: this.answer
      });
      clearTimeout(this.willCountdown);
      this.index++;
      this.next();
    },
    async next() {
      if (this.index <= 10) {
        this.dataAvailable = false;
        this.$store.dispatch("GET_QUESTION", this.index - 1).then(quizzItem => {
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
.quizz-title {
  margin: auto;
  margin-bottom: 2rem;
}
.quizz-question {
  min-height: 20rem;
}
.countdown-col {
  /* to make margin: auto work */
  display: flex;
}
.countdown {
  margin: auto;
  text-align: center;
  font-size: larger;
}
.btn-next {
  text-align: center;
}
.loading {
  margin: auto;
  margin-top: 5rem;
  display: flex;
}
</style>
