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
                <!--<v-icon 
                  medium 
                  class="mr-2" 
                  title="Resumo" 
                  @click="resumo(item)"
                  >mdi-layers-outline
                </v-icon>-->

                <v-icon
                  medium
                  class="mr-2"
                  :title="$t('tradOrderRelatorio')"
                  @click="relatorio(item)"
                  >mdi-layers-triple-outline
                </v-icon>

                <v-icon
                  medium
                  class="mr-2"
                  :title="$t('tradTitleBtnAlterar')"
                  @click="alterar(item)"
                  >mdi-pencil
                </v-icon>
                
                <v-icon 
                  medium 
                  :title="$t('tradTitleBtnExcluir')" 
                  @click="excluir(item)"
                  >mdi-delete
                </v-icon>
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
                    <v-select
                      :items="listaVendedorAdd"
                      v-model="objForm.vendedor"
                      :disabled="disabledSelectVendedor == 1"
                      item-text="name"
                      item-value="id"
                      outlined
                      return-object
                      :label="$t('tradOrderVendedor')"
                      :rules="regrasVendedor"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :items="listaClienteAdd"
                      v-model="objForm.cliente"
                      item-text="name"
                      item-value="id"
                      outlined
                      return-object
                      :label="$t('tradMsgmCustomer')"
                      :rules="regrasCliente"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-menu
                      ref="menuDataMudanca"
                      v-model="menuDataMudanca"
                      :close-on-content-click="false"
                      :return-value.sync="objForm.dateMudanca"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormated"                          
                          :label="$t('tradOrderDataMudanca')"
                          readonly
                          outlined
                          hide-details="true"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="pt-br"
                        v-model="objForm.dateMudanca"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuDataMudanca = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.menuDataMudanca.save(objForm.dateMudanca)
                          "
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-checkbox                      
                      :label="$t('tradOrderEnderecoMudanca')"
                      hide-details="true"
                      v-model="objForm.checkedEndereco"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-row v-if="!objForm.checkedEndereco">
                  <v-col>
                    <p class="subtitle-1 ma-0 pa-0">{{$t('tradOrderNomeEndereco')}}</p>
                  </v-col>
                </v-row>

                <v-row v-if="!objForm.checkedEndereco">
                  <v-col xs="12" sm="12" md="10" lg="10" xl="10">
                    <v-text-field
                      v-model="objForm.address"
                      :label="$t('tradEnderecoCustumer')"
                      outlined
                    ></v-text-field>
                    <!--<v-text-field
                      v-model="objForm.address"
                      label="Endereco"
                      outlined
                      :required="!objForm.checkedEndereco ? true : false"
                      :rules="[(v) => !!v || 'Endereco is required']"
                    ></v-text-field>-->
                  </v-col>
                  <v-col xs="12" sm="12" md="2" lg="2" xl="2">
                    <!--<v-text-field
                      v-model="objForm.postcode"
                      label="Cep"
                      outlined
                      :required="!objForm.checkedEndereco ? true : false"
                      :rules="[(v) => !!v || 'Cep is required']"
                    ></v-text-field>-->
                    <v-text-field
                      v-model="objForm.postcode"
                      :label="$t('tradCepCustumer')"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="!objForm.checkedEndereco">
                  <v-col xs="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                      v-model="objForm.city"
                      :label="$t('tradCidadeCustumer')"
                      outlined
                      :required="!objForm.checkedEndereco ? true : false"
                      :rules="cityRules"
                    ></v-text-field>
                  </v-col>
                  <v-col xs="12" sm="12" md="3" lg="3" xl="3">
                    <v-text-field
                      v-model="objForm.locality"
                      :label="$t('tradEstadoCustumer')"
                      outlined
                      :required="!objForm.checkedEndereco ? true : false"
                      :rules="localityRules"
                    ></v-text-field>
                  </v-col>
                  <v-col xs="12" sm="12" md="3" lg="3" xl="3">
                    <v-text-field
                      v-model="objForm.country"
                      :label="$t('tradPaisCustumer')"
                      outlined
                      :required="!objForm.checkedEndereco ? true : false"
                      :rules="countryRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <p class="subtitle-1 ma-0 pa-0"> {{$t('tradOrderNomeComodosMudanca')}}</p>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-select
                      :items="listaComodoAdd"
                      v-model="objForm.comodo"
                      ref="refComodo"
                      :label="$t('tradOrderNomeComodo')"
                      hide-details="true"
                      item-text="name"
                      item-value="id"
                      return-object
                      outlined
                      solo
                    ></v-select>
                  </v-col>
                </v-row>
                <center>
                  <v-row>
                    <v-col xs="12" sm="12" md="6" lg="6" xl="6">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            dark
                            rounded
                            color="blue darken-2"
                            class="mr-4"
                            @click="openDialogAddItemComodo"
                          >
                            {{$t('tradMsgmItem')}}                            
                            <v-icon right dark>mdi-scatter-plot</v-icon>
                          </v-btn>
                        </template>
                        <span>{{$t('tradOrderNomeItensComodo')}}</span>
                      </v-tooltip>
                    </v-col>

                    <v-col xs="12" sm="12" md="6" lg="6" xl="6">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            dark
                            rounded
                            color="blue darken-2"
                            class="mr-4"
                            @click="openDialogImagensComodo"
                          >
                            {{$t('tradOrderNomeImagem')}}
                            <v-icon right dark>mdi-camera</v-icon>
                          </v-btn>
                        </template>
                        <span>{{$t('tradOrderNomeImagemComodo')}}</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </center>
                <v-row>
                  <v-col>
                    <v-textarea
                      class="pa-0 ma-0"
                      v-model="objForm.obsComodo"
                      auto-grow
                      hide-details="true"
                      outlined                      
                      :label="$t('tradOrderNomeObsComodo')"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <center>
                  <v-row>
                    <v-col xs="12" sm="12" md="6" lg="6" xl="6">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            dark
                            rounded
                            color="blue darken-2"
                            class="mr-4"
                            @click="addComodoStorage"
                          >
                            {{ $t("tradBtSalvarForm") }}
                            <v-icon right dark>mdi-content-save</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t("tradOrderNomeAddComodo") }}</span>
                      </v-tooltip>
                    </v-col>

                    <v-col xs="12" sm="12" md="6" lg="6" xl="6">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            dark
                            rounded
                            color="blue darken-2"
                            class="mr-4"
                            @click="cancelarComodoStorage"
                          >
                            {{ $t("tradBtCancelarForm") }}
                            <v-icon right dark>mdi-cancel</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t("tradOrderNomeAddComodo") }}</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </center>

                <v-row>
                  <v-col>
                    <p class="subtitle-1 ma-0 pa-0">{{ $t("tradOrderNomeComodoAdicionado") }}</p>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    class="ms-4 mr-5 pa-0 overflow-y-auto elevation-5 rounded-lg"
                    style="height: 200px"
                  >
                    <v-expansion-panels accordion>
                      <v-expansion-panel v-if="listaComodoExibir === null">
                        <v-expansion-panel-header>
                          {{ $t("tradOrderNenhumComodoAdicionado") }}
                        </v-expansion-panel-header>
                      </v-expansion-panel>

                      <v-expansion-panel
                        v-else
                        v-for="(itemComodo, index) in listaComodoExibir"
                        :key="index"
                      >
                        <v-expansion-panel-header>
                          {{ itemComodo.comodo.id }} - {{ $t("tradOrderNomeComodo") }}:
                          {{ itemComodo.comodo.name }} ----- {{ $t("tradOrderTotCubi") }}:
                          {{ itemComodo.totalCubic }}
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                          <v-row no-gutters>
                            <v-col
                              class="text--secondary"
                              cols="12"
                              xs="12"
                              sm="12"
                              md="8"
                              lg="8"
                              xl="8"
                            >
                              {{ itemComodo.obs }}
                            </v-col>

                            <v-col cols="6" xs="6" sm="6" md="1" lg="1" xl="1">
                              <center>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-badge
                                      bordered
                                      overlap
                                      :content="itemComodo.totalItens"
                                      :value="itemComodo.totalItens"
                                      color="green"
                                    >
                                      <v-avatar size="50">
                                        <v-img
                                          src="@/assets/item.svg"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="
                                            abrirlogAddItemComodo(
                                              itemComodo.comodo,
                                              itemComodo.idArrayComodo
                                            )
                                          "
                                          style="cursor: pointer"
                                        ></v-img>
                                      </v-avatar>
                                    </v-badge>
                                  </template>
                                  <span>{{ $t("tradMsgmItem") }} {{ itemComodo.comodo.name }}:
                                    {{ itemComodo.totalItens }}
                                  </span>
                                </v-tooltip>
                                <p>{{ $t("tradMsgmItem") }}</p>
                              </center>
                            </v-col>

                            <v-col cols="6" xs="6" sm="6" md="1" lg="1" xl="1">
                              <center>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-badge
                                      bordered
                                      overlap
                                      :content="itemComodo.totalImagens"
                                      :value="itemComodo.totalImagens"
                                      color="green"
                                    >
                                      <v-avatar size="50">
                                        <v-img
                                          src="@/assets/imagens.svg"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="
                                            abrirlogAddImagemComodo(
                                              itemComodo.comodo,
                                              itemComodo.idArrayComodo
                                            )
                                          "
                                          style="cursor: pointer"
                                        ></v-img>
                                      </v-avatar>
                                    </v-badge>
                                  </template>
                                  <span>
                                    {{ $t("tradOrderNomeImagem") }} {{ itemComodo.comodo.name }}:
                                    {{ itemComodo.totalImagens }}
                                  </span>
                                </v-tooltip>
                                <p>{{ $t("tradOrderNomeImagem") }}</p>
                              </center>
                            </v-col>

                            <v-col cols="6" xs="6" sm="6" md="1" lg="1" xl="1">
                              <center>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-avatar size="50">
                                      <v-img
                                        src="@/assets/alterar.svg"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="
                                          editComodoStorage(
                                            itemComodo.comodo.id,
                                            itemComodo.idArrayComodo
                                          )
                                        "
                                        style="cursor: pointer"
                                      ></v-img>
                                    </v-avatar>
                                  </template>
                                  <span>
                                    {{ $t("tradTitleBtnAlterar") }} {{ itemComodo.comodo.name }}
                                  </span>
                                </v-tooltip>
                                <p>{{ $t("tradTitleBtnAlterar") }}</p>
                              </center>
                            </v-col>

                            <v-col cols="6" xs="6" sm="6" md="1" lg="1" xl="1">
                              <center>
                                <v-tooltip top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-avatar size="50">
                                      <v-img
                                        src="@/assets/excluir.svg"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="
                                          delComodoStorage(
                                            itemComodo.comodo.id,
                                            itemComodo.idArrayComodo
                                          )
                                        "
                                        style="cursor: pointer"
                                      ></v-img>
                                    </v-avatar>
                                  </template>
                                  <span>
                                    {{ $t("tradTitleBtnExcluir") }} {{ itemComodo.comodo.name }}
                                  </span>
                                </v-tooltip>
                                <p>{{ $t("tradTitleBtnExcluir") }}</p>
                              </center>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
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
                        @click="cancelarMudanca"
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
      <PoupUpAddItemComodo
        v-bind:variavelShowModal="varOpenDialogItemComodo"
        v-on:closeModal="closeDialogAddItemComodo"
        v-bind:variavelIdMudanca="variavelIdMudanca"
        v-bind:variavelIdComodo="variavelIdComodo"
        v-bind:variavelIdArrayComodo="variavelIdArrayComodo"
        @update:varOpenDialogItemComodo="varOpenDialogItemComodo = $event"
      />
      <PoupUpAddImagemComodo
        v-bind:variavelShowModalImageComodo="varOpenDialogImagensComodo"
        v-on:closeModal="closeDialogImagensComodo"
        v-bind:variavelIdMudanca="variavelIdMudanca"
        v-bind:variavelIdComodo="variavelIdComodo"
        v-bind:variavelIdArrayComodo="variavelIdArrayComodo"
        @update:varOpenDialogImagensComodo="varOpenDialogImagensComodo = $event"
      />
    </v-col>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>
