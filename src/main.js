import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/vuetify-money";
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  /*styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],*/
};

Vue.use(VueHtmlToPaper, options);

import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";
import i18n from './i18n';

import VueSignature from "vue-signature";
Vue.use(VueSignature);

Vue.config.productionTip = false;

new Vue({
  router,
  store,  
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount("#app");

Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});
//Vue.use(money, {precision: 4});