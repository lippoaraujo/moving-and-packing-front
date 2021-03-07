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
  

  let varTextCustomer ="<table id='wrapper' style=' border-spacing: inherit!important;  width:100%; ' >"; 
  varTextCustomer +="<thead>";
    varTextCustomer += "<tr>";
      varTextCustomer += "<th>Customer</th>";
      varTextCustomer += "<th>Email | Fone</th>";
    varTextCustomer += "</tr>";
  varTextCustomer +="</thead>";
  varTextCustomer +="<tbody >";
    varTextCustomer += "<tr >";
      varTextCustomer += "<td style='text-align: left;'>";
        varTextCustomer += objEdicao.customer.name;
      varTextCustomer += "</td>";
      varTextCustomer += "<td style='text-align: left;'>";
        varTextCustomer += objEdicao.customer.email + " | " +objEdicao.customer.phone;
      varTextCustomer += "</td>";
    varTextCustomer += "</tr>";
  varTextCustomer +="</tbody>";
  varTextCustomer +="</table>";
  //console.log(varTextCustomer);

  let varTextOrder ="<table id='wrapper' style=' border-spacing: inherit!important;  width:100%; ' >";
    
    varTextOrder +="<thead>";
      varTextOrder += "<tr>";
        varTextOrder += "<th >Order : " + objEdicao.id + "</th>";  
        varTextOrder += "<th >"+ objEdicao.expected_date +" </th>";  
      varTextOrder += "</tr>";
    varTextOrder +="</thead>";

    varTextOrder +="<tbody>";
      varTextOrder += "<tr>";
        varTextOrder += "<td colspan='2'>Endereco: " + address + ", " + city + " - " + postcode + "</td>";
      varTextOrder += "</tr>";
      varTextOrder += "<tr>";
        varTextOrder += "<td colspan='2'>" + locality + ", " + country + "</td>";
      varTextOrder += "</tr>";
      varTextOrder += "<tr>";
        varTextOrder += "<td >Total de Comodos :" + objEdicao.order_rooms.length + "</td>";
        varTextOrder += "<td >Vendedor :" + objEdicao.user.name + " | " + objEdicao.user.email + "</td>";
      varTextOrder += "</tr>";
      varTextOrder +="</tbody >";
  varTextOrder +="</table>";

  //console.log(varTextOrder);

  



  


  






  
  
  //console.log(varTextCustomer);
  //console.log(varTextOrder);

  let varText = "<div id='printMe' >";

  varText += varTextCustomer;
  

  

  
  let a = 0;
  let totalCubic = 0; 
  let totalPackage = 0; 
  let totalItens = 0;
  let duasColunas =false;

  let varTextItemComodoFim = "";
  let listImgComodo=[];
  let varTextPackage = getListPackage(objEdicao.order_rooms);
  for (a; a < objEdicao.order_rooms.length; a++) {    
    
    let objList = objEdicao.order_rooms[a];
    //console.log(objList);
    listImgComodo.push(objEdicao.order_rooms[a].images);

    //calcula o total metrocubico
    let b = 0;
    let totCubic = 0;
    for (b; b < objList.items.length; b++) {
      let item = objList.items[b];
      totCubic = totCubic + Number(item.cubic_feet);
    }
    
    
    
    let varTextItemComodo = "<table style='width:100%'>";
    varTextItemComodo +="<caption style='caption-side: top; text-align: left;'>";
    varTextItemComodo += objList.id + " - " + objList.room.name;
    varTextItemComodo +="</caption>";
    
    objList.items = getItensOrdenadosImpressao(objList.items, 3);

    console.log(objList.items);
    
    //if(objList.items.length>3){
      //duasColunas = true;
    //}else{
      //duasColunas = false;
    //}
    
    //varText += varTextThead;


    //varText +="<tr>";
      //varText += "<th colspan='2'>" + objList.id + " - " + objList.room.name + "</th>";
      //varText += "<th >Tot. cubic: " + totCubic.toFixed(2) + " - Tot. Itens: " + objList.items.length + "</th>";
    //varText +="</tr>";

    //varText +="<tr>";
      //varText += "<th colspan='2'></br></th>";
    //varText +="</tr>";
    let varTextBody ="<tbody>";
    let totItemm = 0;

    for(totItemm; totItemm < objList.items.length; totItemm++){

      let listItemDoComodo = objList.items[totItemm];
      
      

      let totItem = 0;
      varTextBody +="<tr>";

      for(totItem; totItem<listItemDoComodo.length; totItem++){


        if(totItem == 0){
          
          if(listItemDoComodo.length >= 2){
            duasColunas = true;
          }else{
            duasColunas = false;
          }
        }


        let itemDoComodo = listItemDoComodo[totItem];

        let itemPackage = (itemDoComodo.pivot.quantity * itemDoComodo.packing_qty );
        totalPackage = totalPackage + itemPackage;

        if(duasColunas){
          let totalitem = itemDoComodo.pivot.quantity;
          totalItens = totalItens + totalitem;
          varTextBody += "<td>" + itemDoComodo.pivot.quantity + "</td>";
          varTextBody += "<td>" + itemDoComodo.name + "</td>";
          varTextBody += "<td>" + itemDoComodo.cubic_feet + "</td>";
          //varTextBody +="</tr>"
        }else{
          //varTextBody +="<tr>";
          let totalitem = itemDoComodo.pivot.quantity;
          totalItens = totalItens + totalitem;
          varTextBody += "<td>" + itemDoComodo.pivot.quantity + "</td>";
          varTextBody += "<td>" + itemDoComodo.name + "</td>";
          varTextBody += "<td>" + itemDoComodo.cubic_feet + "</td>";

          if(listItemDoComodo[totItem+1]!=undefined){
            totItem = totItem + 1
            let itemDoComodoNovo = listItemDoComodo[totItem];
            let totalitem = itemDoComodoNovo.pivot.quantity;
            totalItens = totalItens + totalitem;
            varTextBody += "<td>" + itemDoComodoNovo.pivot.quantity + "</td>";
            varTextBody += "<td>" + itemDoComodoNovo.name +"</td>";
            varTextBody += "<td>" + itemDoComodoNovo.cubic_feet  + "</td>";
          } 
        }
      }

      varTextBody +="</tr>";      
    }
    varTextBody +="</tbody>";


    let varTextThead ="<thead>";
      varTextThead +="<tr>"
        //let colunas = 0;
        if(!duasColunas){
          varTextThead +="<th>Qtd.</th>";
          varTextThead +="<th>Item Description</th>";
          varTextThead +="<th>CFt.</th>";
          //colunas = 1;
        }else{
          //colunas = 2;
          varTextThead +="<th>Qtd.</th>";
          varTextThead +="<th>Item Description</th>";
          varTextThead +="<th>CFt.</th>";
            
          varTextThead +="<th>Qtd.</th>";
          varTextThead +="<th>Item Description</th>";
          varTextThead +="<th>CFt.</th>";
        }
      varTextThead +="</tr>";
    varTextThead +="</thead>";
    //console.log(varTextThead);
    varTextItemComodo += varTextThead;
    //console.log(varTextBody);
    varTextItemComodo += varTextBody;

    let varTextFooter = null;
      varTextFooter = "<tfoot>";
        varTextFooter +="<tr>";
        varTextFooter +="</tr>";
      varTextFooter +="</tfoot>";

      varTextFooter +="<caption style='caption-side: button; text-align: right;'>";
          let totCuMete = (totCubic/35.15).toFixed(2);
          let totLb = (totCuMete*2.205).toFixed(2);
        varTextFooter +="Total <br>";
        varTextFooter +="Cubic Feet: " + totCubic + " | Cubic Meter " + totCuMete + " | Weight (lbs.) " + totLb;
      varTextFooter +="</caption>";

      totalCubic = totalCubic + totCubic;
            
      //console.log(varTextFooter);
      varTextItemComodo += varTextFooter;
    varTextItemComodo +="</tbody>";

    //varText +="<tr>";
        //varText += "<td colspan='2' ><hr></td>";
    //varText +="</tr>";

    //varText +="<tr>";
      //varText += "<th colspan='2' class='subtitle-2' >Imagens: " + objListImage.length + "</th>";
    //varText +="</tr>";

    
    
    //varText += generateHtmlListImg(objListImage, objList.room_id); 
    
  
    varTextItemComodo +="</table>";

    varTextItemComodoFim += varTextItemComodo;
  }

  

  let varTextTotal ="<table id='wrapper' style='width: 100%;' >";
  //varTextTotal +="<caption style='caption-side: top; text-align: left;'>";
    //varTextTotal += "Total Cube & Weight Summary";
  //varTextTotal +="</caption>";
  varTextTotal += "<thead>";
    varTextTotal += "<tr>";
      varTextTotal += "<th> Itens </th>";
      varTextTotal += "<th> Est. Cubic Feet </th>";
      varTextTotal += "<th> Est. Cubic Meter  </th>";
      varTextTotal += "<th> Est. Weight (lbs.) </th>";
      varTextTotal += "<th> Packages </th>";  
    varTextTotal += "</tr>";
  varTextTotal += "</thead>";
  varTextTotal += "<tbody>";

  let cubicFeetAq = totalCubic.toFixed(2);
  let cubicMeterAq = (cubicFeetAq/35.315).toFixed(2);

  varTextTotal += "<tr>";
    varTextTotal += "<td> " + totalItens + " </td>";    
    varTextTotal += "<td>" + cubicFeetAq + "</td>";
    varTextTotal += "<td>" + cubicMeterAq + "</td>";
    varTextTotal += "<td>" + (cubicMeterAq * 2,205).toFixed(2) + "</td>";
    varTextTotal += "<td>" + totalPackage + " </td>";
  varTextTotal += "</tr>";
  varTextTotal += "</tbody>";
