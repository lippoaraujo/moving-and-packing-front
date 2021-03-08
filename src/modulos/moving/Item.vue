<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-icon> {{ menu.icon }}</v-icon>
          <span class="subtitle-1">{{ menu.nameExibicao }}</span>
        </v-col>
      </v-row>
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
                      label="Nome"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="objForm.description"
                      label="Description"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="objForm.cubic_feet"
                      label="Cubic feet"
                      style="text-align: right"
                      v-money="money"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="objForm.tag"
                      label="Tag"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-select
                      :items="listPacking"
                      v-model="objForm.packing"
                      label="Embalagem"
                      :item-text="(item) => item.name + ' - ' + item.unity"
                      item-value="id"
                      outlined
                      return-object
                      :rules="packingRules"
                    >
                      <!--<template slot="selection" slot-scope="data">
                        {{ data.item.name }} {{ data.item.unity }}
                      </template>-->
                    </v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="objForm.packing_qty"
                      label="Quantidade"
                      outlined
                      type="number"
                    ></v-text-field>
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
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>
<script>
import { mask } from "vue-the-mask";

import { getObjMenu } from "@/helper/listRoutes.js";

import { execPost, execGet, execPut } from "@/helper/execRequests.js";

export default {
  directives: { mask },
  name: "Customer",

  data: () => ({
    overlay: false,
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/moving/items",
    urlAPIPacking: process.env.VUE_APP_URL_CONNECTION + "/moving/packings",

    money: {
      decimal: ".",
      thousands: "",
      precision: 2,
      masked: true /* doesn't work with directive */,
    },
    listPacking: [],
    menu: "",
    headerRequest: "",

    itensTituloTabs: [
      { id: 0, nome: "Dados", icon: "mdi-view-list" },
      { id: 1, nome: "Cadastro", icon: "mdi-keyboard-variant" },
    ],
    search: "",

    objForm: {
      id: "",
      name: "",
      description: "",
      cubic_feet: "",
      tag: "",
      packing: "",
      packing_qty: "",
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
        text: "Description",
        value: "description",
      },
      {
        text: "Cubic feet",
        value: "cubic_feet",
      },
      {
        text: "Tag",
        value: "tag",
      },
      {
        text: "Ações",
        value: "actions",
        sortable: "false",
      },
    ],
    desserts: [],
    //grid
    //form
    valid: true,
    nameRules: [
      (v) => !!v || "Nome e obrigatório",
      (v) =>
        (v && v.length <= 200) || "O Nome deve ter no máximo 200 caracteres",
    ],

    packingRules: [(v) => !!v || "Embalagem é obrigatorio"],

    select: null,
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
    this.listar();
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
    this.getListPacking();
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
    listar: async function () {
      try {
        this.overlay = true;
        this.objLoadingGrid = true;
        let listData = await execGet.call(
          this,
          this.urlAPI,
          this.headerRequest
        );
        this.repassarListaObjetoArrayGrid(listData);
      } catch (e) {
        this.$dialog.message.error("Erro consultar dados Item: " + e.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.overlay = false;
        this.objLoadingGrid = false;
      }
    },

    repassarListaObjetoArrayGrid: function (list) {
      this.desserts = [];
      //console.log(list.data);
      if (list.length > 0) {
        let a = 0;
        for (a; a < list.length; a++) {
          let item = list[a];
          this.desserts.push(item);
        }
      }
    },

    execUpdate: async function () {
      let urlPut = this.urlAPI.concat("/" + this.objForm.id);
      let objPut = {
        id: this.objForm.id,
        name: this.objForm.name,
        description: this.objForm.description,
        cubic_feet: this.objForm.cubic_feet,
        tag: this.objForm.tag,
        packing_id: this.objForm.packing.id,
        packing_qty: this.objForm.packing_qty,
      };
      let msgm = "Item " + this.objForm.name + " alterado com sucesso!";

      //console.log(JSON.stringify(objSalvar));
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

    execSalvar: async function () {
      let msgm = "Item " + this.objForm.name + " cadastrado com sucesso!";
      let objSalvar = {
        name: this.objForm.name,
        description: this.objForm.description,
        cubic_feet: this.objForm.cubic_feet,
        tag: this.objForm.tag,
        packing_id: this.objForm.packing.id,
        packing_qty: this.objForm.packing_qty,
      };

      //console.log(JSON.stringify(objSalvar));
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

    salvar: async function () {
      try {
        this.objLoadingGrid = true;

        if (this.validate()) {
          if (this.objForm.id > 0) {
            let retornoAlterar = await this.execUpdate();
            if (retornoAlterar) {
              this.reset();
              this.listar();
            }
          } else {
            let retornoSalvar = await this.execSalvar();
            if (retornoSalvar) {
              this.reset();
              this.listar();
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
        this.objLoadingGrid = false;
      }
    },

    validate: function () {
      return this.$refs.form.validate();
    },

    reset: function () {
      this.$refs.form.reset();
      this.tab = 0;
    },

    resetValidation: function () {
      this.$refs.form.resetValidation();
    },

    alterar: async function (item) {
      this.overlay = true;
      //?id=7&get_data=true
      //orders/2?get_data=true

      let urlGet = this.urlAPI.concat("/" + item.id + "?get_data=true");

      try {
        let objEdicao = await execGet.call(this, urlGet, this.headerRequest);
        this.objForm.id = objEdicao.id;
        this.objForm.name = objEdicao.name;
        this.objForm.description = objEdicao.description;
        this.objForm.cubic_feet = objEdicao.cubic_feet;
        this.objForm.tag = objEdicao.tag;
        let b = 0;
        for (b; b < this.listPacking.length; b++) {
          if (this.listPacking[b].id == objEdicao.packing_id) {
            this.objForm.packing = this.listPacking[b];
          }
        }
        this.objForm.packing_qty = objEdicao.packing_qty;
        this.tab = 1;
      } catch (e) {
        this.$dialog.message.error(
          "Erro consultar dados alterar mudança: " + e.message,
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } finally {
        this.overlay = false;
      }
    },

    getListPacking: async function () {
      try {
        this.objLoadingGrid = true;
        this.listPacking = await execGet.call(
          this,
          this.urlAPIPacking,
          this.headerRequest
        );
      } catch (e) {
        this.$dialog.message.error("search data packing: " + e.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.objLoadingGrid = false;
      }
    },

    execExcluir: async function (item) {
      this.overlay = true;
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
            this.$dialog.error({
              title: "Erro del",
              text: response.data.mensagem,
            });
          }
        },
        (error) => {
          this.$dialog.error({
            title: "Erro del",
            text: error,
          });
        }
      );
      this.listar();
      this.overlay = false;
    },

    excluir: async function (item) {
      await this.$dialog.info({
        title: "Delete Item " + item.id,
        text: "Delete Item " + item.name + " ?",
        actions: {
          true: {
            text: "OK",
            handle: () => {
              this.execExcluir(item);
              return true;
            },
          },
        },
      });
    },
  },
};
</script>