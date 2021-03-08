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
                      small
                      class="mr-2"
                      title="Alterar"
                      @click="alterar(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon small title="Excluir" @click="excluir(item)"
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
  </v-row>
</template>
<script>
import { mask } from "vue-the-mask";

//import { getObjMenu } from "@/helper/getModulosRotasActionsUserLogado.js";
import { getObjMenu } from "@/helper/listRoutes.js";

export default {
  directives: { mask },
  name: "UserGroup",

  data: () => ({
    menu: "",
    headerRequest: "",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/system/roles",

    itensTituloTabs: [
      { id: 0, nome: "Dados", icon: "mdi-view-list" },
      { id: 1, nome: "Cadastro", icon: "mdi-keyboard-variant" },
    ],
    search: "",
    objForm: {
      id: "",
      name: "",
      active: "",
    },
    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid
    headers: [
      {
        align: "start",
        text: "Name",
        value: "name",
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
      (v) => !!v || "Name e obrigatório",
      (v) =>
        (v && v.length <= 200) || "O Name deve ter no máximo 200 caracteres",
    ],
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
    listar: function () {
      this.objLoadingGrid = true;

      this.$axios.get(this.urlAPI, this.headerRequest).then(
        (response) => {
          if (response.status == 200) {
            this.repassarListaObjetoArrayGrid(response.data);
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

    repassarListaObjetoArrayGrid: function (list) {
      this.desserts = [];
      //console.log(list.data);
      if (list.data.length > 0) {
        let a = 0;
        for (a; a < list.data.length; a++) {
          this.desserts.push(list.data[a]);
        }
      }
    },

    salvar: function () {
      if (this.$refs.form.validate()) {
        if (this.objForm.id > 0) {
          let objUpdate = {
            id: this.objForm.id,
            tenant_id: 1,
            name: this.objForm.name,
            active: this.objForm.active,
          };
          let msgm =
            "User groups " + this.objForm.name + " alterado com sucesso!";
          let urlUpdate = this.urlAPI.concat("/" + this.objForm.id);
          //console.log(urlUpdate);
          //console.log(objUpdate);
          //console.log(this.headerRequest);
          this.$axios.put(urlUpdate, objUpdate, this.headerRequest).then(
            (response) => {
              if (response.status == 200) {
                this.$dialog.message.success(msgm, {
                  position: "top-right",
                  timeout: 5000,
                });
                this.reset();
                this.listar();
              } else {
                this.$dialog.message.error(response.status, {
                  position: "top-right",
                  timeout: 5000,
                });
              }
            },
            (error) => {
              this.$dialog.message.error(error, {
                position: "top-right",
                timeout: 5000,
              });
            }
          );
        } else {
          let msgm =
            "User groups " + this.objForm.name + " cadastrado com sucesso!";
          let objSalvar = {
            name: this.objForm.name,
            tenant_id: 1,
            active: this.objForm.active,
          };
          this.$axios.post(this.urlAPI, objSalvar, this.headerRequest).then(
            (response) => {
              if (response.status == 201) {
                this.$dialog.message.success(msgm, {
                  position: "top-right",
                  timeout: 5000,
                });
                this.reset();
                this.listar();
              } else {
                this.$dialog.message.error(response.status, {
                  position: "top-right",
                  timeout: 5000,
                });
              }
            },
            (error) => {
              this.$dialog.message.error(error, {
                position: "top-right",
                timeout: 5000,
              });
            }
          );
        }
      }
    },

    validate: function () {
      alert(this.$refs.form.validate());
    },

    reset: function () {
      this.$refs.form.reset();
      this.tab = 0;
    },

    resetValidation: function () {
      this.$refs.form.resetValidation();
    },

    alterar: function (item) {
      let urlGet = this.urlAPI.concat("/" + item.id);
      this.$axios.get(urlGet, this.headerRequest).then(
        (response) => {
          //console.log(response);
          //console.log(response.data.data);

          if (response.status === 200) {
            let objEdicao = response.data.data;
            //console.log(response.data.dados.obj[0]);

            this.objForm.id = objEdicao.id;
            this.objForm.name = objEdicao.name;
            this.objForm.active = objEdicao.active;
            this.tab = 1;
            //this.headers = response.data.dados.obj;
          } else {
            this.$dialog.message.error(
              "Erro alterar dados: " + response.status,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
        },
        (error) => {
          this.$dialog.message.error("Erro alterar dados: " + error, {
            position: "top-right",
            timeout: 5000,
          });
        }
      );
      //this.editedIndex = this.desserts.indexOf(item);
      //this.editedItem = Object.assign({}, item);
      //this.dialog = true;
    },

    excluir: function (item) {
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
            this.$dialog.message.error(
              "Excluir dados: " + response.data.mensagem,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
          this.objLoadingGrid = false;
        },
        (error) => {
          this.$dialog.message.error("Delete: " + error, {
            position: "top-right",
            timeout: 5000,
          });
          this.objLoadingGrid = false;
        }
      );
      this.listar();
    },
  },
};
</script>