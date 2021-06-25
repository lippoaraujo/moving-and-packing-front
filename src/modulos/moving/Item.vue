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
                :label="$t('tradLabelConsultaGrid')"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              multi-sort
              :loading="objLoadingGrid"
              :loading-text="$t('tradLoadConsultaGrid')"
              :search="search"
              :footer-props="{
                'items-per-page-text': $t('tradItemPorPaginaGrid'),
              }"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  v-if="permiteEditar"
                  medium
                  class="mr-2"
                  :title="$t('tradTitleBtnAlterar')"
                  @click="alterar(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon
                  v-if="permiteExcluir"
                  medium
                  class="mr-2"
                  :title="$t('tradTitleBtnExcluir')"
                  @click="excluir(item)"
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
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="objForm.name"
                      :counter="200"
                      :rules="nameRules"
                      :label="$t('tradNamePackingEN')"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="objForm.name_pt"
                      :counter="200"
                      :rules="nameRulesPt"
                      :label="$t('tradNamePackingPT')"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="objForm.name_es"
                      :counter="200"
                      :rules="nameRulesEs"
                      :label="$t('tradNamePackingES')"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="objForm.description"
                      :label="$t('tradDescriptionItem')"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <!--<v-text-field
                      v-model="objForm.cubic_feet"
                      label="Cubic feet"
                      style="text-align: right"
                      v-money="money"
                      ref="price"
                      outlined
                    ></v-text-field> -->
                    <vuetify-money
                      v-model="objForm.cubic_feet"
                      :label="label"
                      :placeholder="placeholder"
                      :readonly="readonly"
                      :disabled="disabled"
                      :outlined="outlined"
                      :clearable="clearable"
                      :valueWhenIsEmpty="valueWhenIsEmpty"
                      :options="options"
                      :properties="properties"
                    />
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
                      :label="$t('tradMsgmPacking')"
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
                      :label="$t('tradQuantidadeItem')"
                      outlined
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <center>
                  <v-row>
                    <v-col class="pt-3 mt-3">
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
                    </v-col>
                    <v-col class="pt-3 mt-3">
                      <v-btn
                        dark
                        tile
                        color="blue darken-2"
                        class="mr-4 white--text"
                        @click="reset"
                      >
                        {{ $t("tradBtCancelarForm") }}
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
import { getPermissionExecAction } from "@/helper/getPermission.js";
import { execPost, execGet, execPut, execDell } from "@/helper/execRequests.js";

