<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-icon> {{ menu.icon }}</v-icon>
          <span class="subtitle-1">{{ menu.nameExibicao }}</span>
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
                    label="Consulta rapida"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  multi-sort
                  :loading="objLoadingGrid"
                  loading-text="Carregando... Aguarde"
                  :search="search"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      medium
                      class="mr-2"
                      title="Alterar"
                      @click="alterar(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon medium title="Excluir" @click="excluir(item)"
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
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="objForm.name"
                          :counter="200"
                          :rules="nameRules"
                          label="Name"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-select
                          :items="listaUnity"
                          v-model="objForm.unity"
                          label="Unity"
                          outlined
                          :rules="unityRules"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <center>
                      <v-row>
                        <v-col>
                          <v-btn
                            dark
                            tile
                            color="blue darken-2"
                            class="mr-4 white--text"
                            @click="salvar"
                          >
                            Salvar
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
                            Cancelar
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

import { execPost, execGet, execPut } from "@/helper/execRequests.js";

export default {
  directives: { mask },
  name: "Customer",

  data: () => ({
    overlay: false,
    menu: "",
    headerRequest: "",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/moving/packings",

    itensTituloTabs: [
      { id: 0, nome: "Dados", icon: "mdi-view-list" },
      { id: 1, nome: "Cadastro", icon: "mdi-keyboard-variant" },
    ],

    listaUnity: ["unitario", "metro", "fardo", "litro"],

    search: "",
    objForm: {
      id: "",
      name: "",
      unity: "",
    },
    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid
    headers: [
      {
        align: "start",
        text: "Código",
        value: "id",
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Unity",
        value: "unity",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: "false",
      },
    ],
    desserts: [],
    //grid
    //form
    valid: true,
    nameRules: [
      (v) => !!v || "Nome e obrigatório",
      (v) =>
        (v && v.length <= 200) || "O Nome deve ter no máximo 200 caracteres",
    ],
    unityRules: [(v) => !!v || "Unity e obrigatório"],
  }),

  created() {
    const AuthStr = "Bearer ".concat(localStorage.getItem("token"));
    this.headerRequest = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthStr,
      },
    };
    this.menu = getObjMenu(this.$route.path);
  },

  mounted() {
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
        let listData = await execGet.call(
          this,
          this.urlAPI,
          this.headerRequest
        );
        this.repassarListaObjetoArrayGrid(listData);
      } catch (e) {
        this.$dialog.message.error(
          "Erro consultar dados Packing: " + e.message,
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } finally {
        this.objLoadingGrid = false;
        this.overlay = false;
      }
    },

    repassarListaObjetoArrayGrid: function (list) {
      this.desserts = [];
      //console.log(list.data);
      if (list.length > 0) {
        let a = 0;
        for (a; a < list.length; a++) {
          this.desserts.push(list[a]);
        }
      }
    },

    execUpdate: async function () {
      let urlPut = this.urlAPI.concat("/" + this.objForm.id);
      let objPut = {
        id: this.objForm.id,
        name: this.objForm.name,
        unity: this.objForm.unity,
      };
      let msgm = "Packing " + this.objForm.name + " alterado com sucesso!";

      //console.log(JSON.stringify(objSalvar));
      let retornoExecPost = await execPut.call(
        this,
        urlPut,
        objPut,
        this.headerRequest
      );
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

    execSalvar: async function () {
      let msgm = "Packing " + this.objForm.name + " cadastrado com sucesso!";
      let objSalvar = {
        name: this.objForm.name,
        unity: this.objForm.unity,
      };

      //console.log(JSON.stringify(objSalvar));
      let retornoExecPost = await execPost.call(
        this,
        this.urlAPI,
        objSalvar,
        this.headerRequest
      );
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

    salvar: async function () {
      try {
        this.overlay = true;

        if (this.validate()) {
          if (this.objForm.id > 0) {
            let retornoAlterar = await this.execUpdate();
            if (retornoAlterar) {
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
        this.objLoadingGrid = false;
        this.$dialog.message.error("Executa salvar: " + e.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.overlay = false;
      }
    },

    validate: function () {
      return this.$refs.form.validate();
    },

    reset: function () {
      this.$refs.form.reset();
      this.tab = 0;
    },

    resetValidation: function () {
      this.$refs.form.resetValidation();
    },

    alterar: async function (item) {
      this.overlay = true;
      //?id=7&get_data=true
      //orders/2?get_data=true

      let urlGet = this.urlAPI.concat("/" + item.id);

      try {
        let objEdicao = await execGet.call(this, urlGet, this.headerRequest);
        this.objForm.id = objEdicao.id;
        this.objForm.name = objEdicao.name;
        this.objForm.unity = objEdicao.unity;
        this.tab = 1;
      } catch (e) {
        this.$dialog.message.error(
          "Erro consultar dados alterar packing: " + e.message,
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } finally {
        this.overlay = false;
      }
    },

    execExcluir: async function (item) {
      this.overlay = true;
      let urlDelete = this.urlAPI.concat("/" + item.id);
      //var myJSON = JSON.stringify(objPost);

      this.$axios.delete(urlDelete, this.headerRequest).then(
        (response) => {
          //console.log(response);
          if (response.status == 200) {
            this.$dialog.message.success(item.name + " excluido com sucesso!", {
              position: "top-right",
              timeout: 5000,
            });
          } else {
            this.$dialog.error({
              title: "Erro del",
              text: response.data.mensagem,
            });
          }
        },
        (error) => {
          this.$dialog.error({
            title: "Erro del",
            text: error,
          });
        }
      );
      this.listar();
      this.overlay = false;
    },

    excluir: async function (item) {
      await this.$dialog.info({
        title: "Delete Room " + item.id,
        text: "Delete Room " + item.name + " ?",
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