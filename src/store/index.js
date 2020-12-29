import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex, VuexPersistence);

export default new Vuex.Store({
  storage: window.localStorage,
  state: {
    statusMenu: false,
    exibicaoMenu: false,
    caminhosBreadcrumbs: []
  },
  getters: {
    statusMenu: (valor) => {
      return valor.statusMenu;
    },
    exibicaoMenu: (valor) => {
      return valor.exibicaoMenu;
    },
    caminhosBreadcrumbs: (valor) =>{
      return valor.caminhosBreadcrumbs;
    }
  },
  mutations: {
    MODIFICAR_EXIBICAO_MENU: (state, statusMenuEntrada) => {
      state.statusMenu = statusMenuEntrada;
    },
    MODIFICAR_EXIBICAO_BOTAO_MENU: (state, exibicaoMenuEntrada) => {
      state.exibicaoMenu = exibicaoMenuEntrada;
    },
    MODIFICAR_CAMINHO_BREAD_CRUMB: (state, caminhosBreadcrumbs) => {
      //console.log("MODIFICAR_CAMINHO_BREAD_CRUMB")
      //console.log(caminhosBreadcrumbs);
      let listReturn=[];
      let objItemHome = {
        text: "home",
        disabled: false,
        href: "/#/home",
      };
      listReturn.push(objItemHome);
      
      for (let i = 0; i < caminhosBreadcrumbs.length; i++) {
        if (caminhosBreadcrumbs[i].length > 0) {
          var objItem = null;

          if (i + 1 == caminhosBreadcrumbs.length) {
            objItem = {
              text: caminhosBreadcrumbs[i],
              disabled: true,
              href: "/#/" + caminhosBreadcrumbs[i],
            };
          } else {
            objItem = {
              text: caminhosBreadcrumbs[i],
              href: "/#/" + caminhosBreadcrumbs[i],
            };
          }
          //console.log(caminhosBreadcrumbs[i]);
          listReturn.push(objItem);
        }
      }
      state.caminhosBreadcrumbs = listReturn;
    },
  },
  actions: {},
  modules: {},
  plugins: [new VuexPersistence().plugin]
});
