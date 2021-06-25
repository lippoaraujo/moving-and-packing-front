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
                  <v-form
                    v-on:submit.prevent="salvar(objForm)"
                    ref="objForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-select
                      v-model="objForm.selectGrupoUsuario"
                      :items="this.listaRoles"
                      :rules="grupoRules"
                      label="Role"
                      item-text="name"
                      item-value="id"
                      return-object
                      outlined
                      @change="setListModulesSelect"
                    ></v-select>

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

                    <v-card
                      v-if="listaModule.length"
                      style="width:100%;important"
                    >
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
                          <v-btn @click="ocultarExpandirModulos">
                            <span>{{ nomeBotaoOcultarExpandirModulos }}</span>
                            <v-icon>{{
                              iconeBotaoOcultarExpandirModulos
                            }}</v-icon>
                          </v-btn>

                          <!-- <v-btn @click="none">
                          <span>Ocultar</span>
                          <v-icon>mdi-upload-multiple</v-icon>
                        </v-btn> -->
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
                                      <th class="text-left subtitle-1">Menu</th>
                                      <th
                                        colspan="4"
                                        class="text-left subtitle-1"
                                      >
                                        Ações
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <!--<tr>
                                      <td colspan="2">
                                        {{ modulo.listaMenucheked }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colspan="2">
                                        {{ modulo.listaActioncheked }}
                                      </td>
                                    </tr>-->
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
                  </v-form>
                  <center>
                    <v-row>
                      <v-col>
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
                        <!--<v-btn
                          dark
                          tile
                          color="blue darken-2"
                          class="mr-4 white--text"
                          @click="reset"
                        >
                          Cancelar
                          <v-icon right dark>mdi-cancel</v-icon>
                        </v-btn> -->
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
  execPut,
} from "@/helper/execRequests.js";
import { getListPermissionStorageSession } from "@/modulos/system/helper/getSetPermissionStorageSession.js";
import { getPermissionExecAction } from "@/helper/getPermission.js";
import { getListModules } from "@/helper/listRoutes.js";
export default {
  name: "Permission",


  data: () => ({
    permiteSalvar: false,
    nomeBotaoOcultarExpandirModulos: "Ocultar",
    iconeBotaoOcultarExpandirModulos: "mdi-upload-multiple",
    exibeLIstaModulo: true,
    panelPai: [],

    linguagem: null,
    overlay: false,
    panelList: [],
    urlAPIGrupoUser: process.env.VUE_APP_URL_CONNECTION + "/system/usergroups",
    urlAPIRoutes: process.env.VUE_APP_URL_CONNECTION + "system/routes",
    urlAPIRoles: process.env.VUE_APP_URL_CONNECTION + "/system/roles",

    objForm: {
      selectGrupoUsuario: null,
    },
    valid: true,
    selectModulosGrupoUsuario: null,
    listaModulos: [],
    listaRoles: [],
    menu: "",
    //headerRequest: "",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/system/dashboard",

    itensTituloTabs: [],
    listaMenucheked: [],
    listaActioncheked: [],
    listaModule: [],

    drawer: null,
    tab: null,
    grupoRules: [],
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;
    this.menu = getObjMenu(this.$route.path);

    this.grupoRules = [
      (v) => !!v || this.$i18n.t("tradRolePermissaoGrupo"),
    ];

    this.itensTituloTabs = [
      { id: 0, nome: this.$i18n.t("tradPermissaoGrupoTitulo"), icon: "mdi-account-group" },
    ];
  },

  async mounted() {
    this.permiteSalvar = getPermissionExecAction("user-create");    
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
    await this.getListRole();
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
    ocultarExpandirModulos() {
      if (this.exibeLIstaModulo) {
        this.nomeBotaoOcultarExpandirModulos = "Ocultar";
        this.iconeBotaoOcultarExpandirModulos = "mdi-upload-multiple";
        this.exibeLIstaModulo = false;
        this.panelPai = this.panelList;
      } else {
        this.nomeBotaoOcultarExpandirModulos = "Exibir";
        this.iconeBotaoOcultarExpandirModulos = "mdi-download-multiple";
        this.exibeLIstaModulo = true;
        this.panelPai = [];
      }
    },
    /*all() {
      //https: github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-expansion-panels/prop-model.vue

      this.panelPai = this.panelList;
    },
    // Reset the panel
    none() {
      this.panelPai = [];
    },*/

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

      //console.log("existeMenuChecked :", existeMenuChecked);
      //console.log("Actioncheked :", module.listaActioncheked);

      let actionsNova = [];

      for (let g = 0; g < this.listaModule.length; g++) {
        let module = this.listaModule[g];

        if (module.listaActioncheked.length > 0) {
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
        } else {
          //ListActioncheked vazia preencher com as ações do menu escolhido
          //console.log("ListActioncheked vazia");
          //console.log(itemMenu.actions);
          if (existeMenuChecked) {
            for (let l = 0; l < itemMenu.actions.length; l++) {
              actionsNova.push(itemMenu.actions[l].name);
            }
          } else {
            actionsNova = [];
          }
        }
      }

      if (actionsNova.length > 0) {
        //retira elementos repetidos
        let novaArr = actionsNova.filter(
          (este, i) => actionsNova.indexOf(este) === i
        );
        //console.log("nameModuloActionsNova: ", nameModuloActionsNova);
        //console.log("o que vai adcionar: ", novaArr);
        this.adicionarAcoesModulosCheckbox(nameModuloActionsNova, novaArr);
      }
    },

    adicionarAcoesModulosCheckbox: function (nomeModulo, listaAcoes) {
      for (let z = 0; z < this.listaModule.length; z++) {
        let modulo = this.listaModule[z];
        if (modulo.modulo.name == nomeModulo) {
          //console.log("INICIO ", modulo.listaActioncheked.length);

          let listaAtual = modulo.listaActioncheked;

          //console.log("listaAtual", listaAtual);
          //console.log("listaAcoes", listaAcoes);

          let listaNova = listaAtual.concat(listaAcoes);
          //console.log("listaAtual NOVA", listaNova);

          modulo.listaActioncheked = [];
          modulo.listaActioncheked = listaNova;
        }
      }
      console.log("FIMMM ", this.listaModule);
    },

    reset: function () {},
    salvar: function () {
      this.overlay = true;

      if (this.validate()) {
        //console.log("listaModule", this.listaModule);
        // pra cada um dos modulos da lista cria um request put pra /system/roles/
        // passando o id do modulo na url, no body passa o nome do modulo em name e
        /// as permission um array com o id das permissoe que existem

        let arrayIdsDaPermissao = [];
        let listIdModuo = [];

        for (let a = 0; a < this.listaModule.length; a++) {
          let objMod = this.listaModule[a];
          //let nomeDoModulo = objMod.modulo.name;

          let listArrayPermissao = this.getListaArrayAction(
            objMod.listaActioncheked
          );
          arrayIdsDaPermissao.push(listArrayPermissao);
          if (listArrayPermissao.length > 0) {
            switch (objMod.modulo.name) {
              case "system":
                listIdModuo.push(42);
                break;
              case "moving":
                // code block
                listIdModuo.push(43);
                break;
              default:
                // code block
                break;
            }
          }
          //console.log("nomeDoModulo ", nomeDoModulo);
        }

        let a = [];
        for (let b = 0; b < arrayIdsDaPermissao.length; b++) {
          let list = arrayIdsDaPermissao[b];
          for (let c = 0; c < list.length; c++) {
            a.push(list[c]);
          }
        }
        if (listIdModuo.length > 0) {
          for (let d = 0; d < listIdModuo.length; d++) {
            a.push(listIdModuo[d]);
          }
        }
        this.execSalvar(a);
      } else {
        this.overlay = false;
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

    getListaArrayAction: function (listaActioncheked) {
      let arrayRetorno = [];
      let listaPermissaoUsuarioLogado = JSON.parse(
        sessionStorage.getItem("permissions")
      );
      for (let b = 0; b < listaPermissaoUsuarioLogado.length; b++) {
        let permissaoLogada = listaPermissaoUsuarioLogado[b];
        for (let z = 0; z < listaActioncheked.length; z++) {
          let actionName = listaActioncheked[z];
          if (permissaoLogada.name === actionName) {
            arrayRetorno.push(permissaoLogada.id);
          }
        }
      }
      return arrayRetorno;
    },

    execSalvar: async function (arrayIdsDaPermissao) {
      /*let msgm =
        this.$i18n.t("tradMsgmPacking") +
        this.objForm.name +
        this.$i18n.t("tradMsgmSalvar");*/

      let msgm =
        this.$i18n.t("tradMsgmPackingtradPermissaoGrupoTitulo") + " " +
        this.objForm.selectGrupoUsuario.name + " " +
        "alteradas com sucesso";

      let objSalvar = {
        name: this.objForm.selectGrupoUsuario.name,
        permission: arrayIdsDaPermissao,
      };
      console.log("objSalvar ", objSalvar);
      let url = this.urlAPIRoles.concat(
        "/" + this.objForm.selectGrupoUsuario.id
      );
      console.log(url);

      let retornoExecPost = await execPut(url, objSalvar);
      if (retornoExecPost) {
        this.$dialog.message.success(msgm, {
          position: "top-right",
          timeout: 5000,
        });
        this.overlay = false;
        return true;
      } else {
        this.overlay = false;
        return false;
      }
    },

    setListModulesSelect() {
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
      this.overlay = true;
      this.listaModule = [];
      this.listaActioncheked = [];
      this.listaMenucheked = [];
      let totModulo = this.listaModulos.length;
      let tot = [];
      for (let a = 0; a < totModulo; a++) {
        let obj = new Object();
        let modulo = this.listaModulos[a];
        let grupoUser = this.objForm.selectGrupoUsuario;
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
      //console.log(this.listaModule);
      //maximizando a lista de modulos
      this.panelPai = this.panelList;
      this.overlay = false;
    },
  },
};
</script>