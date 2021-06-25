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
          <v-toolbar-title>{{$t('tradPoupUpAddItem')}}</v-toolbar-title>
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
                    :item-text="nameTraducao"
                    item-value="id"
                    :label="$t('tradMsgmItem')"
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
                    :label="$t('tradPoupUpQtdItem')"
                    type="number"
                    outlined
                    required="true"
                    :rules="qtdItemRules"
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
                    :label="$t('tradPoupUpObsItem')"
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
                          {{ $t('tradPoupUpAdicionarItem') }}
                          <v-icon right dark>mdi-scatter-plot</v-icon>
                        </v-btn>
                      </template>

                      <span>{{ $t('tradPoupUpAdicionarItemAoComodo') }}</span>
                    </v-tooltip>
                  </center>
                </v-col>
              </v-row>
            </v-form>
            <p class="subtitle-1 ma-auto">{{ $t('tradPoupUpItensExistentesComodo') }}</p>
            <v-row>
              <v-col
                class="ma-auto overflow-y-auto elevation-5 rounded-lg"
                style="max-height: 300px; overflow-y: auto"
              >
                <div v-if="listaItemExibir === null">
                  <v-list-item>
                    <v-list-item-title>
                      {{ $t('tradPoupUpNenhumItemAdicionado') }}
                      
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
                        <div v-if="nameTraducao == 'name_pt'">
                          {{ item.item.name_pt }} - {{ item.item.cubic_feet }}
                        </div>
                        <div v-else-if="nameTraducao == 'name_es'">
                          {{ item.item.name_es }} - {{ item.item.cubic_feet }}
                        </div>
                        <div v-else>
                          {{ item.item.name }} - {{ item.item.cubic_feet }}
                        </div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <p>
                          {{ $t('tradQuantidadeItem') }}: {{ item.quantity }}-
                          {{ $t('tradOrderTotCubi') }}: {{ item.cubicTotal }}
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
                            v-if="nameTraducao == 'name_pt'"
                            slot="activator"
                            v-on="on"
                            :title=" $t('tradMsgmDeleteItem') + item.item.name_pt"
                            bordered
                            color="error"
                            style="cursor: pointer"
                            icon="mdi-close-box"
                            overlap
                            @click.native="excluirItem(item.item.id)"
                          >
                          </v-badge>

                          <v-badge
                            v-else-if="nameTraducao == 'name_es'"
                            slot="activator"
                            v-on="on"
                            :title=" $t('tradMsgmDeleteItem') + item.item.name_es"
                            bordered
                            color="error"
                            style="cursor: pointer"
                            icon="mdi-close-box"
                            overlap
                            @click.native="excluirItem(item.item.id)"
                          >
                          </v-badge>

                          <v-badge
                            v-else
                            slot="activator"
                            v-on="on"
                            :title=" $t('tradMsgmDeleteItem') + item.item.name"
                            bordered
                            color="error"
                            style="cursor: pointer"
                            icon="mdi-close-box"
                            overlap
                            @click.native="excluirItem(item.item.id)"
                          >
                          </v-badge>


                        </template>
                        <span>{{$t('tradMsgmDeleteItem')}}</span>
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

import { execGet } from "@/helper/execRequests.js";

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
    variavelIdArrayComodo: {
      required: true,
    },
  },

  data: () => ({
    linguagem: null,
    nameTraducao: "",    
    varOpenDialogImage: false,

    listaItemExibir: [],
    listaItem: [],

    urlAPIGetItem: process.env.VUE_APP_URL_CONNECTION + "/moving/items",

    //listaItem: ["fogão", "geladeira", "tv"],
    //show: false,
    //dialog: this.abrirDialog,
    notifications: false,
    sound: true,
    widgets: false,
    objForm: {
      item: "",
      itemObs: "",
    },
    regrasAddItem: [],
    qtdItemRules: []
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;
    switch (this.linguagem) {
      case 'pt-BR':          
        this.nameTraducao = 'name_pt';
        break;    
      case 'es':          
        this.nameTraducao = 'name_es';
        break;
      default:          
        this.nameTraducao = 'name';
    }
    this.qtdItemRules = [(v) => !!v || this.$i18n.t("tradRulePoupUpAddItemQtd")];
    this.regrasAddItem = [(v) => !!v || this.$i18n.t("tradRulePoupUpEscolhaItem")]
  },

  methods: {
    excluirItem: function (id) {
      delItemStorageSession(
        id,
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo,
        this.getValorvariavelIdArrayComodo
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
          this.getValorvariavelIdArrayComodo,
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
        this.getValorvariavelIdComodo,
        this.getValorvariavelIdArrayComodo
      );
      this.$emit("closeModal", value);
    },
    clicar: function () {
      alert("alert");
    },

    preencherItensAbrirJanela: function () {
      this.listaItemExibir = getListItemStorageSession(
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo,
        this.getValorvariavelIdArrayComodo
      );
      if (this.listaItemExibir == undefined) {
        this.listaItemExibir = null;
      } else {
        if (this.listaItemExibir.length <= 0) {
          this.listaItemExibir = null;
        }
      }
    },

    listarItemsAdd: async function () {


      let listaDados = await execGet(this.urlAPIGetItem);
      
      if(listaDados!=undefined){
        if(listaDados.length > 0){
          let a = 0;
          this.listaItem = [];
          for(a; a<listaDados.length; a++){
            let objItem = listaDados[a];
            switch (this.linguagem) {
              case 'pt-BR':          
                if(objItem.name_pt != null){
                  this.listaItem.push(objItem);
                }
                break;    
              case 'es':          
                if(objItem.name_es != null){
                  this.listaItem.push(objItem);
                }
                break;
              default:          
                this.listaItem.push(objItem);
            } 
          }
        }
      }
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
    getValorvariavelIdArrayComodo: {
      get() {
        return this.variavelIdArrayComodo;
      },
    },
  },
};
</script>