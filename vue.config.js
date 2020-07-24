// const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  // configureWebpack: {
    // plugins: [new VuetifyLoaderPlugin()],
  // },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "lang",
      enableInSFC: true,
    },
  },
};
