export function getPermissionModule(nameModule)
{
  if (JSON.parse(sessionStorage.getItem("userAdmin"))) {
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
  if (JSON.parse(sessionStorage.getItem("userAdmin"))) {
    return true;
  }
  let listaPermissao = JSON.parse(sessionStorage.getItem("permissions"));
  if(listaPermissao==null){
    return false;
  }else{
    let a;
    for(a=0; a<listaPermissao.length; a++){
      let objPermissao = listaPermissao[a];
      var arrayName = objPermissao.name.split("-").concat("s");
      if( (arrayName[0] == nameMenu) && ( arrayName[1] == "show" )  ){
        return true;
      }
    }
    
  }
  return false;
}

