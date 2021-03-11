import { getListItemStorageSession, delItemComodoStorageSession, delAllItemStorageSession, setAllItemStorageSession, } from "@/modulos/moving/helper/getSetItemStorageSession.js";
import { getListImageStorageSession, delImageComodoStorageSession, delAllImageStorageSession, setAllImageStorageSession,  } from "@/modulos/moving/helper/getSetImageStorageSession.js";

export function setComodoStorageSession(idMudanca=null, idArrayComodo, comodo,  obs=null, posicaoArray=null, objComodoOriginarioEdit=null, idOrigemPivot=null )
{
  let storageList = JSON.parse(localStorage.getItem("storageListaComodo"));  

  let obj = new Object();
  obj.idArrayComodo = idArrayComodo;
  obj.idMudanca = idMudanca;

  if(comodo.id != undefined){
    obj.room_id = comodo.id;
  }
  
  if(comodo.room_id != undefined){
    obj.room_id = comodo.room_id;
  }
  
  console.log(idOrigemPivot);

  if(comodo.room!=undefined){
    obj.comodo = comodo.room;
  }else{
    obj.comodo = comodo;
  }
  
  obj.obs = obs;

  let listItem = null;
  let listImage = null;

  if(posicaoArray!=null){
    //console.log("aqui1");

    //na adicao de mudanca quando editamos um comodo e clicamos em salvar comodo
    // ele entra aqui so que as imagens e os itens ja foram repassados para
    // o storageListaComodo... devemos verificar nele a imagem e os itens
    let lista = getListImageItemFromStorageListaComodo(idMudanca, objComodoOriginarioEdit.id);
    listItem = lista.items;//getListItemStorageSession(idMudanca, objComodoOriginarioEdit.id);
    listImage = lista.images;// getListImageStorageSession(idMudanca, objComodoOriginarioEdit.id);

  }else{    
    listItem = getListItemStorageSession(idMudanca, comodo.id, obj.idArrayComodo);
    listImage = getListImageStorageSession(idMudanca, comodo.id, false, obj.idArrayComodo);
  }


  //console.log(listItem);

  if(listItem === undefined || listItem === null){
    obj.totalItens = 0;
    obj.totalCubic = 0;
    obj.items = null;
  }else{
    let a = 0;
    let totCubic=0;
    for(a; a<listItem.length; a++){
      let obj = listItem[a];
      
      totCubic= totCubic + Number(obj.cubicTotal);
    }
    obj.totalCubic = totCubic.toFixed(2);
    obj.totalItens = listItem.length;
    obj.items = listItem;
  }
  
  if( listImage === undefined || listImage === null){
    obj.totalImagens = 0;
    obj.images = null;
  }else{
    obj.totalImagens = listImage.length;
    obj.images = listImage;
  }  

  //if(storageList==null){
    //storageList = [];
    //if(idOrigemPivot==null){
      //obj.id = 0;
    //}else{
      //obj.id = idOrigemPivot;
    //}
  //}else{
    //if( storageList!=null && storageList.length==0 ){
      //if(idOrigemPivot==null){
        //obj.id = 0;
      //}else{
        //obj.id = idOrigemPivot;
      //}
    //}else{
      //pega o ultimo elemento, pega o id e incrementa
      //let ultimoObj = storageList[storageList.length-1];
      //obj.id = ultimoObj.id+1;
    //}
  //}

  if(storageList==null){
    storageList = [];
  }
  if(posicaoArray!=null){
    storageList[posicaoArray] = obj;
  }else{
    storageList.push(obj);
  }
  localStorage.setItem("storageListaComodo", JSON.stringify(storageList));
  return true
} 


export function getNewIdArrayComodo()
{
  let storageList = JSON.parse(localStorage.getItem("storageListaComodo"));  
  if(storageList == null){
    return 1;
  }
  let maxId = Math.max(...storageList.map(obj => obj.idArrayComodo));
  return maxId + 1;
}

