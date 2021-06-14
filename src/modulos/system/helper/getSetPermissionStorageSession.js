import { getListModules } from "@/helper/listRoutes.js";
import { execGet } from "@/helper/execRequests.js";
/*
export function setComodoStorageSession(idMudanca=null, comodo,  obs=null, posicaoArray=null, objComodoOriginarioEdit=null, idOrigemPivot=null )
{
  
  console.log("comodoEntrada");
  console.log(comodo);
  console.log("comodoEntrada");

  let storageList = JSON.parse(localStorage.getItem("storageListaComodo"));  

  let obj = new Object();
  obj.idMudanca = idMudanca;
  obj.room_id = comodo.id;
  if(comodo.room!=undefined){
    obj.comodo = comodo.room;
  }else{
    obj.comodo = comodo;
  }
  
  obj.obs = obs;

  let listItem = null;
  let listImage = null;

  if(posicaoArray!=null){
    listItem = getListItemStorageSession(idMudanca, objComodoOriginarioEdit.id);
    listImage = getListImageStorageSession(idMudanca, objComodoOriginarioEdit.id);

  }else{
    listItem = getListItemStorageSession(idMudanca, comodo.id);
    listImage = getListImageStorageSession(idMudanca, comodo.id);
  }

  if(listItem === null){
    obj.totalItens = 0;
    obj.totalCubic = 0;
    obj.items = null;
  }else{
    let a = 0;
    let totCubic=0;
    for(a; a<listItem.length; a++){
      let obj = listItem[a];
      
      totCubic= totCubic + Number(obj.item.cubic_feet);
    }
    obj.totalCubic = totCubic;
    obj.totalItens = listItem.length;
    obj.items = listItem;
  }
  
  if(listImage === null){
    obj.totalImagens = 0;
    obj.images = null;
  }else{
    obj.totalImagens = listImage.length;
    obj.images = listImage;
  }  

  if(storageList==null){
    storageList = [];
    if(idOrigemPivot==null){
      obj.id = 0;
    }else{
      obj.id = idOrigemPivot;
    }
    
  }else{
    if( storageList!=null && storageList.length==0 ){
      if(idOrigemPivot==null){
        obj.id = 0;
      }else{
        obj.id = idOrigemPivot;
      }
    }else{
      //pega o ultimo elemento, pega o id e incrementa
      let ultimoObj = storageList[storageList.length-1];
      obj.id = ultimoObj.id+1;
    }
  }

  if(posicaoArray!=null){
    storageList[posicaoArray] = obj;
  }else{
    storageList.push(obj);
  }
  
  //delAllItemStorageSession();
  //delAllImageStorageSession();
  return localStorage.setItem("storageListaComodo", JSON.stringify(storageList));  
} 
*/

export function getListPermissionStorageSession(modulo, grupoPermission)
{
  let listModule = getListModules();
  let retorno = [];
  if(listModule != null){
    let b = 0;
    for(b; b<listModule.length; b++){
      let objPermission =  listModule[b];
      if(objPermission != null){
        if(objPermission.name === modulo.name){
          retorno.push(objPermission);
        }
      }
    }
    retorno =  setaPermissaoPorRole(retorno, grupoPermission);
  }
  return retorno;
}


async function setaPermissaoPorRole(listaModulo, role)
{
  /*
  lista as permissoes do role vindas do back
  percorre a listaModulo e o que for encontrando
  vai dando um check pra que no front monte a tela
  com os checkbox marcados ou nao de acordo com as permissoes
  reais do role.
  marcar ou nao um check no objeto menu tambem.
  */
 
  let permissionRole = await getPermissionRole(role);
  let listaModuloRetorno = [];
  let mod = 0;
  for(mod; mod<listaModulo.length; mod++){
    let objModulo = listaModulo[mod];
    let listaMenu = objModulo.menu;
    let totMenu = 0;

    let listMenu = [];
    for(totMenu; totMenu<listaMenu.length; totMenu++){
      let objMenu = listaMenu[totMenu];
      let listActions = objMenu.actions;
      let objMenuRetorno = setCheckedPermission(listActions, permissionRole);
      objMenu.actions = objMenuRetorno.listAction;
      objMenu.checked = objMenuRetorno.checked;
      listMenu.push(objMenu);
    }
    objModulo.menu = listMenu;
    listaModuloRetorno.push(objModulo);
  }
  //console.log("listaModuloRetorno ", listaModuloRetorno);
  //console.log("permissionRole ",permissionRole);
  //console.log("LISTAMODULOSPERMISSAOVINDOBANCO ",listaModulo);
  return listaModuloRetorno; 
}

async function getPermissionRole(role)
{
  try {
    let url = process.env.VUE_APP_URL_CONNECTION + "/system/roles";
    let urlnova = url.concat("/" + role.id);
    let newRole = await execGet(urlnova);
    return newRole.permissions;
  } catch (e) {
    this.$dialog.error({
      title: "Erro list Role",
      text: e,
    });
  }
}

function setCheckedPermission (listActions, permissionRole){
  
  let totAct = 0;
  let listReturn = [];

  let objMenuRetorno = new Object();
  objMenuRetorno.checked = false;
  for(totAct; totAct < listActions.length; totAct++){
    let action = listActions[totAct];
    let totPermission = 0;
    action.checked = false;
    for(totPermission; totPermission < permissionRole.length; totPermission++){
      let permission = permissionRole[totPermission];
      if(action.name === permission.name){
        action.checked = true;
        objMenuRetorno.checked = true;
      }
    }
    listReturn.push(action);
  }
  objMenuRetorno.listAction = listReturn; 
  return objMenuRetorno;
}