export default {
  directives: { mask },
  name: "Customer",

  data: () => ({
    permiteSalvar: false,
    permiteEditar: false,
    permiteExcluir: false,
    value: "0",
    label: "",
    placeholder: " ",
    readonly: false,
    disabled: false,
    outlined: true,
    clearable: true,
    valueWhenIsEmpty: "0.00",
    options: {
      locale: "en-US",
      prefix: "",
      suffix: "",
      length: 6,
      precision: 2,
    },
    properties: {
      hint: "",
      // You can add other v-text-field properties, here.
    },

    linguagem: null,
    overlay: false,
    urlAPI: process.env.VUE_APP_URL_CONNECTION + "/moving/items",
    urlAPIPacking: process.env.VUE_APP_URL_CONNECTION + "/moving/packings",

    /*money: {
      decimal: ".",
      thousands: "",
      precision: 2,
      masked: false // doesn't work with directive ,
    },*/

    listPacking: [],
    menu: "",

    itensTituloTabs: [],
    search: "",

    objForm: {
      id: "",
      name: "",
      name_pt: "",
      name_es: "",
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
    headers: [],
    desserts: [],
    //grid
    //form
    valid: true,
    nameRules: [],
    nameRulesPt: [],
    nameRulesEs: [],

    packingRules: [],

    select: null,
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;

    this.label = this.$i18n.t("tradCubiFeetNameItem");

    this.itensTituloTabs = [
      { id: 0, nome: this.$i18n.t("tradDadoAbaForm"), icon: "mdi-view-list" },
      {
        id: 1,
        nome: this.$i18n.t("tradCadastroAbaForm"),
        icon: "mdi-keyboard-variant",
      },
    ];

    this.headers = [
      {
        align: "start",
        text: "Código",
        value: "id",
      },

      {
        text: this.$i18n.t("tradNamePackingEN"),
        value: "name",
      },

      {
        text: this.$i18n.t("tradNamePackingPT"),
        value: "name_pt",
      },

      {
        text: this.$i18n.t("tradNamePackingES"),
        value: "name_es",
      },

      {
        text: this.$i18n.t("tradCubiFeetNameItem"),
        value: "cubic_feet",
      },
      {
        text: "Tag",
        value: "tag",
      },
      {
        text: this.$i18n.t("tradActionGrid"),
        value: "actions",
        sortable: "false",
      },
    ];

    this.nameRules = [
      (v) => !!v || this.$i18n.t("tradRuleNamePacking"),
      (v) =>
        (v && v.length <= 200) || this.$i18n.t("tradRuleNameLengthPacking"),
    ];
    this.nameRulesPt = [
      (v) => !!v || this.$i18n.t("tradRuleNameItemPT"),
      (v) => (v && v.length <= 200) || this.$i18n.t("tradRuleNameLengthItemPT"),
    ];
    this.nameRulesEs = [
      (v) => !!v || this.$i18n.t("tradRuleNameItemES"),
      (v) => (v && v.length <= 200) || this.$i18n.t("tradRuleNameLengthItemES"),
    ];
    this.packingRules = [(v) => !!v || this.$i18n.t("tradRulePackingRequired")];
    this.menu = getObjMenu(this.$route.path);
  },

  async mounted() {
    this.permiteSalvar = getPermissionExecAction("item-create");
    this.permiteEditar = getPermissionExecAction("item-edit");
    this.permiteExcluir = getPermissionExecAction("item-delete");
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
        let listData = await execGet(this.urlAPI);
        this.repassarListaObjetoArrayGrid(listData);
      } catch (e) {
        this.$dialog.error({
          title: "Erro list",
          text: e,
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

    salvar: async function () {
      try {
        this.overlay = true;
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
        this.$dialog.error({
          title: "Erro save",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    execSalvar: async function () {
      //let msgm = "Item " + this.objForm.name + " cadastrado com sucesso!";

      let msgm =
        this.$i18n.t("tradMsgmItem") +
        this.objForm.name +
        this.$i18n.t("tradMsgmSalvar");

      let objSalvar = {
        name: this.objForm.name,
        name_pt: this.objForm.name_pt,
        name_es: this.objForm.name_es,
        description: this.objForm.description,
        cubic_feet: this.objForm.cubic_feet,
        tag: this.objForm.tag,
        packing_id: this.objForm.packing.id,
        packing_qty: this.objForm.packing_qty,
      };
      //console.log(JSON.stringify(objSalvar));
      let retornoExecPost = await execPost(this.urlAPI, objSalvar);
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
      let msgm =
        this.$i18n.t("tradMsgmItem") +
        this.objForm.name +
        this.$i18n.t("tradMsgmAlterar");

      let urlPut = this.urlAPI.concat("/" + this.objForm.id);
      let objPut = {
        id: this.objForm.id,
        name: this.objForm.name,
        name_pt: this.objForm.name_pt,
        name_es: this.objForm.name_es,
        description: this.objForm.description,
        cubic_feet: this.objForm.cubic_feet,
        tag: this.objForm.tag,
        packing_id: this.objForm.packing.id,
        packing_qty: this.objForm.packing_qty,
      };
      let retornoExecPost = await execPut(urlPut, objPut);
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
        this.$dialog.message.error(this.$i18n.t("tradMsgmForm"), {
          position: "top-right",
          timeout: 5000,
        });
        return false;
      }
      return true;
    },

    reset: function () {
      this.$refs.objForm.reset();
      //this.$refs.price.$el.getElementsByTagName("input")[0].value = 0;
      this.objForm.id = "";
      this.tab = 0;
    },

    alterar: async function (item) {
      try {
        this.overlay = true;
        let urlGet = this.urlAPI.concat("/" + item.id);
        let objEdicao = await execGet(urlGet);
        this.objForm.id = objEdicao.id;
        this.objForm.name = objEdicao.name;
        this.objForm.name_pt = objEdicao.name_pt;
        this.objForm.name_es = objEdicao.name_es;
        this.objForm.description = objEdicao.description;
        this.objForm.cubic_feet = objEdicao.cubic_feet;

        //console.log("OOOO ", objEdicao.cubic_feet);
        //this.$refs.price.getElementsByTagName("input")[0].value =
        //objEdicao.cubic_feet;

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
        this.$dialog.error({
          title: "Erro get date update",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    getListPacking: async function () {
      try {
        //this.overlay = false;
        this.listPacking = await execGet(this.urlAPIPacking);
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date Packing",
          text: e,
        });
      } finally {
        //this.objLoadingGrid = false;
      }
    },

    execExcluir: async function (item) {
      try {
        this.overlay = true;
        let urlDelete = this.urlAPI.concat("/" + item.id);
        let msgm = item.name + this.$i18n.t("tradMsgmPacking");
        let returDell = await execDell(urlDelete);
        if (returDell) {
          this.$dialog.message.success(msgm, {
            position: "top-right",
            timeout: 5000,
          });
          return true;
        } else {
          return false;
        }
      } catch (e) {
        this.$dialog.error({
          title: "Erro delete date",
          text: e,
        });
      } finally {
        this.listar();
        this.overlay = false;
      }
    },

    excluir: async function (item) {
      await this.$dialog.info({
        title: this.$i18n.t("tradMsgmDeleteItem") + item.id,
        text: this.$i18n.t("tradMsgmDeleteItem") + item.name + " ?",
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