<script>
//https://www.flaticon.com/packs/logistics-delivery-19?word=package
//https://www.flaticon.com/packs/logistics-68?word=package

//ITENS COMODO: 014-data warehouse.png
//IMAGENS COMODO: 071-worldwide.png
//ALTERAR COMODO: 046-delivery.png

import { mask } from "vue-the-mask";
import { getObjMenu } from "@/helper/listRoutes.js";
import PoupUpAddItemComodo from "@/modulos/moving/components/PoupUpAddItemComodo.vue";
import PoupUpAddImagemComodo from "@/modulos/moving/components/PoupUpAddImagemComodo.vue";

import moment from "moment";

import { execPost, execGet, execPut, execDell } from "@/helper/execRequests.js";
import { getNewIdArrayComodo } from "@/modulos/moving/helper/getSetComodoStorageSession.js";
import {
  exportResumoHtml,
  exportRelatorioHtmlNovo,
} from "@/modulos/moving/helper/getRlatoriosOrders.js";

import {
  setComodoStorageSession,
  getListComodoStorageSession,
  delComodoStorageSession,
  updateComodoStorageSession,
  setAllComodosByMudanca,
  checkComodoAoMenosUmItem,
  cancelComodoStorageSession,
} from "@/modulos/moving/helper/getSetComodoStorageSession.js";

