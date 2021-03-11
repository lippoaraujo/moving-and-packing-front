<template>
  <v-app-bar color="blue darken-4" dark app clipped-left>
    <!--<v-app-bar-nav-icon
      @click.stop="exibicaoMenu = !exibicaoMenu"
    ></v-app-bar-nav-icon> -->
    <v-app-bar-nav-icon
      v-show="getExibicaoMenu"
      @click="meuClik"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ nomeApp }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn title="Logout" text @click="logout">
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>

  <!--
  <v-app-bar app dark class="indigo">
    <v-toolbar-title class="headline text-uppercase">
      <span>Vuetify &nbsp;</span>
      <span class="font-weight-light">MATERIAL DESIGN</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
      <span class="mr-2">Latest Release</span>
    </v-btn>
  </v-app-bar> 
  -->
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Topo",
  data: () => ({
    nomeApp: "",
    statusMenu: false,
    ocultaMenu: false,
  }),
  computed: {
    //...mapGetters(["statusMenu"]),
    getEstadoMenu: {
      get() {
        return this.$store.state.statusMenu;
      },
      set(value) {
        this.$store.commit("MODIFICAR_EXIBICAO_MENU", value);
      },
    },

    getExibicaoMenu: {
      get() {
        return this.$store.state.exibicaoMenu;
      },
      set(value) {
        this.$store.commit("MODIFICAR_EXIBICAO_BOTAO_MENU", value);
      },
    },
  },
  created() {
    this.nomeApp = process.env.VUE_APP_NAME_APLICATION;
    //console.log(process.env);
    //console.log("aquiTopo");
    //console.log(this.nomeApp);
    //console.log("aquiTopo");
    //console.log("created");
    //console.log(this.$route.path);
    if (this.$route.path != "/home") {
      this.MODIFICAR_EXIBICAO_BOTAO_MENU(true);
      this.getExibicaoMenu = true;
    }
  },

  mounted() {
    //console.log("mont");
    //console.log(this.$route.path);
    if (this.$route.path != "/home") {
      this.MODIFICAR_EXIBICAO_BOTAO_MENU(true);
      this.getExibicaoMenu = true;
      this.getEstadoMenu = true;
    }
  },

  methods: {
    // Add this:
    ...mapMutations([
      "MODIFICAR_EXIBICAO_MENU",
      "MODIFICAR_EXIBICAO_BOTAO_MENU",
    ]),

    meuClik: function () {
      if (this.$route.path != "/home") {
        //console.log("modulos");
        //console.log(this.$route);

        //console.log("statusAtualMenu " + this.getEstadoMenu);
        if (!this.getEstadoMenu) {
          this.MODIFICAR_EXIBICAO_MENU(true);
        } else {
          this.MODIFICAR_EXIBICAO_MENU(false);
        }

        //var status = (this.statusMenu = !this.statusMenu);
        //console.log("status :" + status);

        //console.log("getStatus :" + this.getEstadoMenu);

        //this.getEstadoMenu = true;
        //console.log("getStatus DEPOIS :" + this.getEstadoMenu);

        //@meuClik="statusMenu = !statusMenu"
        //this.getEstadoMenu((this.statusMenu = !this.statusMenu));
        //this.MODIFICAR_EXIBICAO_MENU(status);
      }
    },

    logout: function () {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
