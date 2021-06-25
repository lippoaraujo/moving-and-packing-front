<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-icon> {{ menu.icon }}</v-icon>
          <span class="subtitle-1" v-if="linguagem === 'en'">
            {{ menu.nameExibicao }}
          </span>
          <span class="subtitle-1" v-if="linguagem === 'pt-BR'">
            {{ menu.nameExibicaoPtBr }}
          </span>
          <span class="subtitle-1" v-if="linguagem === 'es'">
            {{ menu.nameExibicaoEs }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs
            hide-on-leave="true"
            v-model="tab"
            background-color="blue darken-4"
            centered
            dark
            color
            icons-and-text
            grow
            class="tabs-container elevation-5"
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab v-for="i in itensTituloTabs" :key="i.id">
              <div>{{ i.nome }}</div>
              <v-icon large>{{ i.icon }}</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat class="elevation-5">
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-card-search-outline"
                    :label="$t('tradLabelConsultaGrid')"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  multi-sort
                  :loading="objLoadingGrid"
                  :loading-text="$t('tradLoadConsultaGrid')"
                  :search="search"
                  :footer-props="{
                    'items-per-page-text': $t('tradItemPorPaginaGrid'),
                  }"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      v-if="permiteEditar"
                      medium
                      class="mr-2"
                      :title="$t('tradTitleBtnAlterar')"
                      @click="alterar(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      v-if="permiteExcluir"
                      medium
                      class="mr-2"
                      :title="$t('tradTitleBtnExcluir')"
                      @click="excluir(item)"
                      >mdi-delete</v-icon
                    >
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat class="elevation-5">
                <v-card-text>
                  <v-form
                    v-on:submit.prevent="salvar(objForm)"
                    ref="objForm"
                    lazy-validation
                  >
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="objForm.name"
                          :counter="200"
                          :rules="nameRules"
                          :label="$t('tradNamePacking')"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="objForm.description"
                          :counter="200"
                          :label="$t('tradDescriptionRoom')"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <center>
                      <v-row>
                        <v-col class="pt-3 mt-3">
                          <v-btn
                            v-if="permiteSalvar"
                            dark
                            tile
                            color="blue darken-2"
                            class="mr-4 white--text"
                            @click="salvar"
                          >
                            {{ $t("tradBtSalvarForm") }}
                            <v-icon right dark>mdi-content-save</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col class="pt-3 mt-3">
                          <v-btn
                            dark
                            tile
                            color="blue darken-2"
                            class="mr-4 white--text"
                            @click="reset"
                          >
                            {{ $t("tradBtCancelarForm") }}
                            <v-icon right dark>mdi-cancel</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </center>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-col>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>
<script>
import { mask } from "vue-the-mask";
import { getObjMenu } from "@/helper/listRoutes.js";
import { getPermissionExecAction } from "@/helper/getPermission.js";
import { execPost, execGet, execPut, execDell } from "@/helper/execRequests.js";

