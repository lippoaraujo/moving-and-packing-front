<template>
  <v-dialog
    v-model="getValorAbrirJanela"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="blue darken-4">
        <v-btn icon dark v-on:click="closeModal(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>{{ $t("tradOrderBtnGetAssinatura") }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <!--<v-btn icon dark v-on:click="loadImage">
            <v-icon dark>mdi-trash-can</v-icon>
            LOAD
          </v-btn>-->
          <v-btn icon dark v-on:click="undo">
            <v-icon dark>mdi-trash-can</v-icon>
          </v-btn>
          <v-btn icon dark v-on:click="save">
            <v-icon dark>mdi-content-save</v-icon>
            PNG
          </v-btn>
          <v-btn icon dark v-on:click="saveAsSvg">
            <v-icon dark>mdi-content-save</v-icon>
            SVG
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col
              class="wrapper ma-auto overflow-y-auto elevation-5 rounded-lg"
            >
              <!--<Vuesignature
                width="100%"
                height="100%"
                ref="signature"
                :options="{ onBegin, onEnd }"
              />-->

              <Vuesignature
                w="100%"
                h="100%"
                :defaultUrl="base64ImagemExistente"
                ref="signature"
                :options="{
                  onBegin: () => {
                    //$refs.signature.resizeCanvas();
                    //$refs.signature.fromDataURL(base64ImagemExistente);
                  },
                  onEnd: () => {
                    //testeMetodo();
                  },
                }"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { execGet } from "@/helper/execRequests.js";
import Vuesignature from "vue-signature";

//testar esse outro plugin //https://github.com/WangShayne/vue-signature

export default {
  name: "PoupUpAddItemComodo",
  components: {
    Vuesignature,
  },

  props: {
    variavelShowModalSignature: {
      required: true,
    },
    variavelIdMudanca: {
      required: true,
    },
  },

  data: () => ({
    //visible: false,
    base64ImagemExistente:
      "data:image/png;base64,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",

    linguagem: null,
    nameTraducao: "",
    varOpenDialogImage: false,

    listaItemExibir: [],
    listaItem: [],

    urlAPIGetItem: process.env.VUE_APP_URL_CONNECTION + "/moving/items",

    //listaItem: ["fogão", "geladeira", "tv"],
    //show: false,
    //dialog: this.abrirDialog,
    notifications: false,
    sound: true,
    widgets: false,
    objForm: {
      item: "",
      itemObs: "",
    },
    regrasAddItem: [],
    qtdItemRules: [],
  }),

  created() {
    this.linguagem = localStorage.getItem("linguagemUsuario");
    this.$i18n.locale = this.linguagem;
    switch (this.linguagem) {
      case "pt-BR":
        this.nameTraducao = "name_pt";
        break;
      case "es":
        this.nameTraducao = "name_es";
        break;
      default:
        this.nameTraducao = "name";
    }
    //this.loadImage();
  },

  mounted() {},

  methods: {
    testeMetodo() {
      console.log("BUUUU");
      this.$refs.signature.fromDataURL(this.base64ImagemExistente);
    },

    onBegin() {
      console.log("INICIO");
    },
    onEnd() {
      console.log("FIM");
    },

    undo() {
      //this.$refs.signature.undoSignature();
      //this.loadImage();
    },
    save() {
      const { isEmpty, data } = this.$refs.signature.saveSignature();
      console.log(isEmpty);
      console.log(data);

      //let dados = this.$refs.signature.fromData("image/svg+xml");
      //console.log(dados);
    },

    clear: function () {
      this.$refs.signature.clearSignature();
    },

    saveAsPng: function () {},

    saveAsSvg: function () {
      const { isEmpty, data } =
        this.$refs.signature.saveSignature("image/svg+xml");
      console.log(isEmpty);
      console.log(data);
    },

    loadImage: function () {
      //this.visible = !this.visible;

      if (this.variavelShowModalSignature) {
        //this gives TypeError: Cannot read property 'fromDataURL' of undefined
        //this.$refs.signature.fromDataURL(this.initial_data);
        this.$nextTick(() => {
          console.log("AQUI");
          //this.$refs.signature.resizeCanvas();
          // this is needed because the component is not loaded at this point yet.
          //this.$refs.signature.fromDataURL(this.base64ImagemExistente);
        });
      }

      //this.$refs.signature.resizeCanvas();

      //let assinatura = localStorage.getItem("edicao_customer_signature");
      //if (assinatura != null) {
      //this.$refs.signature.resizeCanvas();
      //this.$refs.signature.fromDataURL(this.base64ImagemExistente);
      //}

      /*console.log("aqui1");
      this.$refs.signature.resizeCanvas();
      this.$refs.signature.fromDataURL(this.base64ImagemExistente);
      console.log("aqui2");*/
    },

    validate: function () {
      alert(this.$refs.form.validate());
    },

    openDialogImageMetodo: function (value) {
      this.varOpenDialogImage = value;
    },
    closeDialogImageMetodo: function () {
      this.varOpenDialogImage = false;
    },

    closeModal: function (value) {
      this.$emit("closeModal", value);
    },

    ///salvar a assinatura na sessao customer_signature

    preencherItensAbrirJanela: function () {},

    listarItemsAdd: async function () {
      let listaDados = await execGet(this.urlAPIGetItem);

      if (listaDados != undefined) {
        if (listaDados.length > 0) {
          let a = 0;
          this.listaItem = [];
          for (a; a < listaDados.length; a++) {
            let objItem = listaDados[a];
            switch (this.linguagem) {
              case "pt-BR":
                if (objItem.name_pt != null) {
                  this.listaItem.push(objItem);
                }
                break;
              case "es":
                if (objItem.name_es != null) {
                  this.listaItem.push(objItem);
                }
                break;
              default:
                this.listaItem.push(objItem);
            }
          }
        }
      }
    },
  },

  computed: {
    getValorAbrirJanela: {
      get() {
        if (this.variavelShowModalSignature) {
          console.log("ANTES DE ABRIR");
          this.loadImage();
        }
        return this.variavelShowModalSignature;
      },
      set(value) {
        this.$emit("update:varOpenDialog", value);
      },
    },

    getValorVariavelIdMudanca: {
      get() {
        return this.variavelIdMudanca;
      },
    },
    getValorvariavelIdComodo: {
      get() {
        return this.variavelIdComodo;
      },
    },
    getValorvariavelIdArrayComodo: {
      get() {
        return this.variavelIdArrayComodo;
      },
    },
  },
};
</script>
<style>
.wrapper {
  position: relative;
  width: 400px;
  height: 200px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.signature-pad {
  position: absolute;
  left: 0;
  top: 0;

  background-color: white;
}
</style>