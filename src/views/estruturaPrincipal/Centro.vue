<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col>
          <router-view name="routeViewPrincipal"></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: "Centro",
};
</script>
      