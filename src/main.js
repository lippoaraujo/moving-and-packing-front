import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import money from 'v-money';



import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";
import i18n from './i18n'

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
Vue.use(money, {precision: 4});