function getListImageItemFromStorageListaComodo(idMudanca, idComodo){

  let storageListaComodo = JSON.parse(localStorage.getItem("storageListaComodo"));
  let listaRetorno = new Object;
  if(storageListaComodo!=null){
    
    let a = 0;
    listaRetorno.images = [];
    listaRetorno.items = [];
    for(a; a<storageListaComodo.length; a++){
      let comodo = storageListaComodo[a];
      //console.log(comodo);
      //console.log("comodo.idMudanca " + comodo.idMudanca);
      if (comodo.idMudanca == idMudanca){
        //console.log("comodo.room_id " + comodo.room_id);
        if(comodo.room_id == idComodo){
          
          listaRetorno.images = comodo.images;
          listaRetorno.items = comodo.items;
          return listaRetorno;
        }
      }
    }
  }
  return listaRetorno;
}

export function getListComodoStorageSession(idMudanca=null)
{
  let storageListaComodo = JSON.parse(localStorage.getItem("storageListaComodo"));
  if(storageListaComodo!=null){
    let a = 0;
    let listaRetorno = [];
    for(a; a<storageListaComodo.length; a++){
      let objectTest = storageListaComodo[a];
      if(objectTest.idMudanca===idMudanca){
        listaRetorno.push(objectTest);
        delImageComodoStorageSession(idMudanca, objectTest.comodo.id, objectTest.idArrayComodo);
        delItemComodoStorageSession(idMudanca, objectTest.comodo.id, objectTest.idArrayComodo);
      }
    }
    return listaRetorno;
  }else{
    return null; 
  }
}

export function delComodoStorageSession(idMudanca, idComodo, idArrayComodo )
{  
  
  let storageListaComodo = JSON.parse(localStorage.getItem("storageListaComodo"));
  if(storageListaComodo!=null){
    let a = 0;
    for(a=0; a<storageListaComodo.length; a++){
      let objectTest = storageListaComodo[a];
      if( (objectTest.idMudanca===idMudanca) && (objectTest.comodo.id===idComodo) && (objectTest.idArrayComodo == idArrayComodo)){
        // Começando na posição do índice 2, remova um elemento
        //list.splice(2, 1);
        storageListaComodo.splice(a, 1);
        delItemComodoStorageSession(idMudanca, idComodo, idArrayComodo);
        delImageComodoStorageSession(idMudanca, idComodo, idArrayComodo);
        //console.log("Posicao: " + a);  
        //console.log("objeto: " +objectTest);  
        //console.log("tamamnho depois de excluir: " +storageListaImagensComodoNovo.length);
        localStorage.setItem("storageListaComodo", JSON.stringify(storageListaComodo));  
        return true;
      }
    }
  }
  
}

