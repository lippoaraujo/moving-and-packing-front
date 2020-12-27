<template>
  <v-app>
    <Topo />
    <Centro />
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "InicioEstrutura",
  components: {
    Topo: () => import("@/views/estruturaPrincipal/Topo"),
    Centro: () => import("@/views/estruturaPrincipal/Centro"),
    Footer: () => import("@/views/estruturaPrincipal/Footer"),
  },
};
</script>