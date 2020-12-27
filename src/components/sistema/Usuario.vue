<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <span> <v-icon>mdi-account-box</v-icon>Pessoas </span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialogDetalhar" persistent max-width="700px">
          <v-card>
            <v-card-title class="blue darken-2">
              <v-icon class="a_link white--text" x-large
                >mdi-account-box</v-icon
              >
              <h1 class="headline white--text">Detalhar</h1>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <h4>Nome: {{ this.nomeDetalhar }}</h4>
                    <h4>Coordenador: {{ this.cooredenadorDetalhar }}</h4>
                  </v-col>
                  <v-col>
                    <h4>
                      Titulo-zona-seção: {{ this.tituloZonaSecaoDetalhar }}
                    </h4>
                    <h4>E-mail: {{ this.emailDetalhar }}</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4>Tel1: {{ this.telefone1Detalhar }}</h4>
                    <h4>Tel2: {{ this.telefone2Detalhar }}</h4>
                  </v-col>
                  <v-col>
                    <h4>
                      Endereço - Número: {{ this.endDetalhar }},
                      {{ this.numDetalhar }}
                    </h4>
                    <h4>
                      Bairro - Cidade: {{ this.baiDetalhar }} -
                      {{ this.cidDetalhar }}
                    </h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4>Observação: {{ this.obsDetalhar }}</h4>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDetalhar = false"
                >Fechar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs
            hide-on-leave="true"
            v-model="tab"
            background-color="blue darken-2"
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
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-card-search-outline"
                        label="Consulta rapida"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-select
                        v-model="objForm.coordenadorBusca"
                        :items="listaCoordenadores"
                        item-text="nome"
                        item-value="id"
                        label="Busca por coordenador"
                        required
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-btn
                        style="margin-top: 10px"
                        block
                        color="blue darken-2"
                        class="mr-4 white--text"
                        title="Buscar"
                        @click="listar"
                      >
                        Consultar por Coordenador
                        <v-icon dark>mdi-account-search</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn
                        style="margin-top: 10px"
                        block
                        color="blue darken-2"
                        class="mr-4 white--text"
                        title="Imprimir"
                        @click="print"
                      >
                        Imprimir
                        <v-icon dark>mdi-printer</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
                <v-card-text>
                  <v-data-table
                    id="printMe"
                    :headers="headers"
                    :items="desserts"
                    multi-sort
                    :loading="objLoadingGrid"
                    loading-text="Carregando... Aguarde"
                    :search="search"
                    v-model="tabelaDeDados"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                        title="Detalhar"
                        @click="detalhar(item)"
                        >mdi-clipboard-edit-outline</v-icon
                      >
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
                </v-card-text>
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
                        <v-select
                          v-model="objForm.coordenador"
                          :items="listaCoordenadores"
                          item-text="nome"
                          item-value="id"
                          :rules="[(v) => !!v || 'Coordenador é obrigatório']"
                          label="Coordenador"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="objForm.nome"
                          :counter="200"
                          :rules="nameRules"
                          label="Nome"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="objForm.tel1"
                          :counter="15"
                          :rules="foneRules"
                          label="Telefone"
                          required
                          placeholder="(##) #####/####"
                          type="text"
                          v-mask="['(##) ####-####', '(##) #####-####']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="objForm.tel2"
                          :counter="15"
                          :rules="foneRules"
                          label="Telefone2"
                          required
                          placeholder="(##) #####/####"
                          type="text"
                          v-mask="['(##) ####-####', '(##) #####-####']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="10">
                        <v-text-field
                          v-model="objForm.endereco"
                          label="Endereco"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="objForm.numero"
                          label="Numero"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="objForm.bairro"
                          label="Bairro"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="objForm.cidade"
                          label="Cidade"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="objForm.email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="objForm.titulo"
                          label="Título"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="objForm.zona"
                          label="Zona"
                          v-mask="['###']"
                          placeholder="####"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="objForm.secao"
                          label="Seção"
                          v-mask="['###']"
                          placeholder="####"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                          v-model="objForm.obs"
                          label="Observação"
                          rows="4"
                        ></v-textarea>
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

