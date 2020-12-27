<template>
  <v-fade-transition>
    <router-view />
  </v-fade-transition>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    //HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
.v-breadcrumbs {
  padding: 0px !important;
}
* {
  text-transform: none !important;
}

.v-text-field > .v-input__control > .v-input__slot {
  cursor: pointer !important;
}
.v-autocomplete.v-input > .v-input__control > .v-input__slot input {
  cursor: pointer;
}
/*retira margem da partde de baixo dos impouts pra diminuir espaçamento*/
.v-text-field__details {
  margin-bottom: 0px !important;
}
</style>

