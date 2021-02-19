import {execGet} from "@/helper/execRequests.js";

export async function exportResumoHtml( objOrigem, objEdicao, urlAPICustomers, headerRequest)
{
  /*console.log("entrada");
  console.log(objEdicao);
  console.log(urlAPICustomers);
  console.log(headerRequest);
  console.log("saida");
  return false;*/

  let address = null;
  let postcode = null;
  let city = null;
  let locality = null;
  let country = null;
  let objCliente = null;

  if (objEdicao.address_id == objEdicao.customer.primary_address_id) {
    //o endereco e o mesmo do cliente
    //buscar endereco do cliente
    let urlGetCustomer = urlAPICustomers.concat(
      "/" + objEdicao.customer.id
    );
    objCliente = await execGet.call(
      objOrigem,
      urlGetCustomer,
      headerRequest
    );
    address = objCliente.primary_address.address;
    postcode = objCliente.primary_address.postcode;
    city = objCliente.primary_address.city;
    locality = objCliente.primary_address.locality;
    country = objCliente.primary_address.country;
    //console.log(objCliente);
  } else {
    //e outro endereco
    address = objEdicao.address.address;
    postcode = objEdicao.address.postcode;
    city = objEdicao.address.city;
    locality = objEdicao.address.locality;
    country = objEdicao.address.country;
  }

  let varText = "<div id='printMe'><h4>Cliente</h4>";
  varText += "<h5>Nome: " + objEdicao.customer.name + "</h5>";
  varText +=
    "<h5>email: " +
    objEdicao.customer.email +
    " | telefone: " +
    objEdicao.customer.phone +
    "</h5>";
  varText += "<hr>";
  varText += "<br><h4>Vendedor</h4>";
  varText +=
    "<h5>nome: " +
    objEdicao.user.name +
    " | email: " +
    objEdicao.user.email +
    "</h5>";
  varText += "<hr>";
  varText += "<br><h4>Mudança</h4>";
  varText += "<h5>Data: " + objCliente.expected_date + "</h5>";
  varText +=
    "<h5>Endereco: " + address + ", " + city + " - " + postcode + "</h5>";
  varText += "<h5>" + locality + ", " + country + "</h5>";
  varText += "<br><h4>Comodos :" + objEdicao.order_rooms.length + "</h4>";
  let a = 0;

  //totCubic= totCubic + Number(obj.item.cubic_feet);

  for (a; a < objEdicao.order_rooms.length; a++) {
    let objList = objEdicao.order_rooms[a];

    //calcula o total metrocubico
    let b = 0;
    let totCubic = 0;
    for (b; b < objList.items.length; b++) {
      let item = objList.items[b];
      totCubic = totCubic + Number(item.cubic_feet);
    }
    
    varText +=
      "<h5>" +
      objList.room.name +
      "<br>Tot. itens: " +
      objList.items.length +
      " - Tot. cubic: " +
      totCubic.toFixed(2) +
      " - Tot. imagens: " +
      objList.images.length +
      "</h5><br>";
  }
  varText += "</div>";
  return varText;
}