varTextTotal +="</table>";


  let varTotalCube ="<table id='wrapper' style='border-spacing: inherit!important; table-layout:fixed; width:100%; border: 0px!important; background:white;' >";
    varTotalCube += "<thead>";
    varTotalCube += "<tr style='border: 0px!important;' >";
      varTotalCube += "<th style=' max-width:50%; border: 0px!important; text-align: center; vertical-align: middle; '><h3>Total Cube & Weight Summary</h3></th>";
      varTotalCube += "<th style=' max-width:50%; border: 0px!important; text-align: center; vertical-align: middle; '>";
        varTotalCube += "<img ";
          varTotalCube += " width='20%' ";
          varTotalCube += " align='center' ";
          varTotalCube += " src='" + objUsuarioLogado.tenant.logo + "'";
        varTotalCube += "></img>";
      varTotalCube += "</th>";
    varTotalCube += "</tr>";
    varTotalCube += "</thead>";
    varTotalCube += "<tbody>";
    varTotalCube += "<tr style='border: 0px!important;'>";
        varTotalCube += "<td style='border: 0px!important;' colspan='2' >"+ varTextTotal +"</td>";
    varTotalCube += "<tr>";
    varTotalCube += "</tbody>";
  varTotalCube +="</table>";

//console.log(varTotalCube);


  


  let varTotalComodos ="<table id='wrapper' style='border-spacing: inherit!important; table-layout:fixed; width:100%; border: 0px!important; background:white;' >";
    
    //varTotalComodos +="<tbody>";
    varTotalComodos +="<thead>";
    varTotalComodos += "<tr style='border: 0px!important;' >";
      varTotalComodos += "<th style=' max-width:50%; border: 0px!important; text-align: center; vertical-align: middle; ' ><h3>Itemized Customer Survey/Inventory</h3></th>";
      varTotalComodos += "<th style=' max-width:50%; border: 0px!important; text-align: center; vertical-align: middle; '  >";
      varTotalComodos += "<img ";
        varTotalComodos += " width='20%' ";
          varTotalComodos += " align='center' ";
          varTotalComodos += " src='" + objUsuarioLogado.tenant.logo + "'";
          varTotalComodos += "></img>";
        varTotalComodos += "</th>";
    varTotalComodos += "</tr>";
    varTotalComodos +="</thead>";
    varTotalComodos +="<tbody>";
    varTotalComodos += "<tr style='border: 0px!important;'>";
        varTotalComodos += "<td style='border: 0px!important;' colspan='2'>"+ varTextItemComodoFim +"</td>";
    varTotalComodos += "<tr>";
    varTotalComodos +="</tbody>";
  varTotalComodos +="</table>";

  let varAssinaturas ="<table style='width:100%; border: 0px!important; background:white; table-layout:fixed' >";
    varAssinaturas += "<tr style='border: 0px!important;' >";

      varAssinaturas += "<td colspan='2' style='border: 0px!important; text-align: justify; word-wrap:break-word' >";
        varAssinaturas += "Signing below acknowledges receipt of an estimate of your move based on the Table of Measurements. Only the items listed are included in the cost. Any items added or additional services may result in additional cost.";
      varAssinaturas += "</td>";
    
    varAssinaturas += "</tr>";



    varAssinaturas += "<tr style='border: 0px!important;' >";

      varAssinaturas += "<td style='border: 0px!important; text-align: left;' >";
        varAssinaturas += "____________________________________";
        varAssinaturas += "<br>Customer signatura";        
      varAssinaturas += "</td>";
    
      varAssinaturas += "<td style='border: 0px!important; text-align: left;' >";
      varAssinaturas += "____________________________________";
        varAssinaturas += "<br>Date";        
      varAssinaturas += "</td>";
    varAssinaturas += "</tr>";


    varAssinaturas += "<tr style='border: 0px!important;' >";

      varAssinaturas += "<td style='border: 0px!important; text-align: left;' >";
      varAssinaturas += "____________________________________";
        varAssinaturas += "<br>Carrier's Representative";        
      varAssinaturas += "</td>";
    
      varAssinaturas += "<td style='border: 0px!important; text-align: left;' >";
      varAssinaturas += "____________________________________";
        varAssinaturas += "<br>Date";        
      varAssinaturas += "</td>";
    varAssinaturas += "</tr>";

    
  varAssinaturas +="</table>";

