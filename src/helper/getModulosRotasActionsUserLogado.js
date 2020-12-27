export function getRotasUser(){
  let arrayRotasRetorno = [];
  let permissaoACessoUser = JSON.parse(sessionStorage.getItem("permissoesExecucao"));
  if(permissaoACessoUser==null){
    return arrayRotasRetorno;
  }else{
    let a;
    for(a=0; a<permissaoACessoUser.length; a++){
      let objModulo = permissaoACessoUser[a];
      arrayRotasRetorno[a] = getNomeRotasModulo(objModulo.name, objModulo.routes_permissions);
    }
  }
  return arrayRotasRetorno;
} 

function getNomeRotasModulo(nomeDoModulo, routes_permissions){
  let i;
  let arrayRetorno=[];
  arrayRetorno[0] = "/"+nomeDoModulo;
  for(i=0; i<routes_permissions.length; i++){
    arrayRetorno[i+1] = "/"+nomeDoModulo+"/"+routes_permissions[i].name;
  }
  return arrayRetorno;
}

export function getListaRotaValidacao(arrayDeRotas){
  let a =0;
  let arrayRetorno = [];
  for(a = 0; a<arrayDeRotas.length; a++){
    let rotas = arrayDeRotas[a]
    let z=0;
    for(z = 0; z<rotas.length; z++){
      arrayRetorno.push(rotas[z]);
    }
  }
  return arrayRetorno;
}

export function getModulosUser(){
  let arrayRotasRetorno = [];
  let permissaoACessoUser = JSON.parse(sessionStorage.getItem("permissoesExecucao"));
  if(permissaoACessoUser==null){
    return arrayRotasRetorno;
  }else{
    let a;
    for(a=0; a<permissaoACessoUser.length; a++){
      let objModulo = permissaoACessoUser[a];
      arrayRotasRetorno[a] = objModulo;
    }
  }
  return arrayRotasRetorno;
}

export function getMenusModulo(pathDoModulo){
  let dados = pathDoModulo.split("/");
  let nomeDoModuloLimpo = dados[1];
  let menusRetorno = [];
  let permissaoACessoUser = JSON.parse(sessionStorage.getItem("permissoesExecucao")); 
  let a =0;
  for(a; a<permissaoACessoUser.length; a++){
    let modulo = permissaoACessoUser[a];
    if(modulo.name === nomeDoModuloLimpo){
      let listaRota = modulo.routes_permissions;
      let z =0;
      for(z; z<listaRota.length; z++){
        let rota = listaRota[z];
        if(rota.is_menu){
          let z =0; 
          let is_menu = false;
          for(z; z<rota.actions.length; z++){
            if(rota.actions[z].pivot.is_menu){
              is_menu =true;
              break;
            }
          }
          if(is_menu){
            menusRetorno.push(rota);
          }
          
        }
      }
    }
  }
  return menusRetorno; 
}

export function getModulo(pathDoModulo){
  let dados = pathDoModulo.split("/");
  let nomeDoModuloLimpo = dados[1];
  let permissaoACessoUser = JSON.parse(sessionStorage.getItem("permissoesExecucao")); 
  let a =0;
  for(a; a<permissaoACessoUser.length; a++){
    let modulo = permissaoACessoUser[a];
    if(modulo.name === nomeDoModuloLimpo){
      return modulo;
    }
  }
  return null;
}

export function getObjMenu(pathDoModulo){
  let dados = pathDoModulo.split("/");

  let nomeDoModuloLimpo = dados[1];
  let nomeDoMenuLimpo = dados[dados.length-1];

  console.log(nomeDoModuloLimpo);
  console.log(nomeDoMenuLimpo);

  let permissaoACessoUser = JSON.parse(sessionStorage.getItem("permissoesExecucao")); 
  let a =0;

  for(a; a<permissaoACessoUser.length; a++){
    let modulo = permissaoACessoUser[a];
    if(modulo.name === nomeDoModuloLimpo){
      let listaRota = modulo.routes_permissions;
      let z =0;
      for(z; z<listaRota.length; z++){
        let rota = listaRota[z];
        if(rota.is_menu){
          if(rota.name === nomeDoMenuLimpo){
            return rota;
          }
          //menusRetorno.push(rota);
        }
      }
    }
  }
  //return menusRetorno; 
}
 
 