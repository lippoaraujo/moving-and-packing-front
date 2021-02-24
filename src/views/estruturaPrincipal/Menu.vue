<template>
  <v-navigation-drawer
    color="green darken-4"
    dark
    v-model="getEstadoMenu"
    app
    clipped
    :mini-variant="mini"
    stateless
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ this.objModulo.nameExibicao }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ this.objModulo.description }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        link
        style="cursor: pointer"
        :to="item.url"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.nameExibicao }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Grupo de Usuarios</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Permissões</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>
<script>
/*
import {
  getMenusModulo,
  getModulo,
} from "@/helper/getModulosRotasActionsUserLogado.js";*/

import { getListMenuModule, getListModules } from "@/helper/listRoutes.js";
import { getPermissionMenu } from "@/helper/getPermission.js";

export default {
  name: "Menu",
  data() {
    return {
      objModulo: null,
      items: [
        /*{
          nameExibicao: "Sistema",
          icon: "mdi-shield-home",
        },*/
      ],
    };
  },

  mounted() {},

  created() {
    this.getModuloDoMenu();
    this.incializaTela();
  },

  methods: {
    getModuloDoMenu: function () {
      let arrayNameModulo = this.$route.path.split("/");
      let nameModuleRoute = arrayNameModulo[1];
      let listModule = getListModules();

      let a = 0;
      for (a; a < listModule.length; a++) {
        let objModu = listModule[a];
        if (objModu.name === nameModuleRoute) {
          this.objModulo = objModu;
          break;
        }
      }
    },

    incializaTela: function () {
      if (JSON.parse(sessionStorage.getItem("userAdmin"))) {
        this.items = getListMenuModule(this.$route.path);
      } else {
        let listMenuFront = getListMenuModule(this.$route.path);
        if (listMenuFront != null) {
          let a = 0;
          let listaInicialMenu = [];
          for (a; a < listMenuFront.length; a++) {
            let menuFront = listMenuFront[a];
            if (getPermissionMenu(menuFront.name)) {
              listaInicialMenu.push(menuFront);
            }
          }
          this.items = listaInicialMenu.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
          });
        }
      }
    },
  },

  computed: {
    mini() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        case "sm":
          return true;
        case "md":
          return true;
        case "lg":
          return false;
        case "xl":
          return false;
        default:
          return true;
      }
    },

    //...mapState(["statusMenu"]),
    getEstadoMenu: {
      get() {
        return this.$store.state.statusMenu;
      },
      set(value) {
        this.$store.commit("MODIFICAR_EXIBICAO_MENU", value);
      },
    },
  },
};
</script>