let varImage = generateHtmlListImg(listImgComodo);

varText += "<br>" + varTextOrder;
varText += "<br>" + varTotalCube;
varText += "<br>" + varTotalComodos;
varText += "<br>" + varTextPackage;
varText += "<br>" + varImage;
varText += "<br>" + varAssinaturas;
//varText += "<br>" + ;
  
/*function calculaRaiz($grauraiz,$numero){
  return pow($numero,(1/$grauraiz));
}*/


varText += "<style>";

  varText += "";
  varText += "@page {";
    //varText += " size: landscape; ";
    varText += " size: A4; ";
    varText += " margin: 2px; ";
  varText += "}";
  
  varText += "@media print {";
    varText += ".pagebreak { page-break-before: always; } ";
    varText += ".page {";
      varText += "margin: 0;";
      varText += "border: initial;";
      varText += "border-radius: initial;";
      varText += "width: initial;";
      varText += "min-height: initial;";
      varText += "box-shadow: initial;";
      varText += "background: initial;";
      varText += "page-break-after: always;";
    varText += "}";
  varText += "}";


  

  /*varText += "table {";
    varText += "width: 100%;";
    varText += "border-collapse: collapse;";
    varText += "text-align: left;";
  varText += "}";*/





  varText += "#wrapper thead, #wrapper tfoot ";
  varText += "{";
    varText += "background-color: #3f87a6;";
    varText += "color: #fff;";
  varText += "}";

  varText += "#wrapper tbody {";
    varText += "background-color: #e4f0f5;";
  varText += "}";

  varText += "#wrapper caption {";
    varText += "padding: 10px;";
    varText += "caption-side: bottom;";
  varText += "}";

  varText += "#wrapper table {";
    varText += "border-collapse: collapse;";
    varText += "border: 1px solid rgb(200, 200, 200);";

    varText += "border-spacing: inherit!important;";
    
    //varText += "letter-spacing: 1px;";
    //varText += "font-family: sans-serif;"
    //varText += ""
    //varText += "font-size: .8rem;";
  varText += "}";

  varText += "#wrapper th, #wrapper td";
  varText += "{";
    varText += "border: 1px solid rgb(190, 190, 190);";
    varText += "padding: 5px 10px;";
  varText += "}";

  //varText += "#wrapper td {";
    //varText += "text-align: center;";
  //varText += "}";

  varText += "</style>";

  varText += "</div>";
  
  return varText;

}



