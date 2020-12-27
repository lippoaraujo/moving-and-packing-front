<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12 blue darken-4 accent-3">
              <v-window v-model="step">
                <v-window-item>
                  <v-row>
                    <v-card-text class="white--text mt-2">
                      <h1 class="text-center display-1">Acesso Negado!</h1>

                      <div class="text-center">
                        <!--<v-avatar
                          class="my-3 elevation-12"
                          color="white"
                          size="150"
                        >
                          <img src="@/assets/exclamation-icons-vector.svg" />
                        </v-avatar>-->
                        <img src="@/assets/exclamation-icons-vector.svg" />
                      </div>
                      <h2 class="text-center display-1">401</h2>

                      <h3 class="text-center">
                        A página nao pode ser exibida!
                      </h3>
                    </v-card-text>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    //this.$route.path com o path deixar a msgm dinamica mostrando
    //o caminho que tentou acessar
  }),
  props: {
    source: String,
  },

  beforeCreate: function () {},

  Create: function () {},
  methods: {
    inicializaTela: function () {},
  },
};
//this.$router.push('blog');
</script>
