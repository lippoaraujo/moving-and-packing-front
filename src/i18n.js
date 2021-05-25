import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

/*function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}*/

function loadMsgmPtBr(){
  let arq1 = require("@/locales/pt-BR.json");
  let arq2 = require("@/views/estruturaPrincipal/locales/pt-BR.json");
  let arq3 = require("@/modulos/moving/locales/pt-BR.json");
  let arq4 = require("@/modulos/system/locales/pt-BR.json");
  let arqFim = Object.assign(arq1, arq2, arq3, arq4);
  return arqFim;
}

function loadMsgmEs(){
  let arq1 = require("@/locales/es.json");
  let arq2 = require("@/views/estruturaPrincipal/locales/es.json");
  let arq3 = require("@/modulos/moving/locales/es.json");
  let arq4 = require("@/modulos/system/locales/es.json");
  let arqFim = Object.assign(arq1, arq2, arq3, arq4);
  return arqFim;
}

function loadMsgmEn(){
  let arq1 = require("@/locales/en.json");
  let arq2 = require("@/views/estruturaPrincipal/locales/en.json");
  let arq3 = require("@/modulos/moving/locales/en.json");
  let arq4 = require("@/modulos/system/locales/en.json");
  let arqFim = Object.assign(arq1, arq2, arq3, arq4);
  return arqFim;
}


export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  silentFallbackWarn: true,
  //messages: loadLocaleMessages()
  messages: {
    "en" : loadMsgmEn(),
    "es" : loadMsgmEs(),
    "pt-BR" : loadMsgmPtBr(),
  }
    
  
})
