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
          <v-toolbar-title>{{$t('tradPoupUpAddImagemComodo')}}</v-toolbar-title>
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
            <!--<v-subheader>Adiciona Objetos</v-subheader>-->
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
                    @click="openDialogImageMetodo"
                  >
                    {{$t('tradPoupUpAddImagemComodoAdd')}} 
                    <v-icon right dark>mdi-camera</v-icon>
                  </v-btn>
                </template>
                <span>{{$t('tradPoupUpAddImagemComodo')}}</span>
              </v-tooltip>

              <div v-if="listaImagensExibir === null">
                <v-row>
                  <v-col>{{$t('tradPoupUpAddImagemComodoSemImagem')}}</v-col>
                </v-row>
              </div>
              <div v-else>
                <v-row
                  v-for="(listImage, index) in listaImagensExibir"
                  :key="index"
                  class="justify-center align-center"
                >
                  <v-col
                    v-for="(image, index2) in listImage"
                    :key="index2"
                    xs="12"
                    sm="12"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    <div class="float-left">
                      <v-img
                        max-height="150"
                        max-width="250"
                        :src="image.image"
                        class="rounded-lg"
                      ></v-img>
                    </div>
                    <div class="float-left">
                      <v-tooltip>
                        <template v-slot:activator="{ on, attrs }">
                          <v-badge
                            slot="activator"
                            title="excluir"
                            v-bind="attrs"
                            v-on="on"
                            bordered
                            color="error"
                            style="cursor: pointer"
                            icon="mdi-close-box"
                            overlap
                            @click.native="
                              excluirImagem(
                                image.id,
                                //image.idMudanca,
                                //image.idComodo,
                                image.idArrayComodo
                              )
                            "
                          >
                          </v-badge>
                        </template>
                        <span>{{$t('tradPoupUpAddImagemComodoDelImagem')}}</span>
                      </v-tooltip>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </center>
          </v-container>
        </v-card-text>
        <PoupUpCaptureImage
          v-bind:variavelShowModalCamera="varOpenDialogImage"
          v-bind:variavelIdMudanca="getValorvariavelIdMudanca"
          v-bind:variavelIdComodo="getValorvariavelIdComodo"
          v-bind:variavelIdArrayComodo="getValorvariavelIdArrayComodo"
          v-on:closeModalImage="closeDialogImageMetodo"
          @update:varOpenDialogImage="varOpenDialogImage = $event"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PoupUpCaptureImage from "@/modulos/moving/components/PoupUpCaptureImage.vue";
import {
  getListImageStorageSession,
  delImageStorageSession,
} from "@/modulos/moving/helper/getSetImageStorageSession.js";
import { setAllImageComodosByStorageSession } from "@/modulos/moving/helper/getSetComodoStorageSession.js";
export default {
  name: "PoupUpAddImagemComodo",

  components: {
    PoupUpCaptureImage,
  },

  props: {
    variavelShowModalImageComodo: {
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
    varOpenDialogImage: false,
    listaImagensExibir: [],
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;
  },

  mounted() {},

  methods: {
    openDialogImageMetodo: function (value) {
      this.varOpenDialogImage = value;
    },
    closeDialogImageMetodo: function () {
      this.varOpenDialogImage = false;
      //listar as imagens que
      let exbicaoTela = true;

      this.listaImagensExibir = getListImageStorageSession(
        this.variavelIdMudanca,
        this.variavelIdComodo,
        exbicaoTela,
        this.variavelIdArrayComodo
      );
    },

    closeModal: function (value) {
      setAllImageComodosByStorageSession(
        this.getValorvariavelIdMudanca,
        this.getValorvariavelIdComodo,
        this.getValorvariavelIdArrayComodo
      );
      this.$emit("closeModal", value);
    },

    excluirImagem: function (id, idArrayComodo) {
      delImageStorageSession(
        id,
        this.getValorvariavelIdMudanca,
        this.getValorvariavelIdComodo,
        idArrayComodo
      );
      let exbicaoTela = true;
      this.listaImagensExibir = getListImageStorageSession(
        this.variavelIdMudanca,
        this.variavelIdComodo,
        exbicaoTela,
        this.variavelIdArrayComodo
      );
      if (this.listaImagensExibir == undefined) {
        this.listaImagensExibir = null;
      } else {
        if (this.listaImagensExibir.length <= 0) {
          this.listaImagensExibir = null;
        }
      }
    },

    preencherImagensAbrirJanela: function () {
      //listar as imagens que
      let exbicaoTela = true;
      this.listaImagensExibir = getListImageStorageSession(
        this.variavelIdMudanca,
        this.variavelIdComodo,
        exbicaoTela,
        this.variavelIdArrayComodo
      );
      if (this.listaImagensExibir == undefined) {
        this.listaImagensExibir = null;
      } else {
        if (this.listaImagensExibir.length <= 0) {
          this.listaImagensExibir = null;
        }
      }
    },
  },

  computed: {
    getValorAbrirJanela: {
      get() {
        if (this.variavelShowModalImageComodo) {
          this.preencherImagensAbrirJanela();
        }
        return this.variavelShowModalImageComodo;
      },
      set(value) {
        this.$emit("update:varOpenDialog", value);
      },
    },
    getValorvariavelIdMudanca: {
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
<style>
/*.containerAqui {
  display: flex;
  overflow-x: auto;
}*/
.containerAqui {
  height: 100%;
  width: 100%;
  overflow: auto;
}

.container img {
  margin-right: 15px;
}
/*.container::-webkit-scrollbar {
  display: none;
}*/
</style>
