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
              :title="item.name"
              dark
              @click="redirecionaTela(item.name)"
            >
              <!-- <v-card-title class="headline" v-text="item.title"></v-card-title> -->

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">{{
                    item.name
                  }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-avatar>
                  <v-icon large>
                    {{ item.image }}
                  </v-icon>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>{{
                    item.description
                  }}</v-list-item-subtitle>
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
import { getListModules } from "@/helper/listRoutes.js";
import { getPermissionModule } from "@/helper/getPermission.js";

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
        name: "Sistema",
        description: "Descrição do módulo",
        image: "mdi-shield-home",
      },
      {
        color: "#952175",
        name: "Cadastros",
        description: "Descrição do módulo",
        image: "mdi-account-details",
      },
      {
        color: "#3f6a4e",
        name: "Mudança",
        description: "Descrição do módulo",
        image: "mdi-car-lifted-pickup",
      },
    ],*/
  }),

  Create() {
    //this.incializaTela();
  },

  beforeCreate() {
    /*console.log("aqui1 beforeCreate");
    //let permissoesExecucao = localStorage.getItem("permissoesExecucao");
    console.log(JSON.parse(localStorage.getItem("permissoesExecucao")));

    let token = localStorage.getItem("token");
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
      if (JSON.parse(localStorage.getItem("userAdmin"))) {
        this.items = getListModules();
      } else {
        let listModuleFront = getListModules();
        if (listModuleFront != null) {
          let a = 0;
          let listaInicialModulos = [];
          for (a; a < listModuleFront.length; a++) {
            let moduleFront = listModuleFront[a];

            console.log(moduleFront.name);
            console.log(getPermissionModule(moduleFront.name));

            if (getPermissionModule(moduleFront.name)) {
              listaInicialModulos.push(moduleFront);
            }
          }
          this.items = listaInicialModulos.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
          });
        }
      }
    },
  },
};
</script>