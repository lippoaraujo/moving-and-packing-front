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
          <v-btn icon dark v-on:click="undo">
            <v-icon dark>mdi-trash-can</v-icon>
          </v-btn>
          <v-btn icon dark v-on:click="save">
            <v-icon dark>mdi-content-save</v-icon>            
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
              />

              <!--<Vuesignature
                w="100%"
                h="100%"                
                ref="signature"                
              /> -->

            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import Vuesignature from "vue-signature";

//plugin //https://github.com/WangShayne/vue-signature

export default {
  name: "PoupUpAddItemComodo",
  components: {
    Vuesignature,
  },

  props: {
    variavelShowModalSignature: {
      required: true,
    },
  },

  data: () => ({
    //visible: false,
    base64ImagemExistente:null,
    linguagem: null,
    nameTraducao: "",
    varOpenDialogImage: false,

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
    //this.base64ImagemExistente = localStorage.getItem("signaturaCustomer");
    
  },

  mounted() {
    //var _this = this;
    //console.log("_this_MOUNTEND ", _this.$refs.signature);
    //this.base64ImagemExistente = localStorage.getItem("signaturaCustomer");
    
  },

  methods: {    
      clear(){
        var _this = this;
        _this.$refs.signature.clear();
      },
      undo(){
        var _this = this;
        _this.$refs.signature.undo();
      },
      save() {
        var _this = this;
        var png = _this.$refs.signature.save()
        //var jpeg = _this.$refs.signature.save('image/jpeg')
        //var svg = _this.$refs.signature.save('image/svg+xml');
        //console.log("png ", png);
        //console.log("jpeg ", jpeg);
        //console.log("svg ", svg);
        localStorage.setItem("signaturaCustomer", png);
        this.closeModal(true);

        //let dados = this.$refs.signature.fromData("image/svg+xml");
        //console.log(dados);
      },
      /*fromDataURL(base64ImagemExistente){
        var _this = this;
        _this.$refs.signature.fromDataURL(base64ImagemExistente);
      },*/


      preencheDadosStorage(){
        var _this = this;
        //console.log("_this ", _this.$refs.signature);
        let assinatura = localStorage.getItem("signaturaCustomer");
        if(assinatura!=null){

          if(_this.$refs.signature != undefined){            
            _this.$refs.signature.fromDataURL(assinatura);
          }
          
          this.base64ImagemExistente = assinatura;
          
        }else{          
          if(_this.$refs.signature != undefined){            
            _this.$refs.signature.clear();
          }
          this.base64ImagemExistente = null;
        }
        
        //this.$nextTick(()=>{
            //_this.$refs.signature.fromDataURL(this.base64ImagemExistente);
        //});
      },
    

   

    /*openDialogImageMetodo: function (value) {
      this.varOpenDialogImage = value;
    },
    closeDialogImageMetodo: function () {
      this.varOpenDialogImage = false;
    },*/

    closeModal: function (value) {      
      this.$emit("closeModal", value);
    },

  },

  computed: {
    getValorAbrirJanela: {
      get() {
        if (this.variavelShowModalSignature) {  
          this.preencheDadosStorage();
        }
        return this.variavelShowModalSignature;
      },
      set(value) {
        this.$emit("update:varOpenDialog", value);
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