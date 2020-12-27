<template>
  <v-navigation-drawer
    color="blue darken-4"
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
          {{ this.objModulo.name }}
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
        :to="item.caminhoLink"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.nomeMenu }}</v-list-item-title>
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
import {
  getMenusModulo,
  getModulo,
} from "@/helper/getModulosRotasActionsUserLogado.js";
export default {
  name: "Menu",
  data() {
    return {
      objModulo: getModulo(this.$route.path),
      items: [
        /*{
          name: "Sistema",
          icon: "mdi-shield-home",
        },*/
      ],
    };
  },

  mounted() {},

  created() {
    this.incializaTela();
  },

  methods: {
    incializaTela: function () {
      let listaDeMenus = getMenusModulo(this.$route.path);
      console.log("menu incializaTela: " + listaDeMenus.length);
      if (listaDeMenus.length > 0) {
        let i;
        for (i = 0; i < listaDeMenus.length; i++) {
          let objMenu = listaDeMenus[i];
          let objItem = {
            nomeMenu: objMenu.name,
            icon: objMenu.image,
            caminhoLink: "/" + this.objModulo.name + "/" + objMenu.name,
          };
          this.items.push(objItem);
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