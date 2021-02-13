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
          <v-toolbar-title>Adicionar imagens do cômodo</v-toolbar-title>
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
                    Adicionar
                    <v-icon right dark>mdi-camera</v-icon>
                  </v-btn>
                </template>
                <span>Adicionar imagens do cômodo</span>
              </v-tooltip>

              <!--<v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="mx-3"
                          fab
                          dark
                          small
                          @click="openDialogImageMetodo"
                          color="blue darken-2"
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                      </template>
                      <span>Adicionar foto</span>
                    </v-tooltip> -->

              <div v-if="listaImagensExibir === null">
                <v-row>
                  <v-col> Nenhuma imagem adicionada </v-col>
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
                                image.idMudanca,
                                image.idComodo
                              )
                            "
                          >
                          </v-badge>
                        </template>
                        <span>Excluir imagem</span>
                      </v-tooltip>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <!--<v-row>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row>
              <v-row text-xs-center>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
                <v-col>
                  <div class="float-left">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      src="https://picsum.photos/id/11/500/300"
                      class="rounded-lg"
                    ></v-img>
                  </div>
                  <div class="float-left">
                    <v-tooltip>
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          slot="activator"
                          v-bind="attrs"
                          v-on="on"
                          bordered
                          color="error"
                          style="cursor: pointer"
                          icon="mdi-close-box"
                          overlap
                          @click.native="clicar"
                        >
                        </v-badge>
                      </template>
                      <span>Excluir imagem</span>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row> -->
            </center>
          </v-container>
        </v-card-text>
        <PoupUpCaptureImage
          v-bind:variavelShowModalCamera="varOpenDialogImage"
          v-bind:variavelIdMudanca="getValorVariavelIdMudanca"
          v-bind:variavelIdComodo="getValorvariavelIdComodo"
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
  },

  data: () => ({
    varOpenDialogImage: false,
    listaImagensExibir: [],
  }),

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
        exbicaoTela
      );
    },

    closeModal: function (value) {
      setAllImageComodosByStorageSession(
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo
      );
      this.$emit("closeModal", value);
    },

    excluirImagem: function (id, idMudanca, idComodo) {
      delImageStorageSession(id, idMudanca, idComodo);
      let exbicaoTela = true;
      this.listaImagensExibir = getListImageStorageSession(
        this.variavelIdMudanca,
        this.variavelIdComodo,
        exbicaoTela
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
        exbicaoTela
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
