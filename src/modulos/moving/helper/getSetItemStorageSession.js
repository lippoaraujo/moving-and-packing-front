export function setItemStorageSessionNovo(idMudanca=null, idComodo=null, idArrayComodo, objItem, obs, quantity )
{
//alert("idMudanca " + idMudanca);

  let storageList = JSON.parse(sessionStorage.getItem("storageListaItemComodo"));
  if((storageList==null) || (storageList.length==0) ){
    storageList = [];
    let objComoItem = new Object();
    objComoItem.idMudanca = idMudanca;
    objComoItem.room_id = idComodo;
    objComoItem.idArrayComodo = idArrayComodo
    let oitem = new Object();
    oitem.item = objItem;
    oitem.item_id = objItem.id;
    
    if(objItem.pivot != undefined){
      //console.log("aqui1");
      oitem.obs = objItem.pivot.obs;
      oitem.quantity = objItem.pivot.quantity;
    }else{
      //console.log("aqui2");
      oitem.obs = obs;
      oitem.quantity = quantity;
    }
    oitem.cubicTotal = (objItem.cubic_feet*oitem.quantity).toFixed(2);
    let listaItem = [];
    listaItem.push(oitem);
    objComoItem.items = listaItem;
    storageList.push(objComoItem);
  }else{
    let a = 0;
    for(a; a<storageList.length; a++){
      let obj = storageList[a];
      if( (obj.idMudanca == idMudanca) && (obj.room_id == idComodo) && (obj.idArrayComodo == idArrayComodo)){
        let oitem = new Object();
        oitem.item = objItem;
        oitem.item_id = objItem.id;
        if(objItem.pivot != undefined){
          //console.log("aqui3");
          oitem.obs = objItem.pivot.obs;
          oitem.quantity = objItem.pivot.quantity;
        }else{
          //console.log("aqui4");
          oitem.obs = obs;
          oitem.quantity = quantity;
        }
        //oitem.quantity = quantity;
        oitem.cubicTotal = (objItem.cubic_feet*quantity).toFixed(2);
        //oitem.obs = obs;
        //let listaItem = [];
        //listaItem.push(oitem);
        obj.items.push(oitem);// = listaItem;
        storageList[a] = obj;
        break;
      }
    }    
  }
  return sessionStorage.setItem("storageListaItemComodo", JSON.stringify(storageList));
}

export function getListItemStorageSession(idMudanca=null, idComodo=null, idArrayComodo=null)
{  
  let storageListaItemComodo = JSON.parse(sessionStorage.getItem("storageListaItemComodo"));
  if(storageListaItemComodo!=null){
    let a = 0;
    let listaRetorno = [];
    for(a; a<storageListaItemComodo.length; a++){
      let objectTest = storageListaItemComodo[a]; 

      if( (objectTest.idMudanca===idMudanca) && (objectTest.room_id===idComodo) && (objectTest.idArrayComodo === idArrayComodo)){
          let b=0;
          for(b; b<objectTest.items.length; b++){
            listaRetorno.push(objectTest.items[b]);
          }
          break;  
      }
    }
    return listaRetorno;
  }else{
    return null; 
  }
}

export function delItemStorageSession(idItem, idMudanca=null, idComodo=null, idArrayComodo=null )
{
  let storageListaItemComodo = JSON.parse(sessionStorage.getItem("storageListaItemComodo"));
  if(storageListaItemComodo!=null){
    let a = 0;
    for(a=0; a<storageListaItemComodo.length; a++){
      let objectTest = storageListaItemComodo[a];    
      if(  (objectTest.idMudanca===idMudanca) && (objectTest.room_id===idComodo) && (objectTest.idArrayComodo==idArrayComodo)){
        let b=0;
        for(b; b<objectTest.items.length; b++){
          let itemTeste = objectTest.items[b].item;
          if(itemTeste.id===idItem){
            objectTest.items.splice(b, 1);
            storageListaItemComodo[a] = objectTest;
            sessionStorage.setItem("storageListaItemComodo", JSON.stringify(storageListaItemComodo));  
          }
        }      
      }
    }
  }

  
  return true;
}

export function delItemComodoStorageSession(idMudanca, idComodo, idArrayComodo)
{

  console.log("exclusao item entrada mudanca: "+idMudanca);
  console.log("exclusao item entrada comodo: "+idComodo);
  console.log("exclusao item entrada idArrayComodo: "+idArrayComodo);

  let storageListaItemComodo = JSON.parse(sessionStorage.getItem("storageListaItemComodo"));
  if(storageListaItemComodo!=null){
    let a = 0;

    //console.log("lista antes de excluir ");
    //console.log(storageListaItemComodo);
    //console.log("lista antes de excluir ");

    for(a=0; a<storageListaItemComodo.length; a++){
      let objectTest = storageListaItemComodo[a]; 
      console.log("exclusao item ");
      console.log(objectTest);
      //console.log("exclusao item : "+objectTest.idMudanca);
      //console.log("exclusao item teste comodo: "+objectTest.room_id);
      
      if( (objectTest.idMudanca===idMudanca) && (objectTest.room_id===idComodo) && (objectTest.idArrayComodo === idArrayComodo) ){
        console.log(" ENTROU ");
        // Começando na posição do índice 2, remova um elemento
        //list.splice(2, 1);
        storageListaItemComodo.splice(a, 1);
        //console.log("Posicao: " + a);  
        //console.log("objeto: " +objectTest);  
        //console.log("tamamnho depois de excluir: " +storageListaImagensComodoNovo.length);
      }
    }
    //console.log("lista depois de excluir ");
    //console.log(storageListaItemComodo);
    //console.log("lista depois de excluir ");
    sessionStorage.setItem("storageListaItemComodo", JSON.stringify(storageListaItemComodo));  
    return true;
  }
  
}

export function delAllItemStorageSession()
{
  sessionStorage.removeItem("storageListaItemComodo");
}

export function setAllItemStorageSession(idMudanca, idComodo, listItem, idArrayComodo)
{
  
console.log("idMudanca " + idMudanca);
console.log("idComodo " + idComodo);
console.log(listItem);
console.log("idArrayComodo " + idArrayComodo);


  delItemComodoStorageSession(idMudanca, idComodo, idArrayComodo );
  if(listItem!= null){
    if(listItem.length> 0){
      let b=0;
      for(b; b<listItem.length; b++){
        let item = listItem[b];
        if(item.pivot !== undefined){
          let pivot = listItem[b].pivot;    
          delete item.pivot;
          setItemStorageSessionNovo(idMudanca, idComodo, idArrayComodo, item, pivot.obs, pivot.quantity);
        }else{
          let objItem = null;
          if(item.item != undefined){
            objItem = item.item;
          }else{
            objItem = item;
          }
          setItemStorageSessionNovo(idMudanca, idComodo, idArrayComodo, objItem, item.obs, item.quantity);
        }    
      }
    }
  }
    
}