function getItensOrdenadosImpressao(array, cols=3){
  var ret = [];
	if (cols==1 || array.length === 1){
		ret.push(array);
	}else{
		var size = Math.ceil(array.length / cols);
    //console.log("SIZE: "+size);
		for (var i = 0; i < cols; i++) {
			var start = i*size;
			ret.push(array.slice(start, start+size));
		}
	}
	return ret;
}















































//function generateHtmlListImg(listImage, roomId)
function generateHtmlListImg(listImage)
{
  let html = "<div class='pagebreak'> </div>";
  html="<table id='wrapper' style='width:100%; border: 0px!important; background:white; table-layout:fixed' >";   
  html +="<thead>";
    html += "<tr>";
      html += "<th colspan='2'>Imagens</th>";  
    html += "</tr>";
  html +="</thead>";
  html +="<tbody>";


  let totListImg=0;
  for(totListImg; totListImg<listImage.length; totListImg++){
    
    let listIm = listImage[totListImg];
    let a = 0;

    for(a; a<listIm.length; a++){

      if(a == 0 || a == 2){
        html += "<tr style='border: 0px!important;' >";
      }

      let objImg = listIm[a]; 
      html +="<td >";
        html +="<img ";
          html +="max-height='150' ";
          html +="'250' ";
          html +="src='"+objImg.image+"' ";
          html +="class='rounded-lg' ";
        html +="></img> ";
      html +="</td>";

      if(a == 2){
        html +="</tr>";
      }

    }
    //html += "</tr>";
  }
  html +="</tbody>";
  html +="</table>"; 
  return html;
  
}

