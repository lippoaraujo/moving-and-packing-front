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

                        <!--<v-select
                          :items="listaGrupoPermissao"
                          v-model="objForm.listObjUserGroup"
                          label="Roles"
                          item-text="name"
                          item-value="id"
                          return-object
                          outlined
                          :rules="[(v) => !!v || 'Roles is required']"
                        ></v-select>-->
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
                            @click="execSalvar"
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
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>
<script>
import { mask } from "vue-the-mask";

//import { getObjMenu } from "@/helper/getModulosRotasActionsUserLogado.js";
import { getObjMenu } from "@/helper/listRoutes.js";

import { execPost, execGet } from "@/helper/execRequests.js";

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
    const AuthStr = "Bearer ".concat(sessionStorage.getItem("token"));
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

    salvarMudanca: async function () {
      try {
        this.overlay = true;
        if (this.validate()) {
          if (this.objForm.id > 0) {
            let retornoUpdate = await this.execUpdate();
            if (retornoUpdate) {
              this.cancelar();
              this.listar(false);
            }
          } else {
            let retornoSalvar = await this.execSalvar();
            if (retornoSalvar) {
              this.cancelar();
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
        arrayRole.push(role);
      }
      //arrayRole.push(this.objForm.listObjUserGroup);

      let objSalvar = {
        name: this.objForm.name,
        email: this.objForm.email,
        password: this.objForm.password,
        password_confirmation: this.objForm.confirmPassword,
        roles: arrayRole,
      };
      console.log("AAAQ");
      console.log(JSON.stringify(objSalvar));
      console.log("AAAQ");
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

    execSalvarAntigo: async function () {
      if (this.$refs.form.validate()) {
        if (this.objForm.id > 0) {
          let arrayRole = [];
          arrayRole.push(this.objForm.listObjUserGroup);

          let objUpdate = {
            id: this.objForm.id,
            tenant_id: 1,
            name: this.objForm.name,
            email: this.objForm.email,
            password: this.objForm.password,
            password_confirmation: this.objForm.confirmPassword,
            active: 1,
            roles: arrayRole,
          };
          let msgm = "User " + this.objForm.name + " alterado com sucesso!";
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
          let msgm = "User  " + this.objForm.name + " cadastrado com sucesso!";
          let objSalvar = {
            tenant_id: 1,
            name: this.objForm.name,
            email: this.objForm.email,
            password: this.objForm.password,
            password_confirmation: this.objForm.confirmPassword,
            active: 1,
            listObjUserGroup: this.objForm.listObjUserGroup.id,
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
            this.reset();
            this.listar();
          }

          /*this.$axios.post(this.urlAPI, objSalvar, this.headerRequest).then(
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
              let msgmErro = error.response.data.message + ":<br>";
              for (let obj in error.response.data.errors) {
                let msg = obj + ":";
                msg += error.response.data.errors[obj][0] + "<br>";
                //console.log(obj);
                //console.log(error.response.data.errors[obj][0]);
                msgmErro += msg;
              }
              this.$dialog.message.error(msgmErro, {
                position: "top-right",
                timeout: 5000,
              });
            }
          );*/
          /*.catch((error) => {
            console.log(error.response);
            //console.log(error);
            this.$dialog.message.error(error, {
              position: "top-right",
              timeout: 5000,
            });
          });*/
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

    alterar: async function (item) {
      let urlGet = this.urlAPI.concat("/" + item.id);

      try {
        this.objLoadingGrid = true;
        let objEdicao = await execGet.call(this, urlGet, this.headerRequest);
        this.objForm.id = objEdicao.id;
        this.objForm.name = objEdicao.name;
        this.objForm.email = objEdicao.email;
        /*let b = 0;
        for (b; b < this.listaGrupoPermissao.length; b++) {
          if (this.listaGrupoPermissao[b].id == objEdicao.listObjUserGroup) {
            this.objForm.listObjUserGroup = this.listaGrupoPermissao[b];
          }
        }*/
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

      /*let urlGet = this.urlAPI.concat("/" + item.id);
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
      );*/
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