export default {
  directives: { mask },

  name: "Pessoa",
  data: () => ({
    urlAPI: process.env.BASE_URL + "api/",

    itensTituloTabs: [
      { id: 0, nome: "Dados", icon: "mdi-view-list" },
      { id: 1, nome: "Cadastro", icon: "mdi-keyboard-variant" },
    ],
    search: "",
    dialogDetalhar: false,
    listaCoordenadores: [],
    nomeDetalhar: "",
    cooredenadorDetalhar: "",
    telefone1Detalhar: "",
    telefone2Detalhar: "",
    emailDetalhar: "",
    tituloZonaSecaoDetalhar: "",
    endDetalhar: "",
    numDetalhar: "",
    baiDetalhar: "",
    cidDetalhar: "",
    obsDetalhar: "",
    objForm: {
      id: "",
      coordenador: "",
      nome: "",
      tel1: "",
      tel2: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      email: "",
      titulo: "",
      zona: "",
      secao: "",
      obs: "",
    },
    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid
    headers: [],
    desserts: [],
    //grid

    //form
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Nome é obrigatório",
      (v) =>
        (v && v.length <= 200) || "O Nome deve ter no máximo 200 caracteres",
    ],

    foneRules: [(v) => !!v || "Telefone é obrigatorio"],

    emailRules: [
      (v) => !!v || "E-mail é obrigatorio",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido!",
    ],
    select: null,
  }),
  created() {
    this.$vuetify.theme.dark = false;
    this.listarCoordenadores();
    this.listar();
    /* pode usar esses dialogs com o https://github.com/yariksav/vuetify-dialog#readme */
    /*this.$dialog.warning({
      text: "Do you really want to exit?",
      title: "Warning",
    });*/
    /*this.$dialog.error({
      text: "Cannot delete this item",
      title: "Error",
    });*/
    /*this.$dialog.notify.info("Test notification", {
      position: "top-right",
      timeout: 5000,
    });*/

    //this.$confirm("Do you really want to exit?", { title: "Warning" });
    /*
    this.$dialog.confirm({
      text: "Texto",
      title: "Warning",

      actions: {
        false: {
          color: "red",
          text: "Cancelar",
        },
        true: {
          color: "blue",
          text: "Ok",
          handle: () => {
            return new Promise((resolve) => {
              setTimeout(resolve, 3000);
            });
          },
        },
      },

      icon: "mdi-delete", // to disable icon just put false
      width: 500,
    });*/
  },

  methods: {
    listar: function () {
      this.objLoadingGrid = true;
      let idCoordenadorBusca = null;
      if (typeof this.objForm.coordenadorBusca === "object") {
        idCoordenadorBusca = this.objForm.coordenadorBusca.id;
      } else {
        idCoordenadorBusca = this.objForm.coordenadorBusca;
      }

      this.tab = "tab-1";
      this.desserts = [];
      this.desserts = [];
      var car = {
        mensagem: "listarPessoas",
        sucesso: true,
        dados: [
          {
            coordenador_id: idCoordenadorBusca,
          },
        ],
      };

      var myJSON = JSON.stringify(car);

      this.$axios.post(this.urlAPI, myJSON, null).then(
        (response) => {
          if (response.data.sucesso) {
            this.headers = response.data.dados.headers;
            this.desserts = response.data.dados.desserts;
          } else {
            this.$dialog.message.error(
              "Consultar dados pessoa: " + response.data.mensagem,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
          this.objLoadingGrid = false;
        },
        (error) => {
          this.$dialog.message.error("Consultar dados pessoa: " + error, {
            position: "top-right",
            timeout: 5000,
          });
          this.objLoadingGrid = false;
        }
      );
    },

    salvar: function () {
      if (this.$refs.form.validate()) {
        var idCoo = null;
        if (typeof this.objForm.coordenador === "object") {
          idCoo = this.objForm.coordenador.id;
        } else {
          idCoo = this.objForm.coordenador;
        }

        var sub = {
          mensagem: "salvarPessoa",
          sucesso: true,
          dados: [
            {
              id: this.objForm.id,
              nome: this.objForm.nome,
              coordenador_id: idCoo,
              tel1: this.objForm.tel1,
              tel2: this.objForm.tel2,
              endereco: this.objForm.endereco,
              numero: this.objForm.numero,
              bairro: this.objForm.bairro,
              cidade: this.objForm.cidade,
              email: this.objForm.email,
              titulo: this.objForm.titulo,
              zona: this.objForm.zona,
              secao: this.objForm.secao,
              obs: this.objForm.obs,
            },
          ],
        };

        let msgm = "Pessoa " + this.objForm.nome + " cadastrada com sucesso!";
        if (this.objForm.id > 0) {
          msgm = "Pessoa " + this.objForm.nome + " alterada com sucesso!";
        }
        this.$axios.post(this.urlAPI, sub).then(
          (response) => {
            if (response.data.sucesso) {
              this.$dialog.message.success(msgm, {
                position: "top-right",
                timeout: 5000,
              });
              this.reset();
              this.listar();
            } else {
              this.$dialog.message.error(response.data.mensagem, {
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
    },

    validate: function () {
      this.$refs.form.validate();
    },

    reset: function () {
      this.$refs.form.reset();
      this.objForm.id = "";
      this.objForm.nome = "";
      this.coordenador_id = this.listaCoordenadores;
      this.objForm.tel1 = "";
      this.objForm.tel2 = "";
      this.objForm.endereco = "";
      this.objForm.numero = "";
      this.objForm.bairro = "";
      this.objForm.cidade = "";
      this.objForm.email = "";
      this.objForm.titulo = "";
      this.objForm.zona = "";
      this.objForm.secao = "";
      this.objForm.obs = "";
      this.tab = 0;
    },

    resetValidation: function () {
      this.$refs.form.resetValidation();
    },

    alterar: function (item) {
      var objGet = {
        mensagem: "buscarPessoa",
        sucesso: true,
        dados: [
          {
            id: item.id,
          },
        ],
      };

      var myJSON = JSON.stringify(objGet);

      this.$axios.post(this.urlAPI, myJSON, null).then(
        (response) => {
          if (response.data.sucesso) {
            //this.listarCoordenadores();
            let objEdicao = response.data.dados.obj[0];
            this.objForm.id = objEdicao.id;
            this.objForm.nome = objEdicao.nome;
            this.objForm.tel1 = objEdicao.tel1;
            this.objForm.tel2 = objEdicao.tel2;
            //seta o objeto no select
            this.objForm.coordenador = {
              id: objEdicao.coordenador_id,
              nome: objEdicao.coordenador,
            };
            //seta o objeto no select
            this.objForm.endereco = objEdicao.endereco;
            this.objForm.numero = objEdicao.numero;
            this.objForm.bairro = objEdicao.bairro;
            this.objForm.cidade = objEdicao.cidade;
            this.objForm.email = objEdicao.email;
            this.objForm.titulo = objEdicao.titulo;
            this.objForm.zona = objEdicao.zona;
            this.objForm.secao = objEdicao.secao;
            this.objForm.obs = objEdicao.obs;
            this.tab = 1;
          } else {
            this.$dialog.message.error(
              "Alterar dados pessoa: " + response.data.mensagem,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
        },
        (error) => {
          this.$dialog.message.error("Alterar dados pessoa: " + error, {
            position: "top-right",
            timeout: 5000,
          });
        }
      );
    },

    excluir: function (item) {
      var objPost = {
        mensagem: "excluirPessoa",
        sucesso: true,
        dados: [
          {
            id: item.id,
          },
        ],
      };

      var myJSON = JSON.stringify(objPost);

      this.$axios.post(this.urlAPI, myJSON, null).then(
        (response) => {
          if (response.data.sucesso) {
            this.$dialog.message.success(
              "Pessoa " + item.nome + " excluído(a) com sucesso!",
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          } else {
            this.$dialog.message.error(
              "Excluir dados pessoa: " + response.data.mensagem,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
        },
        (error) => {
          this.$dialog.message.error("Excluir dados pessoa: " + error, {
            position: "top-right",
            timeout: 5000,
          });
        }
      );
      this.listar();
    },

    detalhar: function (item) {
      var objGet = {
        mensagem: "buscarPessoa",
        sucesso: true,
        dados: [
          {
            id: item.id,
          },
        ],
      };

      var myJSON = JSON.stringify(objGet);

      this.$axios.post(this.urlAPI, myJSON, null).then(
        (response) => {
          if (response.data.sucesso) {
            //this.listarCoordenadores();
            let objEdicao = response.data.dados.obj[0];
            this.nomeDetalhar = objEdicao.nome;

            this.listaCoordenadores.forEach((element) => {
              if (element.id == objEdicao.coordenador_id) {
                this.cooredenadorDetalhar = element.nome;
              }
            });

            this.cooredenadorDetalhar = objEdicao.coordenador;
            this.telefone1Detalhar = objEdicao.tel1;
            this.telefone2Detalhar = objEdicao.tel2;
            this.emailDetalhar = objEdicao.email;
            this.tituloZonaSecaoDetalhar = objEdicao.titulo_zona_secao;

            this.endDetalhar = objEdicao.endereco;
            this.numDetalhar = objEdicao.numero;
            this.baiDetalhar = objEdicao.bairro;
            this.cidDetalhar = objEdicao.cidade;
            this.obsDetalhar = objEdicao.obs;

            this.dialogDetalhar = true;
          } else {
            this.$dialog.message.error(
              "Detalhar dados pessoa: " + response.data.mensagem,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
        },
        (error) => {
          this.$dialog.message.error("Detalhar dados pessoa: " + error, {
            position: "top-right",
            timeout: 5000,
          });
        }
      );
    },

    listarCoordenadores: function () {
      this.listaCoordenadores = [];
      var car = {
        mensagem: "listarCoordenadores",
        sucesso: true,
        dados: [],
      };

      var myJSON = JSON.stringify(car);

      let itemInicialEmBranco = {
        id: "",
        nome: "",
        bairro: "",
        email: "",
        tel1: "",
        tel2: "",
      };

      this.$axios.post(this.urlAPI, myJSON, null).then(
        (response) => {
          if (response.data.sucesso) {
            //this.listaCoordenadores = response.data.dados.desserts;
            let listaObj = response.data.dados.desserts;
            //console.log(listaObj);
            //for (var obj in listaObj) {
            this.listaCoordenadores.push(itemInicialEmBranco);
            for (var i = 0; i < listaObj.length; i++) {
              //console.log(listaObj[i]);
              this.listaCoordenadores.push(listaObj[i]);
            }
          } else {
            this.$dialog.message.error(
              "Consultar dados coordenadores pessoa: " + response.data.mensagem,
              {
                position: "top-right",
                timeout: 5000,
              }
            );
          }
        },
        (error) => {
          this.$dialog.message.error(
            "Consultar dados coordenadores pessoa: " + error,
            {
              position: "top-right",
              timeout: 5000,
            }
          );
        }
      );
    },

    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe");
    },
  },
};
</script>