function  getListPackage(listOrderRooms)
{
  let html = "<div class='pagebreak'> </div>";
  html="<table id='wrapper' style='width:100%; border: 0px!important; background:white; table-layout:fixed' >";   
  html +="<thead>";
    html += "<tr>";
      html += "<th colspan='2'>Carrier Packing & Crating Summary</th>";  
    html += "</tr>";
  html +="</thead>";
  html +="<tbody>";

  html += "<tr style='border: 0px!important;'>";
    html += "<td style='border: 0px!important;' colspan='2' >"+ tabelaConteudoPackage(listOrderRooms) +"</td>";
  html += "<tr>";

  html +="</tbody>";
  html +="</table>"; 
  return html;

}

function tabelaConteudoPackage(listOrderRooms){
  let a=0;
  let lista = [];
  for(a; a<listOrderRooms.length; a++){
    let room = listOrderRooms[a];
    let items = room.items;
    let countItem = 0
    for(countItem; countItem<items.length; countItem++){
      //html += "<tr>";
      let item = items[countItem];
      let packing = item.packing;
      let obj = new Object();
      obj.qtd = item.packing_qty;
      obj.name = packing.name;

      obj.nameRoom = room.room.name;
      lista.push(obj);
    }
  }

  console.log("AAA");
  console.log(lista);
  console.log("AAA");

  let ll = getItensOrdenadosImpressao(lista, 3);
  console.log("AA");
  console.log(ll);
  console.log("AA");

  let html ="<table id='wrapper' style='width: 100%;' >";
  html += "<thead>";
    if(ll.length>=2){

      html += "<tr>";
        html += "<th> Qtd. </th>";
        html += "<th> Package Description </th>";
        html += "<th> Room  </th>";
        html += "<th> Qtd. </th>";
        html += "<th> Package Description </th>";
        html += "<th> Room  </th>";
      html += "</tr>";

    } else {
      html += "<tr>";
        html += "<th> Qtd. </th>";
        html += "<th> Package Description </th>";
        html += "<th> Room  </th>";
      html += "</tr>";
    }
  html += "</thead>";
  html += "<tbody>";
  



  let b = 0;
  for(b; b<ll.length; b++){

    if(ll.length>=2){
      

      let obj = new Object();
      obj = ll[b];

      let a=0;
      let cont = 0;
      for(a; a<obj.length; a++){
        if(cont==0){
          html += "<tr>";
        }
        let ob = obj[a];
        
        html += "<td>" + ob.qtd + "</td>";
        html += "<td>" + ob.name + "</td>";
        html += "<td>" + ob.nameRoom + "</td>";

          
        if(ob[a+1]!=undefined){
          a = a +1;  
          let ob2 = ob[a];
          html += "<td>" + ob2.qtd + "</td>";
          html += "<td>" + ob2.name + "</td>";
          html += "<td>" + ob2.nameRoom + "</td>";
        }
        cont = cont + 1;
        if(cont==2){
          cont = 0;
          html += "</tr>";
        }
      }
      //html += "<tr>";
      
      
      if(ll[b+1]!=undefined){
        b = b+1;
        
        let obj2 = new Object();
        obj2 = ll[b];


        let z=0;
        let cont2 = 0;
        
        for(z; z<obj2.length; z++){

          if(cont2==0){
            html += "<tr>";
          }

          let ob = obj2[z];          
          html += "<td>" + ob.qtd + "</td>";
          html += "<td>" + ob.name + "</td>";
          html += "<td>" + ob.nameRoom + "</td>";
  
          if(obj2[z + 1]!=undefined){
            z = z +1;  
            let ob2 = new Object();
            ob2 = obj2[z];
            html += "<td>" + ob2.qtd + "</td>";
            html += "<td>" + ob2.name + "</td>";
            html += "<td>" + ob2.nameRoom + "</td>";
          }
        }
        cont2 = cont2 + 1;
        if(cont2==2){
          cont2 = 0;
          html += "</tr>";
        }
      }
      
    } else {
      let obj = new Object();
      obj = ll[b];
      html += "<tr>";
        html += "<td>" + obj.qtd + "</td>";
        html += "<td>" + obj.name + "</td>";
        html += "<td>" + obj.nameRoom + "</td>";
      html += "</tr>";
    }
  }
  html += "</tbody>";
  html += "</table>";
  return html;
}

//getItensOrdenadosImpressao(objList.items, 3);