<template>
  <v-row justify="center">
    <v-dialog
      v-model="getValorAbrirJanela"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="blue darken-4">
          <v-btn icon dark v-on:click="closeModal(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Adicionar itens ao cômodo</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!--<v-btn dark text v-on:click="closeModal(false)">
              Save
              <v-icon right dark>mdi-content-save</v-icon>
            </v-btn>-->
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-container fluid>
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col xs="12" sm="12" md="10" lg="10" xl="10">
                  <v-autocomplete
                    :items="listaItem"
                    item-text="name"
                    item-value="id"
                    label="Item"
                    solo
                    outlined
                    return-object
                    background-color="white--text"
                    v-model="objForm.item"
                    :rules="regrasAddItem"
                  ></v-autocomplete>
                </v-col>

                <v-col xs="12" sm="12" md="2" lg="2" xl="2">
                  <v-text-field
                    v-model="objForm.quantity"
                    label="Quantidade do item"
                    outlined
                    required="true"
                    :rules="[(v) => !!v || 'Quantidade is required']"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    class="pa-0 ma-0"
                    auto-grow
                    hide-details="true"
                    outlined
                    label="Observação do item"
                    v-model="objForm.itemObs"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <center>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          dark
                          rounded
                          color="blue darken-2"
                          class="mr-4"
                          @click.native="addItemAoComodo()"
                        >
                          Adicionar item
                          <v-icon right dark>mdi-scatter-plot</v-icon>
                        </v-btn>
                      </template>

                      <span>Adicioanr item ao cômodo</span>
                    </v-tooltip>
                  </center>
                </v-col>
              </v-row>
            </v-form>
            <p class="subtitle-1 ma-auto">Itens existentes no comodo</p>
            <v-row>
              <v-col
                class="ma-auto overflow-y-auto elevation-5 rounded-lg"
                style="max-height: 300px; overflow-y: auto"
              >
                <div v-if="listaItemExibir === null">
                  <v-list-item>
                    <v-list-item-title>
                      Nenhum item adicionado
                    </v-list-item-title>
                  </v-list-item>
                </div>

                <div v-else>
                  <v-list-item
                    v-for="(item, index) in listaItemExibir"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.item.name }} - {{ item.item.cubic_feet }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <p>
                          {{ "Quantidade: " + item.quantity }}-{{
                            "Cubic total: " + item.cubicTotal
                          }}
                        </p>
                        <p>
                          {{ "Obs: " + item.obs }}
                        </p>
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-badge
                            slot="activator"
                            v-on="on"
                            :title="'Excluir ' + item.item.name"
                            bordered
                            color="error"
                            style="cursor: pointer"
                            icon="mdi-close-box"
                            overlap
                            @click.native="excluirItem(item.item.id)"
                          >
                          </v-badge>
                        </template>
                        <span>Excluir Item</span>
                      </v-tooltip>
                    </v-list-item-action>
                  </v-list-item>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  getListItemStorageSession,
  delItemStorageSession,
  setItemStorageSessionNovo,
} from "@/modulos/moving/helper/getSetItemStorageSession.js";

import { setAllItensComodosByStorageSession } from "@/modulos/moving/helper/getSetComodoStorageSession.js";

export default {
  name: "PoupUpAddItemComodo",

  props: {
    variavelShowModal: {
      required: true,
    },
    variavelIdMudanca: {
      required: true,
    },
    variavelIdComodo: {
      required: true,
    },
  },

  data: () => ({
    varOpenDialogImage: false,

    listaItemExibir: [],
    listaItem: [],

    headerRequest: "",
    urlAPIGetItem: process.env.VUE_APP_URL_CONNECTION + "/moving/items",

    //listaItem: ["fogão", "geladeira", "tv"],
    //show: false,
    //dialog: this.abrirDialog,
    notifications: false,
    sound: true,
    widgets: false,

    regrasAddItem: [(v) => !!v || "Escolha um item para adicionar"],

    /*
    folders: [
      {
        title: "Fogão",
      },
      {
        title: "Geladeira",
      },
      {
        title: "TV 29",
      },
      {
        title: "Cama",
      },
      {
        title: "Cama",
      },
      {
        title: "Cama",
      },
    ], 
    */

    objForm: {
      item: "",
      itemObs: "",
    },
  }),

  created() {
    const AuthStr = "Bearer ".concat(sessionStorage.getItem("token"));
    this.headerRequest = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthStr,
      },
    };
  },

  methods: {
    excluirItem: function (id) {
      delItemStorageSession(
        id,
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo
      );
      this.preencherItensAbrirJanela();
    },

    addItemAoComodo: function () {
      if (this.$refs.form.validate()) {
        /*var objItem = this.listaItem.filter((obj) => {
          return obj.id === this.objForm.item;
        });*/
        //console.log(objItem[0]);
        //console.log(this.objForm.itemObs);

        let obsItem = "";
        if (this.objForm.itemObs != undefined) {
          obsItem = this.objForm.itemObs;
        }

        setItemStorageSessionNovo(
          this.getValorVariavelIdMudanca,
          this.getValorvariavelIdComodo,
          this.objForm.item,
          obsItem,
          this.objForm.quantity
        );
        this.preencherItensAbrirJanela();
        this.reset();
      }
    },

    validate: function () {
      alert(this.$refs.form.validate());
    },

    reset: function () {
      this.$refs.form.reset();
    },

    openDialogImageMetodo: function (value) {
      this.varOpenDialogImage = value;
    },
    closeDialogImageMetodo: function () {
      this.varOpenDialogImage = false;
    },

    closeModal: function (value) {
      setAllItensComodosByStorageSession(
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo
      );
      this.$emit("closeModal", value);
    },
    clicar: function () {
      alert("alert");
    },

    preencherItensAbrirJanela: function () {
      this.listaItemExibir = getListItemStorageSession(
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo
      );
      if (this.listaItemExibir == undefined) {
        this.listaItemExibir = null;
      } else {
        if (this.listaItemExibir.length <= 0) {
          this.listaItemExibir = null;
        }
      }
    },

    listarItemsAdd: function () {
      this.objLoadingGrid = true;

      this.$axios.get(this.urlAPIGetItem, this.headerRequest).then(
        (response) => {
          if (response.status == 200) {
            this.listaItem = response.data.data;
          } else {
            this.$dialog.message.error(
              "Erro consultar dados: " + response.status,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
          this.objLoadingGrid = false;
        },
        (error) => {
          this.objLoadingGrid = false;
          this.$dialog.message.error("Consultar dados: " + error, {
            position: "top-right",
            timeout: 5000,
          });
        }
      );
    },
  },

  computed: {
    getValorAbrirJanela: {
      get() {
        if (this.variavelShowModal) {
          this.listarItemsAdd();
          this.preencherItensAbrirJanela();
        }
        return this.variavelShowModal;
      },
      set(value) {
        this.$emit("update:varOpenDialog", value);
      },
    },

    getValorVariavelIdMudanca: {
      get() {
        return this.variavelIdMudanca;
      },
    },
    getValorvariavelIdComodo: {
      get() {
        return this.variavelIdComodo;
      },
    },
  },
};
</script>