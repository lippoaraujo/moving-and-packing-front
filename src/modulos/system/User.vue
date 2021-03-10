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
                    ref="objForm"
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
                        <v-text-field
                          v-model="objForm.email"
                          :counter="200"
                          :rules="emailRules"
                          label="Email"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="objForm.password"
                          :rules="passwordRules"
                          label="Password"
                          :append-icon="
                            valuePassword ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append="() => (valuePassword = !valuePassword)"
                          :type="valuePassword ? 'password' : 'text'"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Confirm Password"
                          v-model="objForm.confirmPassword"
                          :append-icon="
                            valuePasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append="
                            () => (valuePasswordConfirm = !valuePasswordConfirm)
                          "
                          :type="valuePasswordConfirm ? 'password' : 'text'"
                          :rules="
                            confirmPasswordRules.concat(
                              passwordConfirmationRule
                            )
                          "
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-select
                          v-model="objForm.listObjUserGroup"
                          :items="listaGrupoPermissao"
                          chips
                          label="Roles"
                          multiple
                          outlined
                          attach
                          item-text="name"
                          item-value="id"
                          return-object
                          :rules="[(v) => !!v || 'Roles is required']"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <center>
                      <v-row>
                        <v-col class="pt-3 mt-3">
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

//import { getObjMenu } from "@/helper/getModulosRotasActionsUserLogado.js";
import { getObjMenu } from "@/helper/listRoutes.js";

import { execPost, execGet, execPut } from "@/helper/execRequests.js";

export default {
  directives: { mask },
  name: "User",

  data: () => ({
    overlay: false,
    urlAPIGrupoUser: process.env.VUE_APP_URL_CONNECTION + "/system/roles",
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/system/users",
    menu: "",
    headerRequest: "",

    itensTituloTabs: [
      { id: 0, nome: "Dados", icon: "mdi-view-list" },
      { id: 1, nome: "Cadastro", icon: "mdi-keyboard-variant" },
    ],
    search: "",

    valuePassword: true,
    valuePasswordConfirm: true,

    objForm: {
      id: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      listObjUserGroup: "",
    },
    listaGrupoPermissao: [],

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
        text: "E-mail",
        value: "email",
      },
      {
        text: "Role",
        value: "roleNames",
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
      (v) => !!v || "Please type name",
      (v) => (v && v.length <= 200) || "minimum 200 caracteres",
    ],
    emailRules: [
      (v) => !!v || "Please type e-mail",
      (v) => /.+@.+\..+/.test(v) || "E-mail invalid!",
    ],

    passwordRules: [
      (value) => !!value || "Please type password.",
      (value) => (value && value.length >= 6) || "minimum 6 characters",
    ],
    confirmPasswordRules: [
      (value) => !!value || "type confirm password",
      (value) => (value && value.length >= 6) || "minimum 6 characters",
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
    this.overlay = true;
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
    await this.getListaGrupoPermissao();
    this.listar();
    this.overlay = false;
  },

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.objForm.password === this.objForm.confirmPassword ||
        "Password must match";
    },

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
    listar: function (exibeLoad = true) {
      this.objLoadingGrid = true;

      if (exibeLoad) {
        this.objLoadingGrid = true;
      }

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
          let item = list.data[a];

          if (item.roles.length > 0) {
            let b = 0;
            let roleNames = "";
            for (b; b < item.roles.length; b++) {
              let role = item.roles[b];
              roleNames += role.name + " ";
            }
            item.roleNames = roleNames;

            this.desserts.push(item);
          }
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
              this.listar(false);
            }
          } else {
            let retornoSalvar = await this.execSalvar();
            if (retornoSalvar) {
              this.reset();
              this.listar(false);
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

    execSalvar: async function () {
      let msgm = "User  " + this.objForm.name + " cadastrado com sucesso!";

      let arrayRole = [];
      let u = 0;
      for (u; u < this.objForm.listObjUserGroup.length; u++) {
        let role = this.objForm.listObjUserGroup[u];
        arrayRole.push(role.id);
      }
      //arrayRole.push(this.objForm.listObjUserGroup);

      let objSalvar = {
        name: this.objForm.name,
        email: this.objForm.email,
        password: this.objForm.password,
        password_confirmation: this.objForm.confirmPassword,
        roles: arrayRole,
      };

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

    execUpdate: async function () {
      let urlPut = this.urlAPI.concat("/" + this.objForm.id);
      let msgm = "User  " + this.objForm.name + " alterado com sucesso!";

      let arrayRole = [];
      let u = 0;
      for (u; u < this.objForm.listObjUserGroup.length; u++) {
        let role = this.objForm.listObjUserGroup[u];
        arrayRole.push(role.id);
      }

      let objPut = {
        name: this.objForm.name,
        email: this.objForm.email,
        password: this.objForm.password,
        password_confirmation: this.objForm.confirmPassword,
        roles: arrayRole,
      };

      console.log("ALTERAR");
      console.log(JSON.stringify(objPut));
      console.log("ALTERAR");

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

    validate: function () {
      if (!this.$refs.objForm.validate()) {
        this.$dialog.message.error(
          "Observe o formulário, existe campos inválidos",
          {
            position: "top-right",
            timeout: 5000,
          }
        );
        return false;
      }
      return true;
    },

    reset: function () {
      //this.resetValidation();
      this.$refs.objForm.reset();
      this.tab = 0;
    },

    alterar: async function (item) {
      let urlGet = this.urlAPI.concat("/" + item.id);

      try {
        this.objLoadingGrid = true;
        let objEdicao = await execGet.call(this, urlGet, this.headerRequest);

        console.log("carrega obj edicao");
        console.log(objEdicao);
        console.log("carrega obj edicao");
        let a = 0;
        this.objForm.listObjUserGroup = [];
        console.log(this.objForm.listObjUserGroup);
        for (a; a < objEdicao.roles.length; a++) {
          this.objForm.listObjUserGroup.push(objEdicao.roles[a]);
        }
        this.objForm.id = objEdicao.id;
        this.objForm.name = objEdicao.name;
        this.objForm.email = objEdicao.email;
        this.tab = 1;
      } catch (e) {
        this.$dialog.message.error(
          "Erro consultar dados alterar usuario: " + e.message,
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } finally {
        this.objLoadingGrid = false;
      }
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

    getListaGrupoPermissao: async function () {
      try {
        this.objLoadingGrid = true;
        this.listaGrupoPermissao = await execGet.call(
          this,
          this.urlAPIGrupoUser,
          this.headerRequest
        );
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

      /*this.objLoadingGrid = true;
      this.$axios.get(this.urlAPIGrupoUser, this.headerRequest).then(
        (response) => {
          if (response.status == 200) {
            this.listaGrupoPermissao = response.data.data;
          } else {
            this.$dialog.message.error(
              "Erro consultar dados Grupo Permissao: " + response.status,
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
          this.$dialog.message.error(
            "Erro consultar dados Grupo Permissao: " + error,
            {
              position: "top-right",
              timeout: 5000,
            }
          );
        }
      );*/
    },
  },
};
</script>