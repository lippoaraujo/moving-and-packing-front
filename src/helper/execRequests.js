import Vue from "vue";
//import "@/plugins/axios";
/*export const execGet = function({ url, header }){
  this.$axios.get(url, header).then(
    (response) => {
      if (response.status == 200) {
        return response.data.data;
      } else {
        this.$dialog.message.error("Get: " + url + "Status:"+ response.status, {
          position: "top-right",
          timeout: 5000,
        });
        return null;
      }
      
    },
    (error) => {
      this.$dialog.message.error("Get: " + url + "Erro:"+ error, {
        position: "top-right",
        timeout: 5000,
      });
      return null;

    }
  );
};*/
export async function  execGet(url, header){
  let valueReturn = [];
  await Vue.axios.get(url, header).then(
    (response) => {
      if (response.status == 200) {
        //return response.data.data;
        /*let b=0;
        for(b; b<response.data.data.lenght; b++){
          valueReturn.push(response.data.data[b]);
        }*/
        valueReturn = response.data.data;
        //console.log("UUU"); 
        //console.log(u); 
      } else {
        Vue.dialog.error({
          title: 'Erro',
          text: "Get: " + url + "Status:"+ response.status
        });
        valueReturn = null;
      }
      
    },
    (error) => {


      Vue.dialog.error({
        title: 'Erro',
        text: "Get: " + url + "Erro:"+ error
      });
      
      valueReturn = null;

    }
  );
return valueReturn;
}


export async function  execPost(url, data, header){
  let valueReturn = false;
  await Vue.axios.post(url, data, header).then(
    (response) => {
      if (response.status == 201) {
        valueReturn = true; 
      } else {
        valueReturn = false;
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
      
      this.$dialog.error({
        title: 'Erro',
        text: msgmErro        
      });

      valueReturn = false;
    }
  );
return valueReturn;
}


export async function  execPut(url, data, header){
  let valueReturn = false;
  await Vue.axios.put(url, data, header).then(
    (response) => {
      if (response.status == 200) {
        valueReturn = true; 
      } else {
        valueReturn = false;
      }
    },
    (error) => {
      let msgmErro = error.response.data.message + ":<br>";

      console.log(error.response.data);

      for (let obj in error.response.data.errors) {
        let msg = obj + ":";
        msg += error.response.data.errors[obj][0] + "<br>";
        //console.log(obj);
        //console.log(error.response.data.errors[obj][0]);
        msgmErro += msg;
      }


      this.$dialog.error({
        title: 'Erro',
        text: msgmErro        
      });

      /*this.$dialog.message.error(msgmErro, {
        position: "top-right",
        timeout: 5000,
      });*/
      valueReturn = false;
    }
  );
return valueReturn;
}

/*async function refreshToken(tokenAtual){
  let url = process.env.VUE_APP_URL_CONNECTION + "auth/refresh";

  await Vue.axios.post(url, data, header).then(
    (response) => {
      if (response.status == 201) {
        valueReturn = true; 
      } else {
        valueReturn = false;
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
      
      this.$dialog.error({
        title: 'Erro',
        text: msgmErro        
      });

      
    }
  );
}*/