export default {
  directives: { mask },
  name: "Customer",

  data: () => ({
    permiteSalvar: false,
    permiteEditar: false,
    permiteExcluir: false,    
    linguagem: null,
    overlay: false,
    menu: "",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/moving/rooms",

    itensTituloTabs: [],
    search: "",
    objForm: {
      id: "",
      name: "",
      description: "",
    },
    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid
    headers: [],
    desserts: [],
    //grid
    //form
    valid: true,
    nameRules: [],
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;

    this.nameRules = [
      (v) => !!v || this.$i18n.t("tradRuleNamePacking"),
      (v) =>
        (v && v.length <= 200) || this.$i18n.t("tradRuleNameLengthPacking"),
    ];

    this.itensTituloTabs = [
      { id: 0, nome: this.$i18n.t("tradDadoAbaForm"), icon: "mdi-view-list" },
      {
        id: 1,
        nome: this.$i18n.t("tradCadastroAbaForm"),
        icon: "mdi-keyboard-variant",
      },
    ];

    this.headers = [
      {
        align: "start",
        text: "Código",
        value: "id",
      },
      {
        text: this.$i18n.t("tradNamePacking"),
        value: "name",
      },
      {
        text: this.$i18n.t("tradDescriptionRoom"),
        value: "description",
      },
      {
        text: this.$i18n.t("tradActionGrid"),
        value: "actions",
        sortable: "false",
      },
    ];

    this.menu = getObjMenu(this.$route.path);
  },

  mounted() {
    this.permiteSalvar = getPermissionExecAction("room-create");
    this.permiteEditar = getPermissionExecAction("room-edit");
    this.permiteExcluir = getPermissionExecAction("room-delete");    
    this.listar();
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
  },

  computed: {
    //...mapGetters(["statusMenu"]),
    getEstadoMenu: {
      get() {
        return this.$store.state.statusMenu;
      },
      set(value) {
        this.$store.commit("MODIFICAR_EXIBICAO_MENU", value);
      },
    },
    getCaminhoBreadCrumb: {
      get() {
        return this.$store.state.caminhosBreadcrumbs;
      },
      set(value) {
        this.$store.commit("MODIFICAR_CAMINHO_BREAD_CRUMB", value);
      },
    },
  },

  methods: {
    listar: async function () {
      try {
        this.overlay = true;
        this.objLoadingGrid = true;
        let listData = await execGet(this.urlAPI);
        this.repassarListaObjetoArrayGrid(listData);
      } catch (e) {
        this.$dialog.error({
          title: "Erro list",
          text: e,
        });
      } finally {
        this.overlay = false;
        this.objLoadingGrid = false;
      }
    },

    repassarListaObjetoArrayGrid: function (list) {
      this.desserts = [];
      if (list.length > 0) {
        let a = 0;
        for (a; a < list.length; a++) {
          this.desserts.push(list[a]);
        }
      }
    },

    salvar: async function () {
      try {
        this.overlay = true;
        if (this.validate()) {
          if (this.objForm.id > 0) {
            let retornoUpdate = await this.execUpdate();
            if (retornoUpdate) {
              this.reset();
              this.listar();
            }
          } else {
            let retornoSalvar = await this.execSalvar();
            if (retornoSalvar) {
              this.reset();
              this.listar();
            }
          }
        }
      } catch (e) {
        this.$dialog.error({
          title: "Erro save",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    execSalvar: async function () {
      let msgm =
        this.$i18n.t("tradMsgmRoom") +
        this.objForm.name +
        this.$i18n.t("tradMsgmSalvar");
      let objSalvar = {
        name: this.objForm.name,
        description: this.objForm.description,
      };
      console.log("SALVAR", objSalvar);
      let retornoExecPost = await execPost(this.urlAPI, objSalvar);
      if (retornoExecPost) {
        this.$dialog.message.success(msgm, {
          position: "top-right",
          timeout: 5000,
        });
        return true;
      } else {
        return false;
      }
    },

    execUpdate: async function () {
      let urlPut = this.urlAPI.concat("/" + this.objForm.id);
      let msgm =
        this.$i18n.t("tradMsgmRoom") +
        this.objForm.name +
        this.$i18n.t("tradMsgmAlterar");
      let objPut = {
        id: this.objForm.id,
        name: this.objForm.name,
        description: this.objForm.description,
      };
      console.log("ALTERAR", objPut);
      let retornoExecPost = await execPut(urlPut, objPut);
      if (retornoExecPost) {
        this.$dialog.message.success(msgm, {
          position: "top-right",
          timeout: 5000,
        });
        return true;
      } else {
        return false;
      }
    },

    validate: function () {
      if (!this.$refs.objForm.validate()) {
        this.$dialog.message.error(this.$i18n.t("tradMsgmForm"), {
          position: "top-right",
          timeout: 5000,
        });
        return false;
      }
      return true;
    },

    reset: function () {
      this.$refs.objForm.reset();
      this.objForm.id = "";
      this.tab = 0;
    },

    alterar: async function (item) {
      try {
        this.overlay = true;
        let urlGet = this.urlAPI.concat("/" + item.id);
        let objEdicao = await execGet(urlGet);
        this.objForm.id = objEdicao.id;
        this.objForm.name = objEdicao.name;
        this.objForm.description = objEdicao.description;
        this.tab = 1;
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date update",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    execExcluir: async function (item) {
      try {
        this.overlay = true;
        let urlDelete = this.urlAPI.concat("/" + item.id);
        let msgm = item.name + this.$i18n.t("tradMsgmRoom");
        let returDell = await execDell(urlDelete);
        if (returDell) {
          this.$dialog.message.success(msgm, {
            position: "top-right",
            timeout: 5000,
          });
          return true;
        } else {
          return false;
        }
      } catch (e) {
        this.$dialog.error({
          title: "Erro delete date",
          text: e,
        });
      } finally {
        this.listar();
        this.overlay = false;
      }
    },

    excluir: async function (item) {
      await this.$dialog.info({
        title: this.$i18n.t("tradMsgmDeleteRoom") + item.id,
        text: this.$i18n.t("tradMsgmDeleteRoom") + item.name + " ?",
        actions: {
          true: {
            text: "OK",
            handle: () => {
              this.execExcluir(item);
              return true;
            },
          },
        },
      });
    },
  },
};
</script>