//import { execGet } from "@/helper/execRequests.js";
export function getPermissionModule(nameModule)
{
  let userLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  //console.log("userLogado ",logado);
  if(userLogado === null || !userLogado){    
    return false;
  }
  if (JSON.parse(localStorage.getItem("userAdmin"))) {
    return true;
  }
  let listaPermissao = JSON.parse(sessionStorage.getItem("permissions"));
  if(listaPermissao==null){
    return false;
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
  //permissao tem que vir do localstorage
  let logado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if(logado === null || !logado){
    return false;
  }
  if (JSON.parse(localStorage.getItem("userAdmin"))) {
    return true;
  }
  let listaPermissao = JSON.parse(sessionStorage.getItem("permissions"));
  if(listaPermissao==null){
    return false;    
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

export function getPermissionExecAction(nameAction)
{
  //JSON.parse();
  let listPermissions = JSON.parse(sessionStorage.getItem("permissions"));
  //console.log("LISTA ",listPermissions);
  for(let a = 0 ; a < listPermissions.length; a++){
    let permissao = listPermissions[a];
    //console.log(permissao);
    //console.log(permissao.name);
    if(permissao!= undefined){
      if(permissao.name === nameAction){
        return true;
      }
    }
    
  }
  return false;
}
