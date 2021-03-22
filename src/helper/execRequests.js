import Vue from "vue";

export async function  execGet(url)
{
  let valueReturn = [];
  await Vue.axios.get(url, getHeader()).then(
    (response) => {
      if (response.status == 200) {
        valueReturn = response.data.data;
      }
    }
  ).catch(function (error) {
    let msgmErro = error.response.data.message + ":<br>";
    for (let obj in error.response.data.errors) {
      let msg = obj + ":";
      msg += error.response.data.errors[obj][0] + "<br>";
      msgmErro += msg;
    }
    throw msgmErro; 
  });

return valueReturn;
}

export async function  execPost(url, data)
{
  let valueReturn = false;
  await Vue.axios.post(url, data, getHeader()).then(
    (response) => {
      if (response.status == 201) {
        valueReturn = true;         
      }
    },
  ).catch(function (error) {
    if(error.response.data.errors != undefined){
      console.log("erro UUUUUUUUUUUU", error.response.status);
      console.log("erro UUUUUUUUUUUU", error.response.statusText);
      let msgmErro = error.response.data.message + ":<br>";
      for (let obj in error.response.data.errors) {
        let msg = obj + ":";
        msg += error.response.data.errors[obj][0] + "<br>";
        msgmErro += msg;
      }
      throw msgmErro; 
    }else{
      console.log("erro AQUIUIUIUIUI", error);
      let msgm = error.response.status + " - " + error.response.statusText;
      throw msgm
    }
    
  });
return valueReturn;
}

export async function  execPut(url, data)
{
  let valueReturn = false;
  await Vue.axios.put(url, data, getHeader()).then(
    (response) => {
      if (response.status == 200) {
        valueReturn = true; 
      }
    },
  ).catch(function (error) {
    console.log("erro put", error);
    let msgmErro = error.response.data.message + ":<br>";
    for (let obj in error.response.data.errors) {
      let msg = obj + ":";
      msg += error.response.data.errors[obj][0] + "<br>";
      msgmErro += msg;
    }
    throw msgmErro;    
  });
return valueReturn;
}

export async function  execDell(url)
{
  let valueReturn = false;
  await Vue.axios.delete(url, getHeader()).then(
    (response) => {
      if (response.status == 200) {
        valueReturn = true;
      }
    },
  ).catch(function (error) {
    let msgmErro = error.response.data.message + ":<br>";
    for (let obj in error.response.data.errors) {
      let msg = obj + ":";
      msg += error.response.data.errors[obj][0] + "<br>";
      msgmErro += msg;
    }
    throw msgmErro; 
  });
return valueReturn;
}

function getHeader()
{
  let headerRequest = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(localStorage.getItem("token")),
    },
  }
  return headerRequest;
}

export function refreshToken()
{
  //console.log("iniciando o metodo refreshToken");
  let url = process.env.VUE_APP_URL_CONNECTION + "/auth/refresh";
  let objPut = {
    Bearer: localStorage.getItem("token"),
  };
  const promise = Vue.axios.post(url, objPut, getHeader());
  //console.log("promise axio refreshToken", promise);
  return promise;
}