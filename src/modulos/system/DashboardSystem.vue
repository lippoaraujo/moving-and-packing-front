<template>
  <v-app>
    <Topo />
    <Menu />
    <v-main>
      <v-container fluid>
        <Breadcrumbs />
        <v-fade-transition>
          <router-view name="routeViewSystem"></router-view>
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
};
</script>