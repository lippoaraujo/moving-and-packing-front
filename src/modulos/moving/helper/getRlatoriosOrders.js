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
  

  let varTextCustomer ="<table style='width:100%;' >"; 
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

  let varTextOrder ="<table style='width:100%;' >";
    
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
  for (a; a < objEdicao.order_rooms.length; a++) {    
    
    let objList = objEdicao.order_rooms[a];
    //console.log(objList);
    //let objListImage = objEdicao.order_rooms[a].images;

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

    
    if(objList.items.length>1){
      duasColunas = true;
    }else{
      duasColunas = false;
    }
    
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
      
      if((listItemDoComodo.length <= 3) && (a==0) ){
        duasColunas = true;
      }else{
        duasColunas = false;
      }

      let totItem = 0;
      varTextBody +="<tr>";
      for(totItem; totItem<listItemDoComodo.length; totItem++){
        let itemDoComodo = listItemDoComodo[totItem];



        /*let itemCubict = (itemDoComodo.pivot.quantity * itemDoComodo.cubic_feet);
        totalCubic = totalCubic + itemCubict;*/

        let itemPackage = (itemDoComodo.pivot.quantity * itemDoComodo.packing_qty );
        totalPackage = totalPackage + itemPackage;

        //console.log("UUIUIUIUIUI");
        //console.log(itemDoComodo);
        //console.log("UUIUIUIUIUI");
        //if(colunas === 1){
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

      
      
      
      /*
      let itemDoComodo = objList.items[totItem];
      //console.log("AAAAAAAAAAQQQQQQQQUIIIIIIII");
      //console.log(itemDoComodo[0].pivot);
      //console.log("AAAAAAAAAAQQQQQQQQUIIIIIIII");

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
      */
      
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
          if(!duasColunas){
            //console.log("DATA1");
            //varTextFooter +="<td></td>";
            //varTextFooter +="<td></td>";
            //varTextFooter +="<td colspan='3'> Total Cubic Feet: " + totCubic + " | Total Weight (lbs.): 2233.2 </td>";
          }else{
            //console.log("DATA2");
            //varTextFooter +="<td> </td>";
            //varTextFooter +="<td> </td>";
            //varTextFooter +="<td> </td>";
            //varTextFooter +="<td> </td>";
            //varTextFooter +="<td></td>";
            //varTextFooter +="<td colspan='6'>  </td>";
          }

          
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



  let varTextTotal ="<table style='width:100%'>";
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
console.log(varTextTotal);

  let varTotalCube ="<table style='width:100%; border: 0px!important; background:white;' >";
    
    //varTotalCube +="<tbody>";

    varTotalCube += "<tr style='border: 0px!important;' >";
      varTotalCube += "<td style='border: 0px!important; text-align: center;' ><h3>Total Cube & Weight Summary</h3></td>";
    
      varTotalCube += "<td style='border: 0px!important;' >";
        varTotalCube += "<img ";
          varTotalCube += " width='100' ";
          varTotalCube += " height='50' ";
          varTotalCube += " align='center' ";
          varTotalCube += " src='" + objUsuarioLogado.tenant.logo + "'";
        varTotalCube += "></img>";
      varTotalCube += "</td>";
    
    varTotalCube += "</tr>";

    varTotalCube += "<tr style='border: 0px!important;'>";
        varTotalCube += "<td style='border: 0px!important;' colspan='2'>"+ varTextTotal +"</td>";
    varTotalCube += "<tr>";
  varTotalCube +="</table>";

//console.log(varTotalCube);


  


  let varTotalComodos ="<table style='width:100%; border: 0px!important; background:white;' >";
    
    //varTotalComodos +="<tbody>";

    varTotalComodos += "<tr style='border: 0px!important;' >";
      varTotalComodos += "<td style='border: 0px!important; text-align: center;' ><h3>Itemized Customer Survey/Inventory</h3></td>";
    
      varTotalComodos += "<td style='border: 0px!important;' >";
        varTotalComodos += "<img ";
          varTotalComodos += " width='100' ";
          varTotalComodos += " height='50' ";
          varTotalComodos += " align='center' ";
          //varTotalComodos += " style='margin-right: 9px; margin-top: 9px;' ";
          varTotalComodos += " src='" + objUsuarioLogado.tenant.logo + "'";
        varTotalComodos += "></img>";
      varTotalComodos += "</td>";
    
    varTotalComodos += "</tr>";

    varTotalComodos += "<tr style='border: 0px!important;'>";
        varTotalComodos += "<td style='border: 0px!important;' colspan='2'>"+ varTextItemComodoFim +"</td>";
    varTotalComodos += "<tr>";
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

varText += "<br>" + varTextOrder;
varText += "<br>" + varTotalCube;
varText += "<br>" + varTotalComodos;
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


  varText += "table, th, td {";
    varText += "border: 1px solid black;";
  varText += "}";

  varText += "table {";
    varText += "width: 100%;";
    varText += "border-collapse: collapse;";
    varText += "text-align: left;";
  varText += "}";





  varText += "thead,";
  varText += "tfoot {";
    varText += "background-color: #3f87a6;";
    varText += "color: #fff;";
  varText += "}";

  varText += "tbody {";
    varText += "background-color: #e4f0f5;";
  varText += "}";

  varText += "caption {";
    varText += "padding: 10px;";
    varText += "caption-side: bottom;";
  varText += "}";

  varText += "table {";
    varText += "border-collapse: collapse;";
    varText += "border: 2px solid rgb(200, 200, 200);";
    varText += "letter-spacing: 1px;";
    varText += "font-family: sans-serif;"
    varText += "font-size: .8rem;";
  varText += "}";

  varText += "td,";
  varText += "th {";
  varText += "border: 1px solid rgb(190, 190, 190);";
    varText += "padding: 5px 10px;";
    varText += ";}";

  varText += "td {";
    varText += "text-align: center;";
  varText += "}";

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
    console.log("SIZE: "+size);
		for (var i = 0; i < cols; i++) {
			var start = i*size;
			ret.push(array.slice(start, start+size));
		}
	}
  console.log("UUUUUUUUUUUUUUUUUUU");
  console.log(ret);
  console.log("UUUUUUUUUUUUUUUUUUU");
	return ret;
}



/*
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
}*/