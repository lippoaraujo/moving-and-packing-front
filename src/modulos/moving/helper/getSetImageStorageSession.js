export function setImageStorageSession(idMudanca=null, idComodo=null, imgBase64 )
{
  let storageListaImagensComodo = JSON.parse(sessionStorage.getItem("storageListaImagensComodo"));
  
  let objImg = new Object();
  objImg.idMudanca = idMudanca;
  objImg.idComodo = idComodo;
  objImg.image = imgBase64;
  if((storageListaImagensComodo==null) || (storageListaImagensComodo.length==0)){
    storageListaImagensComodo = [];
    objImg.id = 0;
  }else{
    if( storageListaImagensComodo!=null && storageListaImagensComodo.length==0 ){
      objImg.id = 0;
    }else{
      //pega o ultimo elemento, pega o id e incrementa
      let ultimoObj = storageListaImagensComodo[storageListaImagensComodo.length-1];
      objImg.id = ultimoObj.id+1;
    }
  }  
  storageListaImagensComodo.push(objImg);
  return sessionStorage.setItem("storageListaImagensComodo", JSON.stringify(storageListaImagensComodo));
  //return updateComodoStorageSession(idMudanca, idComodo);
} 

export function getListImageStorageSession(idMudanca=null, idComodo=null, exbicaoTela=false)
{
  let storageListaImagensComodo = JSON.parse(sessionStorage.getItem("storageListaImagensComodo"));
  if(storageListaImagensComodo!=null){
    let a = 0;
    let listaRetorno = [];
    for(a; a<storageListaImagensComodo.length; a++){
      let objectTest = storageListaImagensComodo[a];    
      if( (objectTest.idMudanca===idMudanca) && (objectTest.idComodo===idComodo) ){
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

export function delImageStorageSession(id, idMudanca=null, idComodo=null )
{
  let storageListaImagensComodo = JSON.parse(sessionStorage.getItem("storageListaImagensComodo"));
  let a = 0;
  for(a=0; a<storageListaImagensComodo.length; a++){
    let objectTest = storageListaImagensComodo[a];
    if( (objectTest.id===id) && (objectTest.idMudanca===idMudanca) && (objectTest.idComodo===idComodo) ){
      // Começando na posição do índice 2, remova um elemento
      //list.splice(2, 1);
      storageListaImagensComodo.splice(a, 1);
      //console.log("Posicao: " + a);  
      //console.log("objeto: " +objectTest);  
      //console.log("tamamnho depois de excluir: " +storageListaImagensComodo.length);
      sessionStorage.setItem("storageListaImagensComodo", JSON.stringify(storageListaImagensComodo));  
      return true;
    }
  }
}

export function delImageComodoStorageSession(idMudanca, idComodo)
{
  let storageListaImagensComodo = JSON.parse(sessionStorage.getItem("storageListaImagensComodo"));



  /*var uniqueArray = storageListaImagensComodo.filter( function( elem, index, storageListaImagensComodo ) 
    {
      return storageListaImagensComodo.indexOf( elem ) === index;
    } 
  );
  console.log(uniqueArray);*/
  /*var arr = [
    {url: "link 1"},
    {url: "link 2"},
    {url: "link 3"}
  ];

  arr = arr.filter(function(el){
    return el.url !== "link 2";
  });*/ 
  /*let obj{
    idMudanca: idMudanca,
    idComodo: idComodo,
  };

  storageListaImagensComodo = storageListaImagensComodo.filter(
    function (obj, index, storageListaImagensComodo){
      return storageListaImagensComodo.idMudanca == idMudanca && storageListaImagensComodo.idComodo == idComodo ;
    }
  );
  sessionStorage.setItem("storageListaImagensComodo", JSON.stringify(storageListaImagensComodo));*/

  if(storageListaImagensComodo!=null){
    let a = 0;
    for(a; a<storageListaImagensComodo.length; a++){
      let objectTest = storageListaImagensComodo[a];      
      if( (objectTest.idMudanca===idMudanca) && (objectTest.idComodo===idComodo) ){
        storageListaImagensComodo.splice(a, 1);
        //GAMBIARRRAAAAA
        a--;
        //GAMBIARRRAAAAA
      }
    }    
    sessionStorage.setItem("storageListaImagensComodo", JSON.stringify(storageListaImagensComodo));
  }
  return true;
  
}

export function delAllImageStorageSession()
{
  sessionStorage.removeItem("storageListaImagensComodo");
}

export function setAllImageStorageSession(idMudanca, idComodo, listImage)
{
  if(listImage!=null){
    if(listImage.length > 0){
      let b = 0; 
      for(b; b<listImage.length; b++){
        let objImage = listImage[b];      
        setImageStorageSession(idMudanca, idComodo, objImage.image );
      }
    }
  }
  
}