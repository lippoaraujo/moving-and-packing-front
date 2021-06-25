<template>
  <div>
    <v-breadcrumbs :items="getCaminhoBreadCrumb">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    items: [
      /*{
        text: "Home",
        disabled: false,
        href: "/home",
      },
      {
        text: "moving",
        disabled: false,
        href: "/moving",
      },
      {
        text: "customers",
        disabled: true,
      },*/
    ],
  }),
  mounted() {
    //this.incializaTela();
    this.MODIFICAR_CAMINHO_BREAD_CRUMB(this.$route.path.split("/"));
    this.items = this.getCaminhoBreadCrumb;
  },
  methods: {
    ...mapMutations(["MODIFICAR_CAMINHO_BREAD_CRUMB"]),
  },
  computed: {
    //...mapGetters(["statusMenu"]),
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