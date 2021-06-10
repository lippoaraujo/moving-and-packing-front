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
                <!--<v-card-title>
                  
                </v-card-title>-->
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-select
                        v-model="selectGrupoUsuario"
                        :items="this.listaRoles"
                        label="Role"
                        item-text="name"
                        item-value="id"
                        return-object
                        outlined
                        @change="setListModulesSelect"
                      ></v-select>
                    </v-col>
                    <!--<v-col>
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
                    </v-col>-->
                  </v-row>
                  <v-row v-if="listaModule.length">
                    <v-col>
                      <v-card style="width:100%;important">
                        <v-card-text>
                          <!--<p class="display-1 text-center text--primary">
                          Módulos do sistema
                        </p>-->
                          <v-col class="subtitle-1">
                            <v-icon>mdi-view-dashboard</v-icon>
                            Módulos do sistema
                          </v-col>

                          <v-bottom-navigation
                            background-color="blue darken-4"
                            dark
                            grow
                          >
                            <v-btn @click="all">
                              <span>Exibir</span>
                              <v-icon>mdi-download-multiple</v-icon>
                            </v-btn>

                            <v-btn @click="none">
                              <span>Ocultar</span>
                              <v-icon>mdi-upload-multiple</v-icon>
                            </v-btn>
                          </v-bottom-navigation>

                          <!--<v-col class="text-right">-->
                          <!--<v-col>
                          <v-btn
                            dark
                            tile
                            color="blue darken-2"
                            class="mr-4 white--text"
                            @click="all"
                            >Exibir
                            <v-icon right dark>mdi-chevron-triple-down</v-icon>
                          </v-btn>

                          <v-btn
                            dark
                            tile
                            color="blue darken-2"
                            class="mr-4 white--text"
                            @click="none" 
                          >
                            Ocultar
                            <v-icon right dark>mdi-chevron-triple-up</v-icon>
                          </v-btn>
                        </v-col> -->
                          <v-expansion-panels v-model="panelPai" multiple>
                            <v-expansion-panel
                              v-model="panelList"
                              v-for="(modulo, key) in listaModule"
                              :key="key"
                            >
                              <v-expansion-panel-header>
                                {{ modulo.modulo.nameExibicao }}
                              </v-expansion-panel-header>

                              <v-expansion-panel-content>
                                <v-simple-table dense>
                                  <template v-slot:default>
                                    <thead>
                                      <tr>
                                        <th class="text-left subtitle-1">
                                          Menu
                                        </th>
                                        <th
                                          colspan="4"
                                          class="text-left subtitle-1"
                                        >
                                          Ações
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td colspan="2">
                                          {{ modulo.listaMenucheked }}
                                        </td>
                                      </tr>
                                      <tr
                                        v-for="(itemMenu, key) in modulo.modulo
                                          .menu"
                                        :key="key"
                                      >
                                        <td>
                                          <v-checkbox
                                            :label="itemMenu.name"
                                            v-model="modulo.listaMenucheked"
                                            :value="itemMenu.name"
                                            color="blue darken-4"
                                            @click="
                                              preencherTodasAcoesMenu(itemMenu)
                                            "
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
                                                    v-model="
                                                      modulo.listaActioncheked
                                                    "
                                                    :value="actions.name"
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
                        </v-card-text>
                      </v-card>
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
    </v-col>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>
