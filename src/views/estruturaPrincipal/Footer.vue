<template>
  <v-footer color="blue darken-4" dark app elevation="8">
    <!--<span class="subtitle-1"
      >&copy; {{ new Date().getFullYear() }}{{ strUserLogado }}</span
    >-->
    <span class="subtitle-5">{{ strUserLogado }}</span>
    <v-spacer></v-spacer>
    
    <span class="mr-2 subtitle-5">{{ linguagem }}</span>
    
    <v-avatar tile size="20" >
    
      <img :src="getIcon" />
      
    </v-avatar>

  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    strUserLogado: " - ",
    linguagem: "",
  }),

  created() {
    let userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    this.linguagem = localStorage.getItem("linguagemUsuario");
    if (userAdmin) {
      this.strUserLogado = "Usuario superAdmin";
    } else {
      let userLoged = JSON.parse(localStorage.getItem("usuarioLogado"));
      this.strUserLogado =
        
        userLoged.name +
        " - " +
        userLoged.roles[0].name;
    }
  },

  computed: {
    getIcon() { 
        let imgIcon = "";
        switch (this.linguagem) {
        case 'pt-BR':          
          imgIcon = 'br.svg';
          break;    
        case 'es':          
          imgIcon = 'es.svg';
          break;
        default:          
          imgIcon = 'us.svg';          
        }
        return require("@/assets/bandeiras/" + imgIcon);       
      }    
  },
  
};
</script>