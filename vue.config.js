module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  //publicPath: "/testeVue/",
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pages: {
    index: {      
      entry: 'src/main.js',
      title: 'Moving and Packing'
    }
  },

}