<script>
import { getObjMenu } from "@/helper/listRoutes.js";
import {
  //execPost,
  execGet,
} from "@/helper/execRequests.js";
import { getListPermissionStorageSession } from "@/modulos/system/helper/getSetPermissionStorageSession.js";
import { getListModules } from "@/helper/listRoutes.js";
export default {
  name: "Permission",

  data: () => ({
    panelPai: [],
    linguagem: null,
    overlay: false,
    panelList: [],
    urlAPIRoles: process.env.VUE_APP_URL_CONNECTION + "/system/roles",
    urlAPIGrupoUser: process.env.VUE_APP_URL_CONNECTION + "/system/usergroups",
    urlAPIRoutes: process.env.VUE_APP_URL_CONNECTION + "system/routes",

    selectGrupoUsuario: null,
    selectModulosGrupoUsuario: null,
    listaModulos: [],
    listaRoles: [],
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

    //search: "",
    objFormGroup: {},
    objFormUser: {},
    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid

    //grid
    //form
    /*valid: true,
    nameRules: [
      (v) => !!v || "Name e obrigatório",
      (v) =>
        (v && v.length <= 200) || "O Name deve ter no máximo 200 caracteres",
    ],*/
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;
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
    await this.getListRole();
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
    all() {
      //https: github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-expansion-panels/prop-model.vue

      this.panelPai = this.panelList;
    },
    // Reset the panel
    none() {
      this.panelPai = [];
    },

    preencherTodasAcoesMenu: function (itemMenu) {
      //console.log(this.listaMenucheked);
      //console.log("listaActioncheked ", this.listaActioncheked);
      let list = getListModules();
      //console.log("list ", list);
      //console.log("itemMenu ", itemMenu);

      let nomeMenuSelecionado = itemMenu.name;

      //console.log("itemMenu ", itemMenu);
      let dadosUrl = itemMenu.url.split("/");
      let nameModuloActionsNova = dadosUrl[1];

      let existeMenuChecked = false;
      let z = 0;
      for (z; z < this.listaModule.length; z++) {
        let module = this.listaModule[z];

        // percorre todos os itens do module.listaMenucheked,
        //se existir então adiciona todos as actions em module.listaActioncheked
        //se nao existir percorre module.listaActioncheked e exclui todos os itens
        // com o nome do itemMenu.name

        for (let a = 0; a < module.listaMenucheked.length; a++) {
          let nomeMenu = module.listaMenucheked[a];
          if (nomeMenu === itemMenu.name) {
            existeMenuChecked = true;
          }
        }

        //console.log("module ", module);
        //console.log("listaActioncheked ", module.listaActioncheked);
        //console.log("listaMenucheked ", module.listaMenucheked);

        //console.log(module.listaMenucheked);
        //console.log(module.listaActioncheked);
      }

      let actionsNova = [];

      for (let g = 0; g < this.listaModule.length; g++) {
        let module = this.listaModule[g];
        //console.log(module.modulo.name);

        for (let h = 0; h < module.listaActioncheked.length; h++) {
          let nameAction = module.listaActioncheked[h];
          if (existeMenuChecked) {
            //adicona todos ao module.listaActioncheked

            //percorre toda lista de modulos
            for (let i = 0; i < list.length; i++) {
              let mod = list[i];
              let menus = mod.menu;
              //console.log(menus);

              for (let j = 0; j < menus.length; j++) {
                let menu = menus[j];
                //console.log(menu);
                let actions = menu.actions;
                //console.log(actions);

                for (let m = 0; m < actions.length; m++) {
                  let nameAction = actions[m];
                  //console.log(nameAction.name);

                  if (nameAction.name.includes(nomeMenuSelecionado)) {
                    //console.log("nome que vai adicionar: ", nameAction.name);
                    actionsNova.push(nameAction.name);
                    //module.listaActioncheked.push(nameAction.name);
                  }
                }
              }
            }
          } else {
            //retira todos
            //console.log("retirando");
            //console.log("nameAction ", nameAction);
            if (nameAction.includes(nomeMenuSelecionado)) {
              module.listaActioncheked.splice(h, 1);
              h--;
            }
          }
        }
      }

      if (actionsNova.length > 0) {
        //retira elementos repetidos
        let novaArr = actionsNova.filter(
          (este, i) => actionsNova.indexOf(este) === i
        );
        console.log("nameModuloActionsNova: ", nameModuloActionsNova);
        console.log("o que vai adcionar: ", novaArr);
        this.adicionarAcoesModulosCheckbox(nameModuloActionsNova, novaArr);
      }

      //console.log("menu ", nomeMenuSelecionado);
      //console.log("existeMenuChecked ", existeMenuChecked);
      //return false;

      /*for (let i = 0; i < itemMenu.actions.length; i++) {
        let action = itemMenu.actions[i];

        //let itemChecked = action.name + action.id;
        let itemChecked = action.name;

        console.log("item para teste ", itemChecked);

        //console.log(itemChecked);
        if (this.listaActioncheked.indexOf(itemChecked) === -1) {
          console.log("adiciona ");
          // Insere o número pois ele não existe
          this.listaActioncheked.push(itemChecked);
          //this.marcaDescmarcaCheckPermissao(true, itemChecked);
        } else {
          console.log("retira ");
          //retira
          this.listaActioncheked.splice(itemChecked, 1);
          //this.marcaDescmarcaCheckPermissao(false, itemChecked);
        }
      }*/
    },

    adicionarAcoesModulosCheckbox: function (nomeModulo, listaAcoes) {
      for (let z = 0; z < this.listaModule.length; z++) {
        let modulo = this.listaModule[z];
        if (modulo.modulo.name == nomeModulo) {
          console.log("INICIO ", modulo.listaActioncheked.length);

          let listaAtual = modulo.listaActioncheked;

          console.log("listaAtual", listaAtual);
          console.log("listaAcoes", listaAcoes);

          let listaNova = listaAtual.concat(listaAcoes);
          console.log("listaAtual NOVA", listaNova);

          modulo.listaActioncheked = [];
          modulo.listaActioncheked = listaNova;
        }
      }
      console.log(listaAcoes);
    },

    /*marcaDescmarcaCheckPermissao: function (check, nameAction) {
      let totMod = 0;
      for (totMod; totMod < this.listaModule.length; totMod++) {
        let objModulo = this.listaModule[totMod];

        let listMenu = objModulo.menu;
        let totMen = 0;

        let novaListaMenu = [];
        for (totMen; totMen < listMenu.length; totMen++) {
          let objMenu = listMenu[totMen];
          let listAction = objMenu.actions;
          let totAct = 0;
          let novaListaActio = [];
          for (totAct; totAct < listAction.length; totAct++) {
            let act = listAction[totAct];
            //let nameAct = act.name + act.id;
            let nameAct = act.name;
            console.log("nameAct ", nameAct);
            console.log("nameActTeste ", nameAction);
            if (nameAct === nameAction) {
              act.checked = check;
            }
            novaListaActio.push(act);
          }
          objMenu.actions = novaListaActio;
          novaListaMenu.push(objMenu);
        }
        objModulo.menu = novaListaMenu;

        this.listaModule.splice(totMod, 1, objModulo);

        console.log("listaModule ", this.listaModule);

        //var items = Array(523,3452,334,31, ...5346);
        //items.splice(1, 1, 1010);
        //A operação de emenda removerá 1 item,
        //começando na posição 1 na matriz (ou seja 3452),
        //e o substituirá pelo novo item 1010.
        this.$forceUpdate();
      }
    },*/

    reset: function () {},
    salvar: function () {},

    setListModulesSelect: function () {
      let list = getListModules();
      let i;
      let lisRetorno = [];

      this.panelList = [];
      for (i = 0; i < list.length; i++) {
        let objModulo = list[i];
        this.panelList.push(i);
        lisRetorno[i] = objModulo;
      }
      this.listaModulos = lisRetorno;

      this.preencherPermissaoPorModulos();
    },

    getListRole: async function () {
      try {
        this.listaRoles = await execGet(this.urlAPIRoles);
      } catch (e) {
        this.$dialog.error({
          title: "Erro list Role",
          text: e,
        });
      }
    },

    preencherPermissaoPorModulos: async function () {
      this.listaModule = [];
      this.overlay = true;
      this.listaActioncheked = [];
      this.listaMenucheked = [];
      let totModulo = this.listaModulos.length;
      let tot = [];
      for (let a = 0; a < totModulo; a++) {
        let obj = new Object();
        let modulo = this.listaModulos[a];
        let grupoUser = this.selectGrupoUsuario;
        obj.modulo = modulo;
        obj.listaModule = await getListPermissionStorageSession(
          modulo,
          grupoUser
        );
        obj.listaActioncheked = [];
        obj.listaMenucheked = [];
        for (let i = 0; i < obj.listaModule.length; i++) {
          let modulo = obj.listaModule[i];
          let men = 0;
          for (men; men < modulo.menu.length; men++) {
            let menu = modulo.menu[men];
            //if (menu.checked) {
            //this.listaMenucheked.push(menu.name);
            //obj.listaMenucheked.push(menu.name);
            //}
            let totalItenCheked = 0;
            for (let act = 0; act < menu.actions.length; act++) {
              let action = menu.actions[act];
              if (action.checked) {
                //this.listaActioncheked.push(action.name);
                obj.listaActioncheked.push(action.name);
                if (action.name.includes(menu.name)) {
                  totalItenCheked++;
                }
              }
            }
            if (menu.actions.length === totalItenCheked) {
              obj.listaMenucheked.push(menu.name);
            }
          }
        }
        tot.push(obj);
        this.listaActioncheked.push(obj.listaMenucheked);
        this.listaMenucheked.push(obj.listaActioncheked);
      }
      //console.log("action ", this.listaActioncheked);
      //console.log("menu ", this.listaMenucheked);
      this.listaModule = tot;
      console.log(this.listaModule);
      this.overlay = false;
    },
  },
};
</script>