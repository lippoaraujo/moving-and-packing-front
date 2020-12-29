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
                          title="esqueceu a senha?"
                          style="cursor: pointer"
                          class="white--text"
                          @click="step++"
                        >
                          Esqueceu a senha
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
                          Acesso ao sistema.
                        </h3>
                        <p class="text-center Heading 6">
                          Informe as credenciais para acessar o sistema!
                        </p>
                        <!--<h5 class="text-center">
                          https://www.youtube.com/watch?v=jWoy_LQydvk
                        </h5>-->
                        <!--<h5>Informe o e-mail</h5>-->
                        <v-form
                          v-on:submit.prevent="logar(objForm)"
                          ref="form"
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
                            label="Senha"
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
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt3">
                        <v-btn @click="logar" color="blue darken-3" dark>
                          <v-icon left> mdi-login-variant </v-icon>
                          Logar
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
                        <h3 class="text-center Heading 4">Recuperar senha</h3>
                        <p class="text-center Heading 6">
                          Informe seu e-mail para iniciar o processo de
                          recuperação de senha
                        </p>
                        <v-form>
                          <br />
                          <v-text-field
                            prepend-inner-icon="mdi-email-plus-outline"
                            label="Informe seu e-mail"
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
                          Recuperar senha
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
                          Acessar sistema
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
import { Decrypt, Encrypt } from "@/plugins/minhacriptografia.js";

import { execGet } from "@/helper/execRequests.js";

export default {
  data: () => ({
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/auth/login",
    nomeApp: "",

    step: 1,
    overlay: false,
    valuePassword: true,

    objForm: {
      email: "",
      senha: "",
    },

    objFormRecuperaSenha: {
      email: "",
    },

    emailRules: [
      (v) => !!v || "E-mail é obrigatorio",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido!",
    ],
    passwordRules: [(v) => !!v || "Senha é obrigatorio"],
  }),
  props: {
    source: String,
  },

  beforeCreate: function () {
    // the data object is not yet created
    this.overlay = true;
    //this.$i18n.locale =
  },
  mounted() {
    this.nomeApp = process.env.VUE_APP_NAME_APLICATION;
  },

  create: function () {
    sessionStorage.setItem("logado", false);
    // the data object is not yet created
    this.overlay = false;
  },
  methods: {
    /*logar: function () {
      this.overlay = true;
      setTimeout(() => this.$router.push("modulos"), 3000);
    },*/

    logar: function () {
      console.log(this.urlAPI);

      let a = Encrypt("teste_da_goma");
      console.log("criptografado: " + a);

      // Decrypt decryption
      let b = Decrypt(a);
      console.log("descriptografado: " + b);

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

              sessionStorage.setItem("logado", 1);
              sessionStorage.setItem("token", response.data.token);
              sessionStorage.setItem(
                "permissoesExecucao",
                JSON.stringify(response.data.dashboard.modules)
              );
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
        const AuthStr = "Bearer ".concat(sessionStorage.getItem("token"));
        let headerRequest = {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthStr,
          },
        };

        //console.log("getListaClienteAdd");
        this.objLoadingGrid = true;
        //this.listaClienteAdd
        let userLoged = await execGet.call(
          this,
          process.env.VUE_APP_URL_CONNECTION + "/auth/user",
          headerRequest
        );
        sessionStorage.setItem("usuarioLogado", JSON.stringify(userLoged));
        this.$router.push("modulos");
      } catch (e) {
        this.$dialog.message.error(
          "consultar dados usaurio logado: " + e.message,
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } finally {
        this.objLoadingGrid = false;
      }
    },

    validate: function () {
      return this.$refs.form.validate();
    },

    reset: function () {
      this.$refs.form.reset();
      this.objForm.login = "";
      this.objForm.senha = "";
    },

    resetValidation: function () {
      this.$refs.form.resetValidation();
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
</style>