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
  await this.$axios.get(url, header).then(
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
        this.$dialog.message.error("Get: " + url + "Status:"+ response.status, {
          position: "top-right",
          timeout: 5000,
        });
        valueReturn = null;
      }
      
    },
    (error) => {
      this.$dialog.message.error("Get: " + url + "Erro:"+ error, {
        position: "top-right",
        timeout: 5000,
      });
      valueReturn = null;

    }
  );
return valueReturn;
}


export async function  execPost(url, data, header){
  let valueReturn = false;
  await this.$axios.post(url, data, header).then(
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
      this.$dialog.message.error(msgmErro, {
        position: "top-right",
        timeout: 5000,
      });
      valueReturn = false;
    }
  );
return valueReturn;
}


export async function  execPut(url, data, header){
  let valueReturn = false;
  await this.$axios.put(url, data, header).then(
    (response) => {
      if (response.status == 200) {
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
      this.$dialog.message.error(msgmErro, {
        position: "top-right",
        timeout: 5000,
      });
      valueReturn = false;
    }
  );
return valueReturn;
}