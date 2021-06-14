//import { execGet } from "@/helper/execRequests.js";
export function getPermissionModule(nameModule)
{
  let logado = JSON.parse(sessionStorage.getItem("userLogado"));
  //console.log("userLogado ",logado);
  if(logado === null || !logado){
    return false;
  }
  if (JSON.parse(localStorage.getItem("userAdmin"))) {
    return true;
  }
  let listaPermissao = JSON.parse(sessionStorage.getItem("permissions"));
  //console.log("listaPermissaosession ",listaPermissao);

  if(listaPermissao==null){
    return false;
    /*
retirar este getPermissionPorToken daqui e no route/index se nao trazer permissao
retornar pra tela de login

    let objReturn = await getPermissionPorToken();
    if(objReturn.status){
      let a;
      listaPermissao = objReturn.permission;
      for(a=0; a<listaPermissao.length; a++){
        let objPermissao = listaPermissao[a];
        if(objPermissao.name == nameModule.concat("-module")){
          return true;
        }
      }
    }else{
      return false;
    }*/
  }else{
    let a;
    for(a=0; a<listaPermissao.length; a++){
      let objPermissao = listaPermissao[a];
      if(objPermissao.name == nameModule.concat("-module")){
        return true;
      }
    }
  }
  return false;
} 

export function getPermissionMenu(nameMenu)
{
  let logado = JSON.parse(sessionStorage.getItem("userLogado"));
  if(logado === null || !logado){
    return false;
  }
  if (JSON.parse(localStorage.getItem("userAdmin"))) {
    return true;
  }
  let listaPermissao = JSON.parse(sessionStorage.getItem("permissions"));
  if(listaPermissao==null){
    return false;
    /*let objReturn = await getPermissionPorToken();
    if(objReturn.status){
      let a;
      listaPermissao = objReturn.permission;
      for(a=0; a<listaPermissao.length; a++){
        let objPermissao = listaPermissao[a];
        let arrayName = objPermissao.name.split("-").concat("s");
        if( (arrayName[0] == nameMenu) && ( arrayName[1] == "show" )  ){
          return true;
        }
      }
    }else{
      return false;
    }*/
  }else{
    let a;
    for(a=0; a<listaPermissao.length; a++){
      let objPermissao = listaPermissao[a];
      let arrayName = objPermissao.name.split("-").concat("s");
      if( (arrayName[0] == nameMenu) && ( arrayName[1] == "show" )  ){
        return true;
      }
    }
  }
  
  return false;
}


/*async function getPermissionPorToken()
{
  try {
    let objReturn = new Object();
    let token = localStorage.getItem("token");
    if(token != null){
      const AuthStr = "Bearer ".concat(token);
      let headerRequest = {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthStr,
        },
      };

      let permissions = await execGet.call(
        this,
        process.env.VUE_APP_URL_CONNECTION + "/system/permissions",
        headerRequest
      );

      console.log(permissions);

      if (permissions === true) {
        //logou como admin
        localStorage.setItem("userAdmin", true);
      } else {
        localStorage.setItem("userAdmin", false);
        sessionStorage.setItem(
          "permissions",
          JSON.stringify(permissions)
        );
      }
      objReturn.status = true;
      objReturn.permission = permissions;
      
    }else{
      objReturn.status = false;
      objReturn.permission = null;
    }

    console.log(objReturn);
    return objReturn;

  } catch (e) {
    console.log("consultar dados usuario logado: " + e.message);
  }
} */

