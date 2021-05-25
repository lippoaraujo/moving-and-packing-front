<template>
  <v-app>
    <v-main class="backGroundLogin">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" xs="8" sm="8" md="8" lg="8" xl="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                      class="blue darken-4 rounded-l-lg"
                    >
                      <v-card-text class="white--text mt-2">
                        <h1 class="text-center display-1">
                          {{ nomeApp }}
                        </h1>
                        <div class="text-center">
                          <v-avatar
                            class="my-3 elevation-12"
                            color="white"
                            size="150"
                          >
                            <img src="@/assets/novo_logo.svg" />

                            <!--<img
                                src="https://placekitten.com/300/300"
                                size="1em"
                            /> -->
                          </v-avatar>
                        </div>

                        <h5 class="text-center">Ver:1.0</h5>
                      </v-card-text>

                      <div class="text-center mt3">
                        <!--<v-btn rounded outlined dark> Logar </v-btn>-->
                        <h5
                          :title="$t('tradEsqueceuSenha')"
                          style="cursor: pointer"
                          class="white--text"
                          @click="step++"
                        >
                          {{ $t("tradEsqueceuSenha") }}
                          <v-icon dark> mdi-progress-question </v-icon>
                        </h5>
                      </div>
                    </v-col>

                    <v-col
                      cols="12"
                      xs="12"
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                      class="white rounded-r-lg"
                    >
                      <v-card-text class="text--white mt-2">
                        <h3 class="text-center Heading 4">
                          {{ $t("tradTituloLogin") }}
                        </h3>
                        <p class="text-center Heading 6">
                          {{ $t("tradSubTituloLogin") }}
                        </p>
                        <!--<h5 class="text-center">
                          https://www.youtube.com/watch?v=jWoy_LQydvk
                        </h5>-->
                        <!--<h5>Informe o e-mail</h5>-->
                        <v-form
                          v-on:submit.prevent="logar(objForm)"
                          ref="formLogar"
                          lazy-validation
                        >
                          <v-text-field
                            label="E-mail"
                            name="email"
                            v-model="objForm.email"
                            prepend-inner-icon="mdi-email-send-outline"
                            type="text"
                            :rules="emailRules"
                          />
                          <v-text-field
                            :label="$t('tradSenha')"
                            v-model="objForm.senha"
                            :append-icon="
                              valuePassword ? 'mdi-eye-off' : 'mdi-eye'
                            "
                            @click:append="
                              () => (valuePassword = !valuePassword)
                            "
                            :type="valuePassword ? 'password' : 'text'"
                            prepend-inner-icon="mdi-form-textbox-password"
                            :rules="passwordRules"
                          />
                          <v-checkbox
                            v-model="objForm.checkContinuarConectado"
                            :label="$t('tradContinuarConectado')"
                            color="primary"
                            :value="true"
                            hide-details
                          ></v-checkbox>

                          <v-radio-group
                            :label="$t('tradLinguagem')"
                            row
                            v-model="radioLingauagem"
                          >
                            <v-radio v-on:click="setLocaleClick()" value="en">
                              <template v-slot:label>
                                <v-avatar
                                  class="my-3 elevation-12"
                                  color="white"
                                  size="40"
                                >
                                  <img src="@/assets/us.svg" />
                                </v-avatar>
                              </template>
                            </v-radio>
                            <v-radio
                              v-on:click="setLocaleClick()"
                              value="pt-BR"
                            >
                              <template v-slot:label>
                                <v-avatar
                                  class="my-3 elevation-12"
                                  color="white"
                                  size="40"
                                >
                                  <img src="@/assets/br.svg" />

                                  <!--<img
                                src="https://placekitten.com/300/300"
                                size="1em"
                            /> -->
                                </v-avatar>
                              </template>
                            </v-radio>
                            <v-radio v-on:click="setLocaleClick()" value="es">
                              <template v-slot:label>
                                <v-avatar
                                  class="my-3 elevation-12"
                                  color="white"
                                  size="40"
                                >
                                  <img src="@/assets/es.svg" />

                                  <!--<img
                                src="https://placekitten.com/300/300"
                                size="1em"
                            /> -->
                                </v-avatar>
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </v-form>
                      </v-card-text>

                      <div class="text-center mt3">
                        <v-btn @click="logar" color="blue darken-3" dark>
                          <v-icon left> mdi-login-variant </v-icon>
                          {{ $t("tradBtLogar") }}
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item :value="2">
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      sm="8"
                      md="8"
                      lg="8"
                      xl="8"
                      class="white rounded-l-lg"
                    >
                      <v-card-text class="text--white mt-8">
                        <h3 class="text-center Heading 4">
                          {{ $t("tradRecuperarSenha") }}
                        </h3>
                        <p class="text-center Heading 6">
                          {{ $t("tradRecuperarSenhaTexto") }}
                        </p>
                        <v-form>
                          <br />
                          <v-text-field
                            prepend-inner-icon="mdi-email-plus-outline"
                            :label="$t('tradInformeSeuEmail')"
                            type="E-mail"
                            color="blue darken-3"
                            :rules="emailRules"
                            required
                          />
                          <br />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt3">
                        <v-btn color="blue darken-4" dark>
                          <v-icon left> mdi-email-plus-outline </v-icon>
                          {{ $t("tradBtRecuperarSenha") }}
                        </v-btn>
                      </div>
                    </v-col>

                    <v-col
                      cols="12"
                      xs="12"
                      sm="4"
                      md="4"
                      lg="4"
                      xl="4"
                      class="blue darken-4 rounded-r-lg"
                    >
                      <v-card-text class="white--text mt-5">
                        <h1 class="text-center display-1">
                          {{ nomeApp }}
                        </h1>
                        <div class="text-center">
                          <v-avatar
                            class="my-3 elevation-12"
                            color="white"
                            size="150"
                          >
                            <img src="@/assets/novo_logo.svg" />

                            <!--<img
                                src="https://placekitten.com/300/300"
                                size="1em"
                            /> -->
                          </v-avatar>
                        </div>

                        <h5 class="text-center">Ver:1.0</h5>
                      </v-card-text>

                      <div class="text-center mt3">
                        <!--<v-btn rounded outlined dark> Logar </v-btn>-->
                        <h5
                          title="esqueceu a senha?"
                          style="cursor: pointer"
                          class="white--text"
                          @click="step--"
                        >
                          {{ $t("tradBtAcessarSistema") }}

                          <v-icon dark> mdi-login-variant </v-icon>
                        </h5>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