/*

export function delComodoStorageSession(idMudanca, idComodo )
{  
  console.log("delComodoStorageSession");
  let storageListaComodo = JSON.parse(localStorage.getItem("storageListaComodo"));
  if(storageListaComodo!=null){
    let a = 0;
    for(a=0; a<storageListaComodo.length; a++){
      let objectTest = storageListaComodo[a];
      if( (objectTest.idMudanca===idMudanca) && (objectTest.comodo.id===idComodo) ){
        // Começando na posição do índice 2, remova um elemento
        //list.splice(2, 1);
        storageListaComodo.splice(a, 1);
        delItemComodoStorageSession(idMudanca, idComodo);
        delImageComodoStorageSession(idMudanca, idComodo);
        //console.log("Posicao: " + a);  
        //console.log("objeto: " +objectTest);  
        //console.log("tamamnho depois de excluir: " +storageListaImagensComodoNovo.length);
        localStorage.setItem("storageListaComodo", JSON.stringify(storageListaComodo));  
        return true;
      }
    }
  }
  
}

export function updateComodoStorageSession(idMudanca=null, idComodo=null )
{  
  //cancelComodoStorageSession();
  let storageListaComodo = JSON.parse(localStorage.getItem("storageListaComodo"));
  
  if(storageListaComodo!=null){
    let a = 0;
    for(a=0; a<storageListaComodo.length; a++){
      let objectTest = storageListaComodo[a];
      if( (objectTest.idMudanca===idMudanca) && (objectTest.comodo.id===idComodo) ){
        setAllImageStorageSession(idMudanca, idComodo, objectTest.images);
        setAllItemStorageSession(idMudanca, idComodo, objectTest.items);
        objectTest.posicaoArray = a;
        return objectTest;
      }
    }
  }
  
}

export function cancelComodoStorageSession()
{
  delAllItemStorageSession();
  delAllImageStorageSession();
}

export function setAllComodosByMudanca(idMudanca, listaComodosMudanca)
{
  //cancelComodoStorageSession();
  console.log("listaEntrada");
  console.log(listaComodosMudanca);
  console.log("listaEntrada");
  let a =0;
  for(a; a<listaComodosMudanca.length; a++){
    let comodo = listaComodosMudanca[a];
    setAllImageStorageSession(idMudanca, comodo.id, comodo.images);
    setAllItemStorageSession(idMudanca, comodo.id, comodo.items);
    setComodoStorageSession(idMudanca, comodo,  comodo.obs, null, null, comodo.id);
    delImageComodoStorageSession(idMudanca, comodo.id );
    delItemComodoStorageSession(idMudanca, comodo.id );
  }
}

export function setAllItensComodosByStorageSession(idMudanca, idComodo)
{
  console.log("setAllItensComodosByStorageSession");
  console.log("setAllMudancaEntrada: "+ idMudanca);
  console.log("setAllComodoEntrada: "+ idComodo);
  let listaItem = getListItemStorageSession(idMudanca, idComodo);  
  let storageList = JSON.parse(localStorage.getItem("storageListaComodo"));  
  if(storageList!= null){
    let b=0; 
    for(b; b<storageList.length; b++){
      let itemComodo = storageList[b];
      if(itemComodo.idMudanca == idMudanca && itemComodo.room_id == idComodo){
        delItemComodoStorageSession(idMudanca, idComodo );
        if(listaItem === null){
          itemComodo.totalItens = 0;
          itemComodo.totalCubic = 0;
          itemComodo.listaItem = null;
        }else{
          let a = 0;
          let totCubic=0;
          for(a; a<listaItem.length; a++){
            let obj = listaItem[a];
            totCubic= totCubic + Number(obj.item.cubic_feet);
          }
          itemComodo.totalCubic = totCubic;
          itemComodo.totalItens = listaItem.length;
          itemComodo.items = listaItem;
        }
        storageList[b] = itemComodo;
        break;
      }    
    }
    localStorage.setItem("storageListaComodo", JSON.stringify(storageList));
  }
  
}

export function setAllImageComodosByStorageSession(idMudanca, idComodo)
{
  let listaImage = getListImageStorageSession(idMudanca, idComodo);  
  let storageList = JSON.parse(localStorage.getItem("storageListaComodo"));   
  if(storageList!=null){
    let b=0; 
    for(b; b<storageList.length; b++){
      let itemComodo = storageList[b];
      if(itemComodo.idMudanca == idMudanca && itemComodo.room_id == idComodo){
        delImageComodoStorageSession(idMudanca, idComodo );
        if(listaImage === null){
          itemComodo.totalImagens = 0;
          itemComodo.images = null;
        }else{
          let j =0;
          for(j; j<listaImage.length; j++){
            let image = listaImage[j];
            console.log(image);
          }
          itemComodo.totalImagens = listaImage.length;
          itemComodo.images = listaImage;
        }  
        storageList[b] = itemComodo;
        break;
      }    
    }
    localStorage.setItem("storageListaComodo", JSON.stringify(storageList));
  }

  
}
*/