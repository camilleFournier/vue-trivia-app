<template>
  <v-app>
    <v-snackbar :value="error" color="#F44336" top
      >{{ $t("error") }}: {{ msg }}</v-snackbar
    >
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {};
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    msg() {
      return this.$store.state.errorMsg;
    }
  },

  components: {}
};
</script>
