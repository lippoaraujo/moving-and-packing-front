<template>
  <v-row>
    <v-col>
      <v-icon> {{ menu.image }}</v-icon
      ><span class="subtitle-1">{{ menu.name }}</span>
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
            <!--<v-card-title>
                  
                </v-card-title>-->
            <v-card-text>
              <v-row>
                <v-col>
                  <span class="subtitle-2">Grupo de usuários</span>
                  <v-autocomplete
                    v-model="selectGrupoUsuario"
                    :items="itemsSelect"
                    dense
                    filled
                    label="Grupo de usuario"
                    solo
                    background-color="white--text"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <span class="subtitle-2">Módulos</span>
                  <v-autocomplete
                    v-model="selectModulosGrupoUsuario"
                    :items="listaModulos"
                    dense
                    label="Modulos"
                    solo
                    background-color="white--text"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left subtitle-1">Menu</th>
                      <th colspan="4" class="text-left subtitle-1">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {{
                        listaMenucheked
                      }}
                    </tr>
                    <tr>
                      {{
                        listaActioncheked
                      }}
                    </tr>
                    <tr v-for="(itemMenu, key) in listaMenus" :key="key">
                      <td>
                        <v-checkbox
                          :label="itemMenu.name"
                          v-model="listaMenucheked"
                          :value="itemMenu.name"
                          color="blue darken-4"
                          @click="preencherTodasAcoesMenu(itemMenu)"
                        ></v-checkbox>
                      </td>

                      <td>
                        <v-simple-table>
                          <tbody>
                            <tr>
                              <td
                                v-for="(actions,
                                keyy,
                                index) in itemMenu.actions"
                                :key="index"
                              >
                                <v-checkbox
                                  :label="actions.nameAction"
                                  v-model="listaActioncheked"
                                  :value="actions.nameAction + itemMenu.id"
                                  color="blue darken-4"
                                ></v-checkbox>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="elevation-5">
            <v-card-text>
              <!--<v-form
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
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-checkbox
                          v-model="objForm.active"
                          label="Active"
                        ></v-checkbox>
                      </v-col>
                    </v-row>

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

                  </v-form> -->
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>
<script>
import { mask } from "vue-the-mask";

import {
  getObjMenu,
  getModulosUser,
} from "@/helper/getModulosRotasActionsUserLogado.js";

export default {
  directives: { mask },
  name: "User",

  data: () => ({
    selectGrupoUsuario: "",
    selectModulosGrupoUsuario: "",
    listaModulos: "",
    menu: "",
    //headerRequest: "",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/system/dashboard",

    itensTituloTabs: [
      { id: 0, nome: "Permissão por grupo", icon: "mdi-account-group" },
      { id: 1, nome: "Permissão por usuario", icon: "mdi-account-tie" },
    ],
    itemsSelect: ["foo", "bar", "fizz", "buzz"],

    listaMenucheked: [],
    listaActioncheked: [],

    listaMenus: [
      {
        id: 1,
        name: "User",
        actions: [
          {
            id: 1,
            nameAction: "salvar",
          },
          {
            id: 2,
            nameAction: "alterar",
          },
          {
            id: 3,
            nameAction: "excluir",
          },
          {
            id: 3,
            nameAction: "deletar",
          },
        ],
      },
      {
        id: 2,
        name: "User Group",

        actions: [
          {
            id: 1,
            nameAction: "salvar",
          },
          {
            id: 2,
            nameAction: "alterar",
          },
          {
            id: 3,
            nameAction: "excluir",
          },
          {
            id: 3,
            nameAction: "deletar",
          },
        ],
      },

      {
        id: 3,
        name: "Permission",

        actions: [
          {
            id: 1,
            nameAction: "salvar",
          },
          {
            id: 2,
            nameAction: "alterar",
          },
          {
            id: 3,
            nameAction: "excluir",
          },
          {
            id: 3,
            nameAction: "deletar",
          },
        ],
      },
    ],

    //search: "",
    objFormGroup: {},
    objFormUser: {},
    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid

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
    const AuthStr = "Bearer ".concat(sessionStorage.getItem("token"));
    this.headerRequest = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthStr,
      },
    };
    this.menu = getObjMenu(this.$route.path);
  },

  mounted() {
    this.listaModulos = this.getNomeModuloLista();
    //this.listar();
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
    //this.limparCheckMenu();
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
    getNomeModuloLista: function () {
      let list = getModulosUser();
      let i;
      let lisRetorno = [];
      for (i = 0; i < list.length; i++) {
        let objModulo = list[i];
        lisRetorno[i] = objModulo.name;
      }
      return lisRetorno;
    },

    preencherTodasAcoesMenu: function (itemMenu) {
      for (let i = 0; i < itemMenu.actions.length; i++) {
        let action = itemMenu.actions[i];
        let itemChecked = action.nameAction + itemMenu.id;
        console.log(itemChecked);
        if (this.listaActioncheked.indexOf(itemChecked) === -1) {
          // Insere o número pois ele não existe
          this.listaActioncheked.push(itemChecked);
        } else {
          //retira
          this.listaActioncheked.splice(itemChecked, 1);
        }
      }
    },

    reset: function () {},
    salvar: function () {},

    /*
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
      this.id = "";
      this.name = "";
      this.active = "";
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
    */
  },
};
</script>