//import { Decrypt, Encrypt } from "@/plugins/minhacriptografia.js";

import { execGet } from "@/helper/execRequests.js";

//olhar isso https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-form/prop-rules.vue

export default {
  data: () => ({
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/auth/login",
    nomeApp: "",

    step: 1,
    overlay: false,
    valuePassword: true,

    radioLingauagem: "en",

    objForm: {
      email: "",
      senha: "",
      checkContinuarConectado: false,
    },

    objFormRecuperaSenha: {
      email: "",
    },

    emailRules: [],
    passwordRules: [],
  }),
  props: {
    source: String,
  },

  beforeCreate: function () {
    // the data object is not yet created
    this.overlay = true;
    //this.$i18n.locale =

    //localStorage.setItem("logado", false);
    /*let log = localStorage.getItem("logado");
    if (log == null) {
      localStorage.setItem("logado", false);
    }
    let checkContinuarConectado = localStorage.getItem(
      "checkContinuarConectado"
    );
    if (checkContinuarConectado === null) {
      localStorage.setItem("checkContinuarConectado", false);
      localStorage.setItem("logado", false);
    }
    if (!checkContinuarConectado) {
      localStorage.setItem("logado", false);
    }*/

    //localStorage.setItem("checkContinuarConectado", false);
    //sessionStorage.setItem("permissions", null);
    //localStorage.setItem("usuarioLogado", null);
  },
  mounted() {
    this.nomeApp = process.env.VUE_APP_NAME_APLICATION;

    let linguagem = localStorage.getItem("linguagemUsuario");

    if (linguagem != null) {
      this.radioLingauagem = linguagem;
      this.$i18n.locale = linguagem;
    } else {
      let userLanguage = (navigator.languages && navigator.languages[0]) || "";
      this.$i18n.locale = userLanguage;
      this.radioLingauagem = userLanguage;
      //console.log("userLanguage", userLanguage);
      //let userLanguageResumida = (
      //(navigator.languages && navigator.languages[0]) ||
      //""
      //).substr(0, 2);
      //console.log("userLanguageResumida", userLanguageResumida);
    }

    this.checkUserLogado();
  },

  computed: {},

  create: function () {
    // the data object is not yet created
    this.overlay = false;

    this.emailRules = [
      (v) => !!v || +this.$t("tradEmailObrigatorio"),
      (v) => /.+@.+\..+/.test(v) || this.$t("tradEmailInvalido"),
    ];
    this.passwordRules = [(v) => !!v || this.$t("tradSenhaObrigatoria")];
  },
  methods: {
    setLocaleClick() {
      let linguagem = this.radioLingauagem;
      //console.log(linguagem);
      this.$i18n.locale = linguagem;
      //this.$refs.formLogar.validate();
    },

    /*logar: function () {
      this.overlay = true;
      setTimeout(() => this.$router.push("modulos"), 3000);
    },*/

    logar: function () {
      //console.log(this.urlAPI);

      //let a = Encrypt("teste_da_goma");
      //console.log("criptografado: " + a);

      // Decrypt decryption
      //let b = Decrypt(a);
      //console.log("descriptografado: " + b);

      this.overlay = true;
      //CryptoProvider.AES.encrypt('my message', 'secret key 123').toString();

      if (this.validate()) {
        /*var objPost2 = {
          mensagem: "logar",
          sucesso: true,
          dados: [
            {
              email: this.objForm.email,
              password: this.objForm.senha,
            },
          ],
        };*/
        var objPost = {
          email: this.objForm.email,
          password: this.objForm.senha,
        };

        this.$axios.post(this.urlAPI, objPost).then(
          (response) => {
            if (response.status == 200) {
              //console.log(response.data);

              localStorage.setItem("token", response.data.token);

              if (this.objForm.checkContinuarConectado) {
                localStorage.setItem("checkContinuarConectado", true);
                localStorage.setItem("userLogado", true);
              } else {
                localStorage.setItem("checkContinuarConectado", false);
                sessionStorage.setItem("userLogado", true);
              }

              sessionStorage.setItem(
                "permissions",
                JSON.stringify(response.data.permissions)
              );

              if (Array.isArray(response.data.permissions)) {
                //logou
                localStorage.setItem("userAdmin", false);
              }

              if (response.data.permissions === true) {
                //logou como admin
                localStorage.setItem("userAdmin", true);
              }

              this.identificaUsuarioLogado();

              //olha o npm install idle-vue pra expirar sessao vue
              //console.log(response.data.expires_in); ve isso aqui pra encerrar seção
              //let dt = new Date(parseInt(response.data.expires_in) * 1000);
              //console.log(dt);
              //console.log(
              //dt.getHours.toString() + ":" + dt.getMinutes.toString()
              //);

              //console.log(response.data.dashboard.modules[0]);

              //console.log(response.data.token);
              //console.log(response.data.dashboard.modules);
            } else {
              this.overlay = false;
              //console.log(response);
              this.$dialog.message.error(response.toString(), {
                position: "top-right",
                timeout: 5000,
              });
            }
          },
          (error) => {
            try {
              if (error.response.data.code == 401) {
                this.overlay = false;
                /*this.$dialog.message.error("E-mail ou senha inválidos!", {
                  position: "top",
                  timeout: 5000,
                });*/

                this.$dialog.notify.error("E-mail ou senha inválidos!", {
                  position: "top",
                  timeout: 5000,
                });

                /*this.$dialog.message.info('E-mail ou senha inválidos!', {
                  position: 'top'
                });*/
              } else {
                this.overlay = false;
                this.$dialog.message.error(error.response.data.message, {
                  position: "top",
                  timeout: 5000,
                });
              }
            } catch (error) {
              this.overlay = false;
              this.$dialog.message.error("Erro de conexao! " + this.urlAPI, {
                position: "top-right",
                timeout: 5000,
              });
            }

            //console.log(error.response.data.code);

            //this.$router.push("modulos");
          }
        );
      } else {
        this.overlay = false;
      }
    },

    identificaUsuarioLogado: async function () {
      try {
        //console.log("getListaClienteAdd");
        //this.objLoadingGrid = true;
        //this.listaClienteAdd
        let urlGetUser = process.env.VUE_APP_URL_CONNECTION + "/auth/user";
        //console.log("urlGetUser", urlGetUser);
        let userLoged = await execGet(urlGetUser);
        //console.log("userLogeduserLogeduserLogeduserLogeduserLoged", userLoged);

        localStorage.setItem("usuarioLogado", JSON.stringify(userLoged));

        //seta linguagem
        localStorage.setItem("linguagemUsuario", this.$i18n.locale);

        this.$router.push("modulos");
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date user",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    validate: function () {
      //console.log(this.$refs.formLogar.validate());
      return this.$refs.formLogar.validate();
    },

    reset: function () {
      this.$refs.form.reset();
      this.objForm.login = "";
      this.objForm.senha = "";
    },

    resetValidation: function () {
      this.$refs.form.resetValidation();
    },

    checkUserLogado: function () {
      this.overlay = true;

      let checkContinuarLogado = JSON.parse(
        localStorage.getItem("checkContinuarConectado")
      );
      if (checkContinuarLogado === null) {
        checkContinuarLogado = false;
      }
      let userLogado = JSON.parse(sessionStorage.getItem("userLogado"));
      if (userLogado === null) {
        userLogado = JSON.parse(localStorage.getItem("userLogado"));
        if (userLogado === null) {
          userLogado = false;
        }
      }

      console.log("checkContinuarLogado", checkContinuarLogado);
      console.log("userLogado", userLogado);

      if (checkContinuarLogado) {
        if (userLogado) {
          //fazer requisição usando o token guardado
          //fazer requisição pra identificar usuario
          //redirecionar pra home
          this.getPermissaoPorToken();
        }
      } else {
        this.overlay = false;
      }
    },

    getPermissaoPorToken: async function () {
      try {
        let urlPermissionFOrToken =
          process.env.VUE_APP_URL_CONNECTION + "/system/users/permissions";
        let permissions = await execGet(urlPermissionFOrToken);

        if (typeof permissions.permissions === "boolean") {
          localStorage.setItem("userAdmin", true);
        } else {
          sessionStorage.setItem(
            "permissions",
            JSON.stringify(permissions.permissions)
          );
        }

        this.identificaUsuarioLogado();
      } catch (e) {
        this.$dialog.error({
          title: "Erro get permission for token",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },
  },
};
//this.$router.push('blog');
</script>
<style>
.backGroundLogin {
  background: rgb(9, 46, 100);
  background: radial-gradient(
    circle,
    rgba(9, 46, 100, 1) 0%,
    rgba(13, 71, 161, 1) 100%
  );
}
.container img {
  margin-right: 0px !important ;
}
</style>