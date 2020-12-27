<template>
  <v-footer color="blue darken-4" dark app elevation="8">
    <span class="subtitle-1"
      >&copy; {{ new Date().getFullYear() }}{{ strUserLogado }}</span
    >
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    strUserLogado: " - ",
  }),

  created() {
    let userLoged = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    this.strUserLogado =
      " - " +
      userLoged.name +
      " " +
      userLoged.email +
      " " +
      userLoged.usergroup.name;
  },
};
</script>