export default {
  directives: { mask },
  name: "Orders",

  components: {
    PoupUpAddItemComodo,
    PoupUpAddImagemComodo,
  },

  data: () => ({
    linguagem: null,
    overlay: false,

    urlAPICustomers: process.env.VUE_APP_URL_CONNECTION + "/moving/customers",
    urlAPIItems: process.env.VUE_APP_URL_CONNECTION + "/moving/items",
    urlAPIRooms: process.env.VUE_APP_URL_CONNECTION + "/moving/rooms",
    urlAPIGetVendedores: process.env.VUE_APP_URL_CONNECTION + "/moving/sellers",
    urlAPIOrders: process.env.VUE_APP_URL_CONNECTION + "/moving/orders",
    urlAPIUserLoged: process.env.VUE_APP_URL_CONNECTION + "/auth/user",

    objForm: {
      id: "",
      vendedor: "",
      cliente: "",
      checkedEndereco: false,
      address: "",
      postcode: "",
      city: "",
      locality: "",
      country: "",
      dateMudanca: new Date().toISOString().substr(0, 10),
    },

    menuDataMudanca: false,
    //dateMudanca: new Date().toISOString().substr(0, 10),

    listaVendedorAdd: null,
    listaClienteAdd: null,
    listaComodoAdd: null,

    variavelIdMudanca: 0,
    variavelIdComodo: 0,
    variavelIdArrayComodo: 0,

    /*DIALOGO ITENS COMODO*/
    varOpenDialogItemComodo: false,
    /*DIALOGO ITENS COMODO*/

    /*DIALOGO IMAGENS COMODO*/
    varOpenDialogImagensComodo: false,
    /*DIALOGO IMAGENS COMODO*/

    /* LISTA DE IMAGENS DO COMODO */
    listaImagensComodo: [],
    /* LISTA DE IMAGENS DO COMODO */

    /* LISTA DE ITENS DO COMODO */
    listaItensComodo: [],
    /* LISTA DE ITENS DO COMODO */

    alterandoComodoPosicaoArray: null,
    objComodoOriginarioEdit: null,
    listaComodoExibir: null,

    money: {
      decimal: ".",
      thousands: "",
      precision: 2,
      masked: true /* doesn't work with directive */,
    },

    menu: "",

    itensTituloTabs: [],
    search: "",

    drawer: null,
    tab: null,
    objLoadingGrid: true,
    //grid
    headers: [],
    desserts: [],
    //grid
    //objForm
    valid: true,

    regrasVendedor: [],
    regrasCliente: [],
    cityRules:[],
    localityRules:[],
    countryRules: [],

    select: null,
    disabledSelectVendedor: 0,
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;

    this.itensTituloTabs = [
      { id: 0, nome: this.$i18n.t("tradDadoAbaForm"), icon: "mdi-view-list" },
      {
        id: 1,
        nome: this.$i18n.t("tradCadastroAbaForm"),
        icon: "mdi-keyboard-variant",
      },
    ];



    this.regrasVendedor = [(v) => !!v || this.$i18n.t("tradOrderRuleVendedorObrigaotrio")];

    this.regrasCliente = [(v) => !!v || this.$i18n.t("tradOrderRuleClienteObrigaotrio")];

    this.cityRules = [
      (v) => !!v || this.$i18n.t("tradRuleCityRequiredCustumer"),
    ];
    this.localityRules = [
      (v) => !!v || this.$i18n.t("tradRuleLocalityRequiredCustumer"),
    ];
    this.countryRules = [
      (v) => !!v || this.$i18n.t("tradRuleCountryRequiredCustumer"),
    ];



    this.headers = [
      {
        align: "start",
        text: "Codigo",
        value: "id",
      },
      {
        text: this.$i18n.t("tradMsgmCustomer"),
        value: "customer_id",
      },
      {
        text: this.$i18n.t("tradOrderVendedor"),
        value: "user_id",
      },
      {
        text: this.$i18n.t("tradOrderDataMudanca"),
        value: "expected_date",
      },
      {
        text: this.$i18n.t("tradActionGrid"),
        value: "actions",
        sortable: "false",
      },
    ],

    this.menu = getObjMenu(this.$route.path);
  },

  async mounted() {
    this.overlay = true;
    this.getEstadoMenu = true;
    this.getCaminhoBreadCrumb = this.$route.path.split("/");
    window.onpopstate = () => {
      location.reload();
    };
    this.limparItensSessaoMudanca();
    await this.getListaClienteAdd();
    await this.getListaComodosAdd();
    await this.identificaUsuarioLogado();
    await this.preencherComodoListaStorage();
    await this.listar();
    this.resetComodo();
    this.overlay = false;
  },

  computed: {
    dateFormated: {
      get() {
        return moment(this.objForm.dateMudanca).format("DD/MM/YYYY");
      },
      set() {
        let dt = new Date().toISOString().substr(0, 10);
        return moment(dt).format("DD/MM/YYYY");
      },
    },

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
    /*DIALOGO ITENS COMODO*/
    abrirlogAddItemComodo: function (objComodo, idArrayComodo) {
      this.cancelarComodoStorage();
      if (objComodo.order_id != undefined) {
        this.variavelIdMudanca = objComodo.order_id;
      }
      this.variavelIdComodo = objComodo.id;
      this.variavelIdArrayComodo = idArrayComodo;
      updateComodoStorageSession(
        this.variavelIdMudanca,
        objComodo.id,
        idArrayComodo
      );
      this.varOpenDialogItemComodo = true;
    },

    openDialogAddItemComodo: function (value) {
      if (this.objForm.comodo === undefined || this.objForm.comodo === "") {        
        this.$dialog.message.error(
          this.$i18n.t("tradOrderRuleEscolhaComodo"),
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } else {
        this.variavelIdComodo = this.objForm.comodo.id;
        if (this.variavelIdComodo <= 0) {
          this.$dialog.message.error(
            this.$i18n.t("tradOrderRuleEscolhaComodo"),
            {
              position: "top-right",
              timeout: 5000,
            }
          );
        } else {
          this.varOpenDialogItemComodo = value;
        }
      }
    },

    closeDialogAddItemComodo: function () {
      this.preencherComodoListaStorage();
      //this.resetComodo();
      this.varOpenDialogItemComodo = false;
    },
    /*DIALOGO ITENS COMODO*/

    /*DIALOGO IMAGENS COMODO*/
    abrirlogAddImagemComodo: function (objComodo, idArrayComodo) {
      this.cancelarComodoStorage();
      this.variavelIdComodo = objComodo.id;
      if (objComodo.order_id != undefined) {
        this.variavelIdMudanca = objComodo.order_id;
      }
      this.variavelIdArrayComodo = idArrayComodo;
      updateComodoStorageSession(
        this.variavelIdMudanca,
        objComodo.id,
        idArrayComodo
      );
      this.varOpenDialogImagensComodo = true;
    },

    openDialogImagensComodo: function (value) {
      if (this.objForm.comodo === undefined || this.objForm.comodo === "") {
        this.$dialog.message.error(
          this.$i18n.t("tradOrderRuleEscolhaComodoImg"),
          {
            position: "top-right",
            timeout: 5000,
          }
        );
      } else {
        this.variavelIdComodo = this.objForm.comodo.id;
        if (this.variavelIdComodo <= 0) {
          this.$dialog.message.error(
            this.$i18n.t("tradOrderRuleEscolhaComodoImg"),
            {
              position: "top-right",
              timeout: 5000,
            }
          );
        } else {
          this.varOpenDialogImagensComodo = value;
        }
      }
    },

    closeDialogImagensComodo: function () {
      this.preencherComodoListaStorage();
      //this.resetComodo();
      this.varOpenDialogImagensComodo = false;
    },
    /*DIALOGO IMAGENS COMODO*/

    listar: async function (exibeLoad = true) {
      try {
        if (exibeLoad) {
          this.objLoadingGrid = true;
        }
        let dados = await execGet(this.urlAPIOrders);
        this.repassarListaObjetoArrayGrid(dados);
      } catch (e) {
        this.$dialog.error({
          title: "Erro list order",
          text: e,
        });
      } finally {
        if (exibeLoad) {
          this.objLoadingGrid = false;
        }
      }
    },

    repassarListaObjetoArrayGrid: function (list) {
      this.desserts = [];
      if (list.length > 0) {
        let a = 0;
        for (a; a < list.length; a++) {
          let item = list[a];
          item.expected_date = moment(item.expected_date).format("DD/MM/YYYY");
          let cli = 0;
          for (cli; cli < this.listaClienteAdd.length; cli++) {
            if (this.listaClienteAdd[cli].id == item.customer_id) {
              item.customer_id = this.listaClienteAdd[cli].name;
              break;
            }
          }
          let vend = 0;
          for (vend; vend < this.listaVendedorAdd.length; vend++) {
            //console.log(item.user_id);
            //console.log(this.listaVendedorAdd[vend].id);
            if (this.listaVendedorAdd[vend].id == item.user_id) {
              //console.log(this.listaVendedorAdd[vend].name);
              item.user_id = this.listaVendedorAdd[vend].name;
              break;
            }
          }
          this.desserts.push(item);
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
              this.cancelarMudanca();
              this.listar(false);
            }
          } else {
            let retornoSalvar = await this.execSalvar();
            if (retornoSalvar) {
              this.cancelarMudanca();
              this.listar(false);
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

    execUpdate: async function () {
      let urlPut = this.urlAPIOrders.concat("/" + this.objForm.id);
      let msgm =
        this.$i18n.t("tradMsgmOrder") +
        this.objForm.name +
        this.$i18n.t("tradMsgmAlterar");
      let address_data_obj = null;
      if (!this.objForm.checkedEndereco) {
        address_data_obj = {
          address: this.objForm.address,
          postcode: this.objForm.postcode,
          city: this.objForm.city,
          locality: this.objForm.locality,
          country: this.objForm.country,
        };
      }
      let roomsListObj = this.listaComodoExibir;
      let objPut = {
        customer_signature: "",
        id: this.objForm.id,
        price: 0,
        expected_date: moment(this.objForm.dateMudanca).format("YYYY-MM-DD"),
        user_id: this.objForm.vendedor.id,
        customer_id: this.objForm.cliente.id,
        address_data: address_data_obj,
        rooms: roomsListObj,
      };
      console.log("ALTERAR", objPut);
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

    execSalvar: async function () {
      let msgm =
        this.$i18n.t("tradMsgmOrder") +
        this.objForm.name +
        this.$i18n.t("tradMsgmSalvar");
      let address_data_obj = null;
      if (!this.objForm.checkedEndereco) {
        address_data_obj = {
          address: this.objForm.address,
          postcode: this.objForm.postcode,
          city: this.objForm.city,
          locality: this.objForm.locality,
          country: this.objForm.country,
        };
      }
      let roomsListObj = this.listaComodoExibir;
      let objSalvar = {
        customer_signature: "",
        price: 0,
        expected_date: moment(this.objForm.dateMudanca).format("YYYY-MM-DD"),
        user_id: this.objForm.vendedor.id,
        customer_id: this.objForm.cliente.id,
        address_data: address_data_obj,
        rooms: roomsListObj,
      };
      console.log("SALVAR", objSalvar);
      let retornoExecPost = await execPost(this.urlAPIOrders, objSalvar);
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
          this.$i18n.t("tradMsgmOrderFormulario"),
          {
            position: "top-right",
            timeout: 5000,
          }
        );
        return false;
      }
      if (
        this.listaComodoExibir == null ||
        this.listaComodoExibir == undefined
      ) {
        this.$dialog.message.error(
          this.$i18n.t("tradMsgmOrderUmComodo"),
          {
            position: "top-right",
            timeout: 5000,
          }
        );
        return false;
      }
      return true;
    },

    limparItensSessaoMudanca: function () {
      localStorage.removeItem("storageListaItemComodo");
      localStorage.removeItem("storageListaImagensComodoNovo");
      localStorage.removeItem("storageListaComodo");
    },

    cancelarMudanca: function () {
      this.limparItensSessaoMudanca();
      //console.log(this.$refs.objForm);
      this.$refs.objForm.reset();
      this.objForm.id = "";
      let dt = moment(this.objForm.dateMudanca).format("DD/MM/YYYY");
      this.menuDataMudanca = true;
      this.$refs.menuDataMudanca.save(dt);
      this.dateFormated = dt;
      this.listaComodoExibir = null;
      this.alterandoComodoPosicaoArray = null;
      this.objComodoOriginarioEdit = null;
      this.variavelIdMudanca = 0;
      this.variavelIdComodo = 0;
      this.tab = 0;
    },

    relatorio: async function (item) {
      this.overlay = true;
      let urlGet = this.urlAPIOrders.concat("/" + item.id + "?get_data=true");
      try {
        let objGetEdicao = await execGet(urlGet);

        let varText = await exportRelatorioHtmlNovo(
          objGetEdicao,
          this.urlAPICustomers
        );

        await this.$dialog.info({
          title: "Order: " + item.id,
          text: varText,
          actions: {
            false: {
              text: this.$i18n.t("tradOrderImprimir"),
              handle: () => {
                this.$htmlToPaper("printMe");
                return false;
              },
            },
          },
        });
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date relatorio",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    resumo: async function (item) {
      this.overlay = true;
      let urlGet = this.urlAPIOrders.concat("/" + item.id + "?get_data=true");
      try {
        let objGetEdicao = await execGet(urlGet);
        let varText = await exportResumoHtml(
          objGetEdicao,
          this.urlAPICustomers
        );

        await this.$dialog.info({
          title: this.$i18n.t("tradOrderResumoPedido") + item.id,
          text: varText,
          actions: {
            false: {
              text: this.$i18n.t("tradOrderImprimir"),
              handle: () => {
                this.$htmlToPaper("printMe");
                return false;
              },
            },
          },
        });
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date resumo",
          text: e,
        });
      } finally {
        this.overlay = false;
      }
    },

    alterar: async function (item) {
      try {
        this.overlay = true;
        let urlGet = this.urlAPIOrders.concat("/" + item.id + "?get_data=true");
        let objEdicao = await execGet(urlGet);
        this.objForm.id = objEdicao.id;
        this.variavelIdMudanca = objEdicao.id;
        this.objForm.vendedor = objEdicao.user;
        this.objForm.cliente = objEdicao.customer;
        this.objForm.dateMudanca = moment(objEdicao.expected_date).format(
          "YYYY-MM-DD"
        );
        if (objEdicao.address_id == objEdicao.customer.primary_address_id) {
          //o endereco e o mesmo do cliente
          this.objForm.address = "";
          this.objForm.postcode = "";
          this.objForm.city = "";
          this.objForm.locality = "";
          this.objForm.country = "";
          this.objForm.checkedEndereco = true;
        } else {
          //e outro endereco
          this.objForm.checkedEndereco = false;
          this.objForm.address = objEdicao.address.address;
          this.objForm.postcode = objEdicao.address.postcode;
          this.objForm.city = objEdicao.address.city;
          this.objForm.locality = objEdicao.address.locality;
          this.objForm.country = objEdicao.address.country;
        }
        this.limparItensSessaoMudanca();
        setAllComodosByMudanca(objEdicao.id, objEdicao.order_rooms);
        this.preencherComodoListaStorage();
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

    execExcluir: async function (item) {
      try {
        this.overlay = true;
        let urlDelete = this.urlAPIOrders.concat("/" + item.id);
        let msgm = this.$i18n.t("tradMsgmOrderDel") +  item.customer_id + this.$i18n.t("tradMsgmOrderDelFim");
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
        title: this.$i18n.t("tradMsgmOrderDel") + item.id,
        text: this.$i18n.t("tradMsgmOrderDel") + item.id + " ?",
        actions: {
          true: {
            text: "OK",
            flat: true,
            handle: () => {
              this.execExcluir(item);
              return true;
            },
          },
        },
      });
    },

    getListaVendedorAdd: async function () {
      try {
        //this.objLoadingGrid = true;
        this.listaVendedorAdd = await execGet(this.urlAPIGetVendedores);
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date seller",
          text: e,
        });
      }
    },

    getListaClienteAdd: async function () {
      try {
        this.listaClienteAdd = await execGet(this.urlAPICustomers);
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date customer",
          text: e,
        });
      }
    },

    getListaComodosAdd: async function () {
      try {
        this.listaComodoAdd = await execGet(this.urlAPIRooms);
      } catch (e) {
        this.$dialog.error({
          title: "Erro get date rooms",
          text: e,
        });
      }
    },

    //GERENCIAR ADD COMODO STORAGE
    addComodoStorage: function () {
      if (this.objForm.comodo === undefined) {
        this.$dialog.message.error(this.$i18n.t("tradMsgmOrderEscolhaComodo"), {
          position: "top-right",
          timeout: 5000,
        });
      } else {
        if (
          !checkComodoAoMenosUmItem(this.variavelIdMudanca, this.objForm.comodo)
        ) {
          this.$dialog.message.error(
            this.$i18n.t("tradMsgmOrderTemQueExistirUmItem"),
            {
              position: "top-right",
              timeout: 5000,
            }
          );
        } else {
          if (this.alterandoComodoPosicaoArray != null) {
            if (
              setComodoStorageSession(
                this.variavelIdMudanca,
                this.variavelIdArrayComodo,
                this.objForm.comodo,
                this.objForm.obsComodo,
                this.alterandoComodoPosicaoArray,
                this.objComodoOriginarioEdit
              )
            ) {
              this.preencherComodoListaStorage();
              this.resetComodo();
            }
          } else {
            if (
              setComodoStorageSession(
                this.variavelIdMudanca,
                this.variavelIdArrayComodo,
                this.objForm.comodo,
                this.objForm.obsComodo,
                null,
                null
              )
            ) {
              this.preencherComodoListaStorage();
              this.resetComodo();
            }
          }
        }
      }
    },

    resetComodo: function () {
      this.objForm.comodo = "";
      this.objForm.obsComodo = "";
      this.alterandoComodoPosicaoArray = null;
      this.objComodoOriginarioEdit = null;
      this.setNovoIdArrayComodo(null);
    },

    setNovoIdArrayComodo: function (idExistente = null) {
      if (idExistente === null) {
        this.variavelIdArrayComodo = getNewIdArrayComodo();
      } else {
        this.variavelIdArrayComodo = idExistente;
      }
    },

    preencherComodoListaStorage: async function () {
      this.listaComodoExibir = getListComodoStorageSession(
        this.variavelIdMudanca
      );
      if (this.listaComodoExibir == undefined) {
        this.listaComodoExibir = null;
      } else {
        if (this.listaComodoExibir.length <= 0) {
          this.listaComodoExibir = null;
        }
      }
    },

    delComodoStorage: function (comodoId, idArrayComodo) {
      this.setNovoIdArrayComodo(idArrayComodo);
      delComodoStorageSession(this.variavelIdMudanca, comodoId, idArrayComodo);
      this.preencherComodoListaStorage();
    },

    editComodoStorage: function (comodoId, idArrayComodo) {
      /*guardara o comodo que ta sendo alterado pra poder 
      na alteração repassar 
      as imagens e itens pra o novo objeto*/
      //this.objForm.obsComodo = "teste " + comodoId;
      this.cancelarComodoStorage();
      this.setNovoIdArrayComodo(idArrayComodo);
      let objetoComodo = updateComodoStorageSession(
        this.variavelIdMudanca,
        comodoId,
        idArrayComodo
      );
      //seta o objeto no select
      this.objForm.comodo = objetoComodo.comodo;
      this.objForm.obsComodo = objetoComodo.obs;
      this.alterandoComodoPosicaoArray = objetoComodo.posicaoArray;
      this.objComodoOriginarioEdit = objetoComodo.comodo;
      this.$refs.refComodo.focus();
      this.$forceUpdate();
    },

    cancelarComodoStorage: function () {
      cancelComodoStorageSession();
      this.resetComodo();
    },
    //GERENCIAR ADD COMODO STORAGE

    identificaUsuarioLogado: async function () {
      try {
        await this.getListaVendedorAdd();
        let userLoged = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (userLoged.usergroup_id == 2) {
          this.objForm.vendedor = userLoged;
          this.disabledSelectVendedor = 1;
        }
      } catch (e) {
        this.$dialog.message.error(
          "consultar dados consulta usaurio logado: " + e.message,
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
<style >
.v-input--selection-controls {
  margin-top: 3px !important;
}

.v-dialog.vuedl-layout.v-dialog--active {
  max-width: 750px !important;
  width: 750px !important;
}

/*.v-card.v-sheet.theme--light.rounded-0 > .v-card__actions {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
}*/

/*.v-card__actions > .v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default {
  color: #ffffff !important;
  background-color: #0d47a1 !important;
  border-color: #0d47a1 !important;
}*/
</style>