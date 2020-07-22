<template>
  <v-app>
    <v-snackbar :value="error" color="#F44336" top>Something went wrong: {{ msg }}</v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data: () => {
    return {
    };
  },
  computed: {
    error() { return this.$store.state.error; },
    msg() { return this.$store.state.errorMsg; }
  },

  components: {
    // HelloWorld
  }
};
</script>

<style scoped>
  .error {
    /* position: absolute; */
    /* top: 1rem; */
    /* margin: auto; */
    
  }
</style>