export function updateComodoStorageSession(idMudanca, idComodo, idArrayComodo)
{  
  //cancelComodoStorageSession();
  console.log("UPDATE");
  console.log(idMudanca);
  console.log(idComodo);
  console.log(idArrayComodo);
  let storageListaComodo = JSON.parse(localStorage.getItem("storageListaComodo"));
  
  if(storageListaComodo!=null){
    let a = 0;
    for(a=0; a<storageListaComodo.length; a++){
      let objectTest = storageListaComodo[a];
      console.log("OBJECTTESTE");
      console.log(objectTest);

      if( (objectTest.idMudanca===idMudanca) && (objectTest.comodo.id===idComodo) && (objectTest.idArrayComodo==idArrayComodo) ){
        setAllImageStorageSession(idMudanca, idComodo, objectTest.images, idArrayComodo);
        setAllItemStorageSession(idMudanca, idComodo, objectTest.items, idArrayComodo);
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
  //console.log("listaEntrada");
  //console.log(listaComodosMudanca);
  //console.log("listaEntrada");
  let a =0;
  for(a; a<listaComodosMudanca.length; a++){
    let comodo = listaComodosMudanca[a];
    let idArrayComodo = a+1;    
    setAllImageStorageSession(idMudanca, comodo.id, comodo.images, idArrayComodo);
    setAllItemStorageSession(idMudanca, comodo.id, comodo.items, idArrayComodo);
    setComodoStorageSession(idMudanca, idArrayComodo, comodo,  comodo.obs, null, null, comodo.id);
    delImageComodoStorageSession(idMudanca, comodo.id, idArrayComodo );
    delItemComodoStorageSession(idMudanca, comodo.id, idArrayComodo );
  }
}

export function setAllItensComodosByStorageSession(idMudanca, idComodo, idArrayComodo)
{
  //console.log("setAllItens");
  let listaItem = getListItemStorageSession(idMudanca, idComodo, idArrayComodo); 
  let storageListComodo = JSON.parse(localStorage.getItem("storageListaComodo"));  
  if(storageListComodo!= null){
    let b=0; 
    for(b; b<storageListComodo.length; b++){
      let itemComodo = storageListComodo[b];

      //console.log("BUU");
      //console.log(itemComodo);

      let idComodoTeste=null;
      if(itemComodo.comodo.room_id != undefined){
        idComodoTeste = itemComodo.comodo.room_id;
      }else{
        idComodoTeste = itemComodo.comodo.id;
      }

      if(itemComodo.idMudanca == idMudanca && idComodoTeste == idComodo && itemComodo.idArrayComodo == idArrayComodo){
        delItemComodoStorageSession(idMudanca, idComodo, idArrayComodo);
        if(listaItem === null){

          itemComodo.totalItens = 0;
          itemComodo.totalCubic = 0;
          itemComodo.listaItem = null;
        }else{

          let a = 0;
          let totCubic=0;
          for(a; a<listaItem.length; a++){
            let obj = listaItem[a];
            totCubic= totCubic + Number(obj.cubicTotal);
          }
          itemComodo.totalCubic = totCubic;
          itemComodo.totalItens = listaItem.length;
          itemComodo.items = listaItem;
        }
        //console.log("ANTES ADD");
        //console.log(itemComodo);
        storageListComodo[b] = itemComodo;
        //console.log("DPOIS ADD");
        //console.log(storageListComodo[b]);
        //console.log("DPOIS ADD");
        //console.log("DPOIS ADD");
        break;
      }    
    }
    //console.log(storageListComodo);
    localStorage.setItem("storageListaComodo", JSON.stringify(storageListComodo));
  }
  
}

export function setAllImageComodosByStorageSession(idMudanca, idComodo, idArrayComodo)
{
  //console.log("setAllImage");
  //console.log("ID MUDANCA AQUi :" + idMudanca);
  //console.log("ID COMODO AQUi :" + idComodo);
  //console.log("ID idArrayComodo AQUi :" + idArrayComodo);

  let listaImage = getListImageStorageSession(idMudanca, idComodo, false, idArrayComodo);  

  //console.log("LISTA IMAGEM AQUi :");
  //console.log(listaImage);

  let storageList = JSON.parse(localStorage.getItem("storageListaComodo"));   

  //console.log("LISTA comodo AQUi :");
  //console.log(storageList);

  if(storageList!=null){
    let b=0; 
    for(b; b<storageList.length; b++){
      let itemComodo = storageList[b];

      //console.log("TESTANDO COMOOOODO :");
      //console.log(itemComodo.comodo.id);
      //console.log("TESTANDO COMOOOODO :");


      if((itemComodo.idMudanca == idMudanca) && (itemComodo.comodo.id == idComodo) && (itemComodo.idArrayComodo == idArrayComodo) ){
        delImageComodoStorageSession(idMudanca, idComodo, idArrayComodo);
        if(listaImage === null){
          itemComodo.totalImagens = 0;
          itemComodo.images = null;
        }else{
          //let j =0;
          //for(j; j<listaImage.length; j++){
            //let image = listaImage[j];
            //console.log(image);
          //}
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

export function checkComodoAoMenosUmItem(idMudanca, objComodo)
{
  
  let listComodo =  getListComodoStorageSession(idMudanca);
  let retorno = false;
  if (listComodo != null && listComodo.length > 0) {
    let b = 0;
    for(b; b<listComodo.length; b++){
      let como = listComodo[b];
      if(como.room_id == objComodo.id){
        if(como.items.length > 0){
          retorno = true;
        }
      }
    }
  }

  if(!retorno){
    let storageListItem = JSON.parse(
      localStorage.getItem("storageListaItemComodo")
    );
    if (storageListItem != null && storageListItem.length > 0) {
      retorno = true;
    }
  }
  return retorno;
} 