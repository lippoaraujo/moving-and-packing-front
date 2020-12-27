<template>
  <v-app>
    <Topo />
    <Menu />

    <v-main>
      <v-container fluid>
        <Breadcrumbs />
        <v-fade-transition>
          <router-view name="routeViewMoving"></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "dashboard",
  components: {
    Topo: () => import("@/views/estruturaPrincipal/Topo"),
    Menu: () => import("@/views/estruturaPrincipal/Menu"),
    Footer: () => import("@/views/estruturaPrincipal/Footer"),
    Breadcrumbs: () => import("@/views/estruturaPrincipal/Breadcrumbs"),
  },

  mounted() {
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    this.getEstadoMenu = true;

    window.onpopstate = () => {
      location.reload();
    };
  },

  created() {
    console.log("created dashboard");
  },

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
    getCaminhoBreadCrumb: {
      get() {
        return this.$store.state.caminhosBreadcrumbs;
      },
      set(value) {
        this.$store.commit("MODIFICAR_CAMINHO_BREAD_CRUMB", value);
      },
    },
  },
};
</script>