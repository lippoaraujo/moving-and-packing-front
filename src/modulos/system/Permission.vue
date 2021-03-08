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
                  <v-select
                    v-model="selectGrupoUsuario"
                    :items="listaGrupoPermissao"
                    label="Grupo do usuario"
                    item-text="name"
                    item-value="id"
                    return-object
                    outlined
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    v-model="selectModulosGrupoUsuario"
                    :items="listaModulos"
                    label="Modulos"
                    item-text="name"
                    item-value="id"
                    return-object
                    outlined
                    @change="preencherPermissaoPorModulos"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-expansion-panels
                    class="elevation-5 rounded-lg"
                    accordion
                    multiple
                    v-model="panelList"
                  >
                    <v-expansion-panel
                      v-for="(modulo, key) in listaModule"
                      :key="key"
                    >
                      <v-expansion-panel-header>
                        {{ modulo.name }}
                      </v-expansion-panel-header>

                      <v-expansion-panel-content>
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left subtitle-1">Menu</th>
                                <th colspan="4" class="text-left subtitle-1">
                                  Ações
                                </th>
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
                              <tr
                                v-for="(
                                  itemMenu, key
                                ) in modulo.routes_permissions"
                                :key="key"
                              >
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
                                          v-for="(
                                            actions, keyy, index
                                          ) in itemMenu.actions"
                                          :key="index"
                                        >
                                          <v-checkbox
                                            :label="actions.name"
                                            v-model="listaActioncheked"
                                            :value="
                                              actions.name +
                                              '_' +
                                              itemMenu.id +
                                              '_' +
                                              itemMenu.id
                                            "
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
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
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

import {
  //execPost,
  execGet,
} from "@/helper/execRequests.js";

import { getListPermissionStorageSession } from "@/modulos/system/helper/getSetPermissionStorageSession.js";

export default {
  directives: { mask },
  name: "User",

  data: () => ({
    panelList: [],
    urlAPIGrupoUser: process.env.VUE_APP_URL_CONNECTION + "/system/usergroups",
    urlAPIRoutes: process.env.VUE_APP_URL_CONNECTION + "system/routes",

    selectGrupoUsuario: null,
    selectModulosGrupoUsuario: null,
    listaModulos: [],
    menu: "",
    //headerRequest: "",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/system/dashboard",

    itensTituloTabs: [
      { id: 0, nome: "Permissão por grupo", icon: "mdi-account-group" },
      { id: 1, nome: "Permissão por usuario", icon: "mdi-account-tie" },
    ],
    listaGrupoPermissao: [],

    listaMenucheked: [],
    listaActioncheked: [],

    listaModule: [],
    /*
    listaModule: [
      {
        id: 1,
        name: "System",
        routes_permissions: [
          {
            id: 1,
            name: "User",
            actions: [
              {
                id: 1,
                name: "salvar",
              },
              {
                id: 2,
                name: "alterar",
              },
              {
                id: 3,
                name: "excluir",
              },
              {
                id: 3,
                name: "deletar",
              },
            ],
          },
          {
            id: 2,
            name: "User Group",

            actions: [
              {
                id: 1,
                name: "salvar",
              },
              {
                id: 2,
                name: "alterar",
              },
              {
                id: 3,
                name: "excluir",
              },
              {
                id: 3,
                name: "deletar",
              },
            ],
          },

          {
            id: 3,
            name: "Permission",

            actions: [
              {
                id: 1,
                name: "salvar",
              },
              {
                id: 2,
                name: "alterar",
              },
              {
                id: 3,
                name: "excluir",
              },
              {
                id: 3,
                name: "deletar",
              },
            ],
          },
        ],
      },

      {
        id: 2,
        name: "Moving",
        routes_permissions: [
          {
            id: 1,
            name: "User",
            actions: [
              {
                id: 1,
                name: "salvar",
              },
              {
                id: 2,
                name: "alterar",
              },
              {
                id: 3,
                name: "excluir",
              },
              {
                id: 3,
                name: "deletar",
              },
            ],
          },
          {
            id: 2,
            name: "User Group",

            actions: [
              {
                id: 1,
                name: "salvar",
              },
              {
                id: 2,
                name: "alterar",
              },
              {
                id: 3,
                name: "excluir",
              },
              {
                id: 3,
                name: "deletar",
              },
            ],
          },

          {
            id: 3,
            name: "Permission",

            actions: [
              {
                id: 1,
                name: "salvar",
              },
              {
                id: 2,
                name: "alterar",
              },
              {
                id: 3,
                name: "excluir",
              },
              {
                id: 3,
                name: "deletar",
              },
            ],
          },
        ],
      },
    ],
    */
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
    const AuthStr = "Bearer ".concat(localStorage.getItem("token"));
    this.headerRequest = {
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthStr,
      },
    };
    this.menu = getObjMenu(this.$route.path);
  },

  async mounted() {
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
    await this.getListaGrupoPermissao();
    this.listaModulos = this.preencherSelectModulo();
    //this.listaModule = getListPermissionStorageSession();
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
    preencherPermissaoPorModulos: function () {
      let modulo = this.selectModulosGrupoUsuario;
      this.listaModule = getListPermissionStorageSession(modulo, null);
      this.panelList = [];
      this.listaMenucheked = [];
      let i = 0;
      for (i; i < this.listaModule.length; i++) {
        let modulo = this.listaModule[i];
        let men = 0;
        for (men; men < modulo.routes_permissions.length; men++) {
          let menu = modulo.routes_permissions[men];
          console.log(menu);
          if (menu.is_menu) {
            this.listaMenucheked.push(menu.name);
            //console.log(menu);
            let act = 0;
            for (act; act < menu.actions.length; act++) {
              let action = menu.actions[act];
              //:value="actions.name + '_' + itemMenu.id + '_' + itemMenu.id"
              this.listaActioncheked.push(
                action.name + "_" + menu.id + "_" + action.id
              );
              //console.log(action);
            }
          }
        }
        this.panelList.push(i);
      }
      console.log(this.listaMenucheked);
      console.log(this.listaActioncheked);
    },

    preencherSelectModulo: function () {
      let list = getModulosUser();
      let i;
      let lisRetorno = [];
      let obj = new Object();
      obj.id = 0;
      obj.name = " ";
      this.panelList = [];
      lisRetorno.push(obj);
      for (i = 0; i < list.length; i++) {
        let objModulo = list[i];
        this.panelList.push(i);
        lisRetorno[i + 1] = objModulo;
      }
      return lisRetorno;
    },

    preencherTodasAcoesMenu: function (itemMenu) {
      console.log("aq");
      console.log(this.listaMenucheked);
      console.log(this.listaActioncheked);
      console.log(itemMenu);
      console.log("aq");

      for (let i = 0; i < itemMenu.actions.length; i++) {
        let action = itemMenu.actions[i];
        let itemChecked = action.name + itemMenu.id;
        //console.log(itemChecked);
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

    //urlAPIRoutes

    getListaGrupoPermissao: async function () {
      try {
        this.objLoadingGrid = true;

        let list = await execGet.call(
          this,
          this.urlAPIGrupoUser,
          this.headerRequest
        );

        let obj = new Object();
        obj.id = 0;
        obj.name = " ";
        let i = 0;
        this.listaGrupoPermissao = [];
        this.listaGrupoPermissao.push(obj);
        for (i; i < list.length; i++) {
          this.listaGrupoPermissao.push(list[i]);
        }
      } catch (e) {
        this.$dialog.message.error(
          "Erro consultar dados Grupo Permissao: " + e.message,
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } finally {
        this.objLoadingGrid = false;
      }
    },
  },
};
</script>