export async function exportRelatorioHtml( objOrigem, objEdicao, urlAPICustomers, headerRequest)
{

  let address = null;
  let postcode = null;
  let city = null;
  let locality = null;
  let country = null;
  let objCliente = null;

  if (objEdicao.address_id == objEdicao.customer.primary_address_id) {
    //o endereco e o mesmo do cliente
    //buscar endereco do cliente
    let urlGetCustomer = urlAPICustomers.concat(
      "/" + objEdicao.customer.id
    );
    objCliente = await execGet.call(
      objOrigem,
      urlGetCustomer,
      headerRequest
    );
    address = objCliente.primary_address.address;
    postcode = objCliente.primary_address.postcode;
    city = objCliente.primary_address.city;
    locality = objCliente.primary_address.locality;
    country = objCliente.primary_address.country;
    //console.log(objCliente);
  } else {
    //e outro endereco
    address = objEdicao.address.address;
    postcode = objEdicao.address.postcode;
    city = objEdicao.address.city;
    locality = objEdicao.address.locality;
    country = objEdicao.address.country;
  }
  let objUsuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  let varText = null;
  varText = "<div id='printMe' style= 'text-align: left;' >";
  //varText += "<script src='https://cdn.jsdelivr.net/npm/vue'></script>";


  varText +="<table style='width:100%' >";
    varText += "<tr>";
      varText += "<th><h3>Total Cube & Weight Summary</h3></th>";      

      varText += "<th>";
          varText += "<img ";
            varText += " width='150' ";
            varText += " height='100' ";
            varText += " align='right' ";
            varText += " src='" + objUsuarioLogado.tenant.logo + "'";
          varText += "></img>";
      varText += "</th>";

    varText += "</tr>";
  varText += "</table>";  


  varText +="<table style='width:100%' >";
    varText += "<tr>";
      varText += "<th>Cliente: ";
      varText += objEdicao.customer.name;
      varText += "</th>";
    varText += "</tr>";

    varText += "<tr>";
      varText += "<th>email: " +objEdicao.customer.email;
      varText += " | telefone: " +    objEdicao.customer.phone;
      varText += "</th>";
    varText += "</tr>";
  varText +="</table>";

  varText += "<hr>";
  varText +="<table style='width:100%'>";
    varText += "<tr>";
      varText += "<th>Vendedor: ";
        varText += objEdicao.user.name ;
      varText += "</th>";
    varText += "</tr>";

    varText += "<tr>";
      varText += "<th>email: "
        varText += objEdicao.user.email
      varText += "</th>";
    varText += "</tr>";
  varText +="</table>";  
  varText += "<hr>";
  varText +="<table style='width:100%'>";
    varText += "<tr>";
      varText += "<th>Mudança : "+ objEdicao.expected_date +" </th>";  
    varText += "</tr>";
    varText += "<tr>";
      varText += "<th>Endereco: " + address + ", " + city + " - " + postcode + "</th>";
    varText += "</tr>";
    varText += "<tr>";
      varText += "<th>" + locality + ", " + country + "</th>";
    varText += "</tr>";
    varText += "<tr>";
      varText += "<th>Total de Comodos :" + objEdicao.order_rooms.length + "</th>";
    varText += "</tr>";
  varText +="</table>";
  varText += "<hr>";
  varText += "<br>";
  let a = 0;
  let totalCubic = 0; 
  let totalPackage = 0; 
  let totalItens = 0;

  for (a; a < objEdicao.order_rooms.length; a++) {    
    varText +="<table style='width:100%'>";

    let objList = objEdicao.order_rooms[a];
    //console.log(objList);
    let objListImage = objEdicao.order_rooms[a].images;

    //calcula o total metrocubico
    let b = 0;
    let totCubic = 0;
    for (b; b < objList.items.length; b++) {
      let item = objList.items[b];
      totCubic = totCubic + Number(item.cubic_feet);
    }
    varText +="<tr>";
      varText += "<th>" + (a+1) + " - " + objList.room.name + "</th>";
      varText += "<th >Tot. cubic: " + totCubic.toFixed(2) + " - Tot. Itens: " + objList.items.length + "</th>";
    varText +="</tr>";

    varText +="<tr>";
      varText += "<th colspan='2'></br></th>";
    varText +="</tr>";
    

    let totItem = 0;
    for(totItem; totItem<objList.items.length; totItem++){
      let itemDoComodo = objList.items[totItem];
      //console.log(itemDoComodo);
      varText +="<tr>";
        let totalitem = itemDoComodo.pivot.quantity;
        totalItens = totalItens + totalitem;
        varText += "<td colspan='2' class='subtitle-1' >Item "+itemDoComodo.id+" - " +itemDoComodo.name+ " | cubic feet:" + itemDoComodo.cubic_feet + " </td>";
      varText +="</tr>";

      varText +="<tr>";
        varText += "<td colspan='2' class='subtitle-2' >Quantidade: "+totalitem+"</td>";        
      varText +="</tr>";
      varText +="<tr>";
        varText += "<td colspan='2' class='subtitle-2' >Obs: "+itemDoComodo.pivot.obs+"</td>";        
      varText +="</tr>";

      varText +="<tr>";
        
        varText +="<td colspan='2' class='subtitle-2' >";
          varText += "Packing: ";
          varText += itemDoComodo.packing.name + " | Uni: " + itemDoComodo.packing.unity+ " | Qtd: " + itemDoComodo.packing_qty ;
        varText +="</td>";
      varText +="</tr>";        
      varText +="<tr>";
        varText +="<td colspan='2' class='subtitle-2' >";
          varText += "Totais: ";
          
          let itemCubict = (itemDoComodo.pivot.quantity * itemDoComodo.cubic_feet);
          totalCubic = totalCubic + itemCubict;

          let itemPackage = (itemDoComodo.pivot.quantity * itemDoComodo.packing_qty );
          totalPackage = totalPackage + itemPackage;
          varText += "Cubbic feet: "+ itemCubict.toFixed(2) + " Packings: " + itemPackage ;
          
        varText +="</td>";

      varText +="</tr>";

      varText +="<tr>";
      varText += "<td colspan='2'></br></td>";
      varText +="</tr>";
      
      
    }
    varText +="<tr>";
        varText += "<td colspan='2' ><hr></td>";
    varText +="</tr>";

    varText +="<tr>";
      varText += "<th colspan='2' class='subtitle-2' >Imagens: " + objListImage.length + "</th>";
    varText +="</tr>";

    
    varText += generateHtmlListImg(objListImage, objList.room_id); 
    
  
    varText +="</table>";
    varText +="<br>";
    varText +="<hr>";
    varText +="<br>";
  }



  varText +="<table style='width:100%'>";
    varText += "<tr>";
      varText += "<th>TOTAL GERAL: </th>";  
    varText += "</tr>";
    varText += "<tr>";
      varText += "<th>Itens: " + totalItens + "</th>";  
    varText += "</tr>";
    varText += "<tr>";
      varText += "<th>Packages: " + totalPackage + "</th>";  
    varText += "</tr>";
    varText += "<tr>";
      varText += "<th>cubbic feet: " + totalCubic + "</th>";  
    varText += "</tr>";        
  varText +="</table>";

  varText += "<style>";
  varText += " @media print { ";
    varText += " * { ";
    varText += " background: transparent !important; ";
    varText += " color: #000 !important; ";
    varText += " text-shadow: none !important; ";
    varText += " filter: none !important; ";
    varText += " -ms-filter: none !important; ";
    varText += " text-align: left; ";
    varText += " } ";
  
    varText += " body { ";
    varText += " margin: 0; ";
    varText += " padding: 0; ";
    varText += " line-height: 1.4em; ";
    varText += " text-align: left; ";
    varText += " } ";
  varText += " } ";
  varText += "</style>";

  varText += "</div>";


  
  
  
  return varText;

}

function generateHtmlListImg(listImage, roomId)
{
  let html="";
  //console.log(listImage);
  let totImg=0;
  //let tamanhoLista = listImage.length;
  
  for(totImg; totImg<listImage.length; totImg++){
    if(totImg == 0 || totImg == 2){
      html +="<tr>";
    }
    let objImg = listImage[totImg]; //order_room_id
    if(objImg.order_room_id == roomId){              
      html +="<td >";
        html +="<img ";
          html +="max-height='150' ";
          html +="'250' ";
          html +="src='"+objImg.image+"' ";
          html +="class='rounded-lg' ";
        html +="></img> ";
      //html += "<h5 class='subtitle-2' >"+objImg.image+"</h4>";
      html +="</td>";
    } 

    if(totImg == 2){
      html +="</tr>";
    }

  }
  
  return html;
}