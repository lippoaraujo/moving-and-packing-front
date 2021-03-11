export function setImageStorageSession(idMudanca=null, idComodo=null, imgBase64, idArrayComodo )
{
  let storageListaImagensComodoNovo = JSON.parse(localStorage.getItem("storageListaImagensComodoNovo"));
  
  let objImg = new Object();
  objImg.idMudanca = idMudanca;
  objImg.order_room_id = idComodo;

  objImg.idArrayComodo = idArrayComodo;
  objImg.image = imgBase64;
  if((storageListaImagensComodoNovo==null) || (storageListaImagensComodoNovo.length==0)){
    storageListaImagensComodoNovo = [];
    objImg.id = 0;
  }else{
    if( storageListaImagensComodoNovo!=null && storageListaImagensComodoNovo.length==0 ){
      objImg.id = 0;
    }else{
      //pega o ultimo elemento, pega o id e incrementa
      let ultimoObj = storageListaImagensComodoNovo[storageListaImagensComodoNovo.length-1];
      objImg.id = ultimoObj.id+1;
    }
  }  
  storageListaImagensComodoNovo.push(objImg);
  return localStorage.setItem("storageListaImagensComodoNovo", JSON.stringify(storageListaImagensComodoNovo));
  //return updateComodoStorageSession(idMudanca, idComodo);
} 

export function getListImageStorageSession(idMudanca=null, idComodo=null, exbicaoTela=false, idArrayComodo)
{
  let storageListaImagensComodoNovo = JSON.parse(localStorage.getItem("storageListaImagensComodoNovo"));
  if(storageListaImagensComodoNovo!=null){
    let a = 0;
    let listaRetorno = [];
    for(a; a<storageListaImagensComodoNovo.length; a++){
      let objectTest = storageListaImagensComodoNovo[a];    
      
      if( (objectTest.idMudanca===idMudanca) && (objectTest.order_room_id===idComodo) && (objectTest.idArrayComodo === idArrayComodo) ){
        listaRetorno.push(objectTest);
      }
    }
    if(exbicaoTela){
      let listaImage = separarArray(listaRetorno, 4);
      return listaImage;
    }
    return listaRetorno;
  }else{
    return null; 
  } 
}

function separarArray(arr, tamanho)
{
  var novoArray = [];
  var i = 0;
  while (i < arr.length) {
    novoArray.push(arr.slice(i, i + tamanho));
    i += tamanho;
  }
  return novoArray;
}

export function delImageStorageSession(id, idMudanca, idComodo, idArrayComodo)
{

  
  console.log("delImageStorageSession");
  console.log("idMudanca "+idMudanca);
  console.log("idComodo "+idComodo);
  console.log("idArrayComodo "+idArrayComodo);

  let storageListaImagensComodoNovo = JSON.parse(localStorage.getItem("storageListaImagensComodoNovo"));
  let a = 0;
  for(a=0; a<storageListaImagensComodoNovo.length; a++){
    let objectTest = storageListaImagensComodoNovo[a];

    console.log(objectTest);
    console.log("delImageStorageSession");

    if( (objectTest.id===id) && (objectTest.idMudanca===idMudanca) && (objectTest.order_room_id===idComodo) && (objectTest.idArrayComodo==idArrayComodo) ){
      // Começando na posição do índice 2, remova um elemento
      //list.splice(2, 1);
      storageListaImagensComodoNovo.splice(a, 1);
      //console.log("Posicao: " + a);  
      //console.log("objeto: " +objectTest);  
      //console.log("tamamnho depois de excluir: " +storageListaImagensComodoNovo.length);
      localStorage.setItem("storageListaImagensComodoNovo", JSON.stringify(storageListaImagensComodoNovo));  
      return true;
    }
  }
}

export function delImageComodoStorageSession(idMudanca, idComodo, idArrayComodo)
{
  let storageListaImagensComodoNovo = JSON.parse(localStorage.getItem("storageListaImagensComodoNovo"));
  if(storageListaImagensComodoNovo!=null){
    let a = 0;
    for(a; a<storageListaImagensComodoNovo.length; a++){
      let objectTest = storageListaImagensComodoNovo[a];      
      if( (objectTest.idMudanca===idMudanca) && (objectTest.order_room_id===idComodo) && (objectTest.idArrayComodo==idArrayComodo)){
        storageListaImagensComodoNovo.splice(a, 1);
        //GAMBIARRRAAAAA
        a--;
        //GAMBIARRRAAAAA
      }
    }    
    localStorage.setItem("storageListaImagensComodoNovo", JSON.stringify(storageListaImagensComodoNovo));
  }
  return true;
  
}

export function delAllImageStorageSession()
{
  localStorage.removeItem("storageListaImagensComodoNovo");
}

export function setAllImageStorageSession(idMudanca, idComodo, listImage, idArrayComodo)
{
  delImageComodoStorageSession(idMudanca, idComodo, idArrayComodo );
  if(listImage!=null){
    if(listImage.length > 0){
      let b = 0; 
      for(b; b<listImage.length; b++){
        let objImage = listImage[b];      
        setImageStorageSession(idMudanca, idComodo, objImage.image, idArrayComodo);
      }
    }
  }  
}