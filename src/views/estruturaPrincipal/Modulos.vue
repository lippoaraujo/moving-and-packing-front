<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="6" md="4">
        <!--<v-col v-for="(item, i) in items" :key="i" cols="6">-->
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :color="item.color"
              :elevation="hover ? 20 : 6"
              class="mx-auto"
              style="cursor: pointer"
              :title="item.title"
              dark
              @click="redirecionaTela(item.title)"
            >
              <!-- <v-card-title class="headline" v-text="item.title"></v-card-title> -->

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-avatar>
                  <v-icon large>
                    {{ item.icone }}
                  </v-icon>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ item.artist }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!--<v-card-title>
                <v-icon large left>
                  {{ item.icone }}
                </v-icon>
                <span class="title font-weight-light">{{ item.title }}</span>
              </v-card-title>

              <v-card-subtitle
                style="pading-top: 10px"
                v-text="item.artist"
              ></v-card-subtitle> -->

              <!--<v-avatar class="ma-3" size="80" tile>
                <v-icon large color="darken-2" v-text="item.icone"></v-icon>
              </v-avatar> -->
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { getModulosUser } from "@/helper/getModulosRotasActionsUserLogado.js";

export default {
  name: "Modulos",

  props: {
    source: String,
  },
  data: () => ({
    overlay: false,
    items: [],
    /*items: [
      {
        color: "#1F7087",
        title: "Sistema",
        artist: "Descrição do módulo",
        icone: "mdi-shield-home",
      },
      {
        color: "#952175",
        title: "Cadastros",
        artist: "Descrição do módulo",
        icone: "mdi-account-details",
      },
      {
        color: "#3f6a4e",
        title: "Mudança",
        artist: "Descrição do módulo",
        icone: "mdi-car-lifted-pickup",
      },
    ],*/
  }),

  Create() {
    //this.incializaTela();
  },

  beforeCreate() {
    /*console.log("aqui1 beforeCreate");
    //let permissoesExecucao = sessionStorage.getItem("permissoesExecucao");
    console.log(JSON.parse(sessionStorage.getItem("permissoesExecucao")));

    let token = sessionStorage.getItem("token");
    console.log(token);

    console.log("aqui2 beforeCreate");*/
    //this.incializaTela();
  },

  mounted() {
    this.incializaTela();
  },

  methods: {
    redirecionaTela: function (nomeModulo) {
      this.$router.push("/" + nomeModulo);
    },

    incializaTela: function () {
      var listaDeModulos = getModulosUser();

      if (listaDeModulos != null) {
        var i;
        for (i = 0; i < listaDeModulos.length; i++) {
          var objModulo = listaDeModulos[i];
          let objItem = {
            color: objModulo.color,
            title: objModulo.name,
            artist: objModulo.description,
            icone: objModulo.image,
          };
          this.items.push(objItem);
        }
      }
      //console.log(this.items);
    },
  },
};
</script>