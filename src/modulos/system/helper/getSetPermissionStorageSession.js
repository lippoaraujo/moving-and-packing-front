/*
export function setComodoStorageSession(idMudanca=null, comodo,  obs=null, posicaoArray=null, objComodoOriginarioEdit=null, idOrigemPivot=null )
{
  
  console.log("comodoEntrada");
  console.log(comodo);
  console.log("comodoEntrada");

  let storageList = JSON.parse(sessionStorage.getItem("storageListaComodo"));  

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
  return sessionStorage.setItem("storageListaComodo", JSON.stringify(storageList));  
} 
*/

export function getListPermissionStorageSession(modulo=null, grupoPermission=null )
{
  console.log(grupoPermission);
  //console.log(modulo);
  let listModulos = JSON.parse(sessionStorage.getItem("permissoesExecucao"));
  //return listModulos;
  let retorno = [];
  if(listModulos != null){
    let b = 0;
    for(b; b<listModulos.length; b++){
      let objModulo =  listModulos[b];
      if(modulo != null){
        if(modulo.id===0){
          retorno.push(objModulo);
        }else{
          if(modulo.id === objModulo.id){
            retorno.push(objModulo);
            /*console.log(objModulo.name);
            let listRoute = objModulo.routes_permissions; 
            let r = 0;
            for(r; r<listRoute.length; r++){
  
              let rota = listRoute[r];
              console.log(rota.name);
              let listAction = rota.actions;
              let a = 0;
              for(a; a<listAction.length; a++){
  
                let action = listAction[a];
                console.log(action.name);
              }
            }*/
          }
        }
      }else{
        retorno.push(objModulo);
      }
    }
    //retorno.push(modulo);
  }
  return retorno;
}

/*

export function delComodoStorageSession(idMudanca, idComodo )
{  
  console.log("delComodoStorageSession");
  let storageListaComodo = JSON.parse(sessionStorage.getItem("storageListaComodo"));
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
        sessionStorage.setItem("storageListaComodo", JSON.stringify(storageListaComodo));  
        return true;
      }
    }
  }
  
}

export function updateComodoStorageSession(idMudanca=null, idComodo=null )
{  
  //cancelComodoStorageSession();
  let storageListaComodo = JSON.parse(sessionStorage.getItem("storageListaComodo"));
  
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
  let storageList = JSON.parse(sessionStorage.getItem("storageListaComodo"));  
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
    sessionStorage.setItem("storageListaComodo", JSON.stringify(storageList));
  }
  
}

export function setAllImageComodosByStorageSession(idMudanca, idComodo)
{
  let listaImage = getListImageStorageSession(idMudanca, idComodo);  
  let storageList = JSON.parse(sessionStorage.getItem("storageListaComodo"));   
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
    sessionStorage.setItem("storageListaComodo", JSON.stringify(storageList));
  }

  
}
*/