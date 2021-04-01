import {execGet} from "@/helper/execRequests.js";


export async function exportRelatorioHtmlNovo()
{
  let html ='<div id="printMe">';
  
    html +='<div class="report">';
      html +='<div class="report_container">';
        
        //html +='<header>';
        html +='<section>';
          html += getHeader();
        //html +='</header>';
        html +='</section>';

        html +='<section>';
          html += getComodos();
          //console.log(getComodos());
        html +='</section>';

        html +='<section>';
          html += getCarrier();
          //console.log(getCarrier());
        html +='</section>';

        html +='<section>';
          html += getImage();
          //console.log(getImage());
        html +='</section>';

        html +='<footer>';
          html +='<p>';
            html +='Signing below acknowledges receipt of an estimate of your move based';
            html +='on the Table of Measurements. Only the items listed are included in';
            html +='the cost. Any items added or additional services may result in';
            html +='additional cost.';
          html +='</p>';
          html +='<div class="signature_container">';
            html +='<div class="signature_left">Customer Signature</div>';
            html +='<div class="signature_right">Date</div>';
          html +='</div>';

          html +='<div class="signature_container">';
            html +='<div class="signature_left">Carrier\'s Representative</div>';
            html +='<div class="signature_right">Date</div>';
          html +='</div>';
        html +='</footer>';

      html +='</div>';
    html +='</div>';

    html +='<style>';
      html += getStyleNovo();
      //console.log(getStyleNovo());
    html +='</style>';
    
    html +='</div>';
  
  return  html;
}


function getHeader()
{

  let objUsuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  let header = null;
  header ='<div class="report_header">';
    header +='<h1>Itemized Customer Survey/Inventory</h1>';
    header +='<img width="20%" src="' + objUsuarioLogado.tenant.logo + '" />';
  header +='</div>';

  header +='<div class="report_detail_container">';  
    header +='<div id="order_box" class="order_container">';
      header +='<div class="order_title">';
        header +='<h3>Order</h3>';
      header +='</div>';
      
      header +='<div class="order_details">';
        header +='<span>Number: 15</span>';
        header +='<p>Total rooms: 2</p>';
        header +='<p>Seller: LippoAraujo | admin@admin.com</p>';
        header +='<p>Date: 20/01/2021</p>';
        header +='<span>Delivery date: 28/01/2021</span>';
        header +='<p class="order_address">';
          header +='Address: 107 Vailco Lane Austin, TX 78738';
        header +='</p>';
      header +='</div>';
    header +='</div>';

    header +='<div id="customer_box" class="order_container">';
      header +='<div class="order_title">';
        header +='<h3>Customer</h3>';
      header +='</div>';
      header +='<div class="order_details">';
        header +='<span>Name: Elias Siqueira</span>';
        header +='<p>Phone: (650) 625-7045</p>';
        header +='<p>Email: nicosiqueira@gmail.com</p>';
      header +='</div>';
    header +='</div>';
  header +='</div>';

  header +='<div class="totals_container">';
    header +='<div class="total">';
      header +='<p>Total Est. Weight:</p>';
      header +='<span>13,655 lbs.</span>';
    header +='</div>';
    header +='<div class="total">';
      header +='<p>Total Est. Cubic Feet:</p>';
      header +='<span>2,023</span>';
    header +='</div>';
    header +='<div class="total">';
      header +='<p>Total Nb. Items:</p>';
      header +='<span>240</span>';
    header +='</div>';
  header +='</div>';

  return header;
}

function getComodos(){
  let htmlComodo = '';
  htmlComodo += '<div class="items_container">';
    htmlComodo += '<h3>Bedroom</h3>';

    htmlComodo += '<div class="items_table_container">';
      
      htmlComodo += '<table id="tableReport">';

        htmlComodo += '<tr>';
          htmlComodo += '<th class="item_qtd">#</th>';
          htmlComodo += '<th class="item_desc">Item Description</th>';
          htmlComodo += '<th class="item_cft">CFt.</th>';
        htmlComodo += '</tr>';

        htmlComodo += '<tr>';
          htmlComodo += '<td class="item_qtd">1</td>';
          htmlComodo += '<td class="item_desc">Bed - Queen</td>';
          htmlComodo += '<td class="item_cft">65.0</td>';
        htmlComodo += '</tr>';

        htmlComodo += '<tr>';
          htmlComodo += '<td class="item_qtd">1</td>';
          htmlComodo += '<td class="item_desc">Bed - Queen</td>';
          htmlComodo += '<td class="item_cft">65.0</td>';
        htmlComodo += '</tr>';

      htmlComodo += '</table>';

      htmlComodo += '<table id="tableReport">';
        
        htmlComodo += '<tr>';
          htmlComodo += '<th class="item_qtd">#</th>';
          htmlComodo += '<th class="item_desc">Item Description</th>';
          htmlComodo += '<th class="item_cft">CFt.</th>';
        htmlComodo += '</tr>';

        htmlComodo += '<tr>';
          htmlComodo += '<td class="item_qtd">1</td>';
          htmlComodo += '<td class="item_desc">Bed - Queen</td>';
          htmlComodo += '<td class="item_cft">65.0</td>';
        htmlComodo += '</tr>';

        htmlComodo += '<tr>';
          htmlComodo += '<td class="item_qtd">1</td>';
          htmlComodo += '<td class="item_desc">Bed - Queen</td>';
          htmlComodo += '<td class="item_cft">65.0</td>';
        htmlComodo += '</tr>';

      htmlComodo += '</table>';
    
    htmlComodo += '</div>';

    htmlComodo += '<div class="items_totals_container">';
        htmlComodo += '<div class="items_totals">';
          htmlComodo += '<p>Total Cubic Feet:</p>';
          htmlComodo += '<span>112.0</span>';
        htmlComodo += '</div>';

        htmlComodo += '<div class="items_totals">';
          htmlComodo += '<p>Total Weight (lbs.):</p>';
          htmlComodo += '<span>756.0</span>';
        htmlComodo += '</div>';
      htmlComodo += '</div>';
  htmlComodo += '</div>';
  return htmlComodo;
}

function getCarrier()
{
  let htmlCarrier = '';
  htmlCarrier += '<div class="report_header">';
    htmlCarrier += '<h1>Carrier Packing & Crating Summary</h1>';
  htmlCarrier += '</div >';

    htmlCarrier += '<div class="items_container">';

      htmlCarrier += '<div class="items_table_container">';
    
        htmlCarrier += '<table id="tableReport" >';
        
          htmlCarrier += '<tr>';
            htmlCarrier += '<th>#</th>';
            htmlCarrier += '<th>Package Description</th>';
            htmlCarrier += '<th>Room</th>';
          htmlCarrier += '</tr>';

          htmlCarrier += '<tr>';
            htmlCarrier += '<td>3</td>';
            htmlCarrier += '<td>paperboard boxes</td>';
            htmlCarrier += '<td>Master Bedroom</td>';
          htmlCarrier += '</tr>';

          htmlCarrier += '<tr>';
            htmlCarrier += '<td>3</td>';
            htmlCarrier += '<td>paperboard boxes</td>';
            htmlCarrier += '<td>Master Bedroom</td>';
          htmlCarrier += '</tr>';
          
        htmlCarrier += '</table>';

        htmlCarrier += '<table id="tableReport" >';
        
          htmlCarrier += '<tr>';
            htmlCarrier += '<th>#</th>';
            htmlCarrier += '<th>Package Description</th>';
            htmlCarrier += '<th>Room</th>';
          htmlCarrier += '</tr>';

          htmlCarrier += '<tr>';
            htmlCarrier += '<td>3</td>';
            htmlCarrier += '<td>paperboard boxes</td>';
            htmlCarrier += '<td>Master Bedroom</td>';
          htmlCarrier += '</tr>';

          htmlCarrier += '<tr>';
            htmlCarrier += '<td>3</td>';
            htmlCarrier += '<td>paperboard boxes</td>';
            htmlCarrier += '<td>Master Bedroom</td>';
          htmlCarrier += '</tr>';

        htmlCarrier += '</table>';

      htmlCarrier += '</div>';

  htmlCarrier += '</div>';


  htmlCarrier += '<div class="items_totals_container">';
    htmlCarrier += '<div class="items_totals">';
      htmlCarrier += '<p>Total:</p>';
      htmlCarrier += '<span>112</span>';
    htmlCarrier += '</div>';
  htmlCarrier += '</div>';


  return htmlCarrier;
}

function getImage(){

  let objUsuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  let htmlImg = '';
  htmlImg += '<div class="report_header">';
    htmlImg += '<h1>Images</h1>';
  htmlImg += '</div>';

  htmlImg += '<div class="images_container">';
    
    htmlImg += '<div class="image_group">';
      htmlImg +='<img width="30%" src="' + objUsuarioLogado.tenant.logo + '" />';
    htmlImg += '</div>';
    htmlImg += '<div class="image_group">';
    htmlImg +='<img width="30%" src="' + objUsuarioLogado.tenant.logo + '" />';
    htmlImg += '</div>';
    htmlImg += '<div class="image_group">';
    htmlImg +='<img width="30%" src="' + objUsuarioLogado.tenant.logo + '" />';
    htmlImg += '</div>';

  htmlImg += '</div>';
  
  return htmlImg;
}

function getStyleNovo(){
  let style =  "";
  style += "* {";
    
  style += "}";

  style += "html {";
    style += "";
  style += "}";

  style += ".report {";
    style += "font-size: 14px;";
    style += "font-family: Arial, Helvetica, sans-serif;";
    style += "margin: 0;";
    style += "padding: 0;";
    style += "box-sizing: border-box;";
  style += "}";


  /** MAIN CONTAINER **/
  style += ".report_container div {";
    style += "page-break-inside: avoid;";
  style += "}";

  style += ".report_container {";
    style += "height: 100%;";
    style += "padding: 1rem;";
  style += "}";

  style += ".report_header { ";

    style += "display: flex;";
    style += "height: 4rem;";
    style += "justify-content: space-between;";
    style += "align-items: center;";
    style += "background-color: #a5d5ff;";
    style += "padding: 0 0.6rem 0 0.6rem;";
    style += "border-bottom: 3px solid #444;";
    style += "margin-bottom: 1rem;";
  style += "}";

  style += ".report_header > h1 {";
    style += "color: #024988;";
    style += "font-style: italic;";
    style += "font-size: 1.8rem;";
  style += "}";
  
  style += ".report_header > img {";
    style += "width: 4rem;";
    style += "height: 3.3rem;";
  style += "}";
  
  style += ".report_detail_container {";
    style += "display: flex;";
    style += "border: 3px solid #c4c4c4;";
  style += "}";  

  /** ORDER - CUSTOMER **/
  style += ".order_container {";
    style += "padding: 0.2rem;";
    style += "flex: 1;";
  style += "}";

  style += ".order_title {";
    style += "border-bottom: #c4c4c4 solid 3px;";
  style += "}";
  
  style += ".order_title > h3 {";
    style += "color: #024988;";
  style += "}";
  
  style += ".order_details {";
    style += "padding: 1.6rem 0 1.6rem 1.6rem;";
  style += "}";
  
  style += ".order_details > span {";
    style += "font-weight: 600;";
  style += "}";
  
  style += ".order_address {";
    style += "margin-top: 2rem;";
    style += "font-weight: 600;";
  style += "}";
  
  style += "#order_box {";
    style += "border-right: #c4c4c4 solid 3px;";
  style += "}";

  /** TOTALS **/
  style += ".totals_container {";
    style += "display: flex;";
    style += "padding: 0.6rem;";
    style += "justify-content: space-between;";
    style += "font-weight: 600;";
    style += "border-bottom: #333333 solid 3px;";
    style += "margin-bottom: 1rem;";
  style += "}";

  style += ".total {";
    style += "display: flex;";
  style += "}";

  style += ".total > span {";
    style += "margin-left: 1rem;";
  style += "}";

  /** ITEMS **/

  style += ".items_container {";
    style += "margin: 1rem 0 1rem 0;";
  style += "}";

  style += ".items_container > h3 {";
    style += "color: #024988;";
  style += "}";

  style += ".items_table_container {";
    style += "display: flex;";
    //style += "/* border: 1px solid #333333; */";
  style += "}";

  style += ".items_table_container > table {";
    style += "width: 100%;";
  style += "}";



  //#tableA tr td:nth-child(1) {
    //font-family: arial
  //}

  style += "#tableReport th";
  style += " {";
    style += "border: 3px solid #c4c4c4;";
    style += "border-collapse: collapse;";
    style += "border-spacing: 0;";
    //style += "background: red;";
  style += "}";


  style += "#tableReport td";
  style += " {";
    style += "border: 3px solid #c4c4c4;";
    style += "border-collapse: collapse;";
    style += "border-spacing: 0;";
    //style += "background: red;";
  style += "}";

  //style += ".items_table_container > .tableReport table,";
  //style += ".items_table_container > table,";
  /*style += ".items_table_container > table,";  
  style += "tr, td, th";  
  style += "";
  style += " {";
    style += "border: 3px solid #c4c4c4;";
    style += "border-collapse: collapse;";
    style += "border-spacing: 0;";
  style += "}";*/

  style += ".items_table_container > table th {";
    style += "text-align: left;";
  style += "}";

  style += ".items_table_container > table th,";
  style += "table td {";
    style += "padding: 5px;";
  style += "}";

  style += ".items_totals_container {";
    style += "display: flex;";
    style += "flex-direction: column;";
    style += "justify-content: center;";
    style += "align-items: flex-end;";
    style += "font-weight: 600;";
    style += "padding: 0.3rem 2rem 1rem 0;";
    style += "border-bottom: #333333 solid 3px;";
  style += "}";

  style += ".items_totals {";
    style += "display: flex;";
  style += "}";

  style += ".items_totals > span {";
    style += "margin-left: 1rem;";
  style += "}";

  /** IMAGES **/

  style += ".images_container {";
    style += "display: flex;";
    style += "flex-wrap: wrap;";
    style += "border-bottom: #333333 solid 3px;";
  style += "}";

  style += ".image_group {";
    style += "flex-basis: 45%;";
    style += "display: flex;";
    style += "justify-content: center;";
    style += "align-items: center;";
    style += "margin: 1rem;";
  style += "}";

  style += ".image_group > img {";
    style += "height: 10rem;";
  style += "}";

  /** FOOTER **/

  style += "footer {"
    style += "margin-top: 3rem;";
    style += "font-weight: 600;";
  style += "}";

  style += "footer > p {";
    style += "margin-bottom: 3rem;";
  style += "}";

  style += ".signature_container {";
    style += "display: flex;";
    style += "justify-content: space-between;";
    style += "margin-bottom: 3rem;";
  style += "}";

  style += ".signature_container > .signature_left,";
  style += ".signature_container > .signature_right {";
    style += "border-top: #333333 3px solid;";
    style += "padding-top: 0.6rem;";
    style += "flex-basis: 100%;";
  style += "}";

  style += ".signature_container > .signature_left {";
    style += "flex: 4;";
    style += "margin-right: 50px;";
  style += "}";

  style += ".signature_container > .signature_right {";
    style += "flex: 1;";
  style += "}";

  style += "@media only screen and (max-width: 420px) {";
    style += ".report_header > h1 {";
      style += "font-size: 1.2rem;";
    style += "}";

    style += ".report_detail_container,";
    style += ".items_table_container,";
    style += ".totals_container {";
      style += "flex-direction: column;";
    style += "}";

    style += "#order_box {";
      style += "border: none;";
    style += "}";

    style += ".image_group {";
      style += "flex-basis: 100%;";
    style += "}";
  style += "}";

  return style;
}



export async function exportResumoHtml(objEdicao, urlAPICustomers)
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
    objCliente = await execGet.call(urlGetCustomer);
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



















export async function exportRelatorioHtml(objEdicao, urlAPICustomers)
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
    objCliente = await execGet(urlGetCustomer);
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
  let objUsuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
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
      totCubic = totCubic + Number( item.cubic_feet * item.pivot.quantity);
    }
    
    
    
    let varTextItemComodo = "<table style='width:100%'>";
    varTextItemComodo +="<caption style='caption-side: top; text-align: left;'>";
    varTextItemComodo += objList.id + " - " + objList.room.name;
    varTextItemComodo +="</caption>";
    

    console.log("LISTA DE ITENS ANTES");
    console.log(objList.items);

    objList.items = getItensOrdenadosImpressao(objList.items, 2);

    console.log("LISTA DE ITENS DEPOIS");
    console.log(objList.items);
    console.log("LISTA DE ITENS DEPOIS TAMANHO ", objList.items.length);
    
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

    duasColunas = false;
    if(objList.items.length>1){
      duasColunas = true;
    }
    

    for(totItemm; totItemm < objList.items.length; totItemm++){

      let listItemDoComodo = objList.items[totItemm];

      let itemDoComodo = listItemDoComodo[0];

      let itemPackage = (itemDoComodo.pivot.quantity * itemDoComodo.packing_qty );
      totalPackage = totalPackage + itemPackage;
      //console.log("DUAS COLUNAS ", duasColunas);
      if(!duasColunas){
        //console.log("DUAS COLUNAS FALSE");
        varTextBody += "<tr>";
          let totalitem = itemDoComodo.pivot.quantity;
          totalItens = totalItens + totalitem;
          varTextBody += "<td>" + totalitem + "</td>";
          varTextBody += "<td>" + itemDoComodo.name + "<br>cft. item: " +itemDoComodo.cubic_feet+ "</td>";
          varTextBody += "<td>" +(itemDoComodo.cubic_feet * totalitem) + "</td>";
          //varTextBody += "<td>"+ itemDoComodo.cubic_feet + " - "+ totalitem + " ----------  " +(itemDoComodo.cubic_feet * totalitem) + "</td>";
        varTextBody += "</tr>";

        if(listItemDoComodo.length==2){
          let itemDoComodo2 = listItemDoComodo[1];
          let itemPackage2 = (itemDoComodo2.pivot.quantity * itemDoComodo2.packing_qty );
          totalPackage = totalPackage + itemPackage2;
          varTextBody += "<tr>";
            let totalitem2 = itemDoComodo2.pivot.quantity;
            totalItens = totalItens + totalitem2;
            varTextBody += "<td>" + totalitem2 + "</td>";
            varTextBody += "<td>" + itemDoComodo2.name + "<br>cft. item: " +itemDoComodo2.cubic_feet+ "</td>";
            varTextBody += "<td>" +(itemDoComodo2.cubic_feet * totalitem2) + "</td>";
            //varTextBody += "<td>"+ itemDoComodo.cubic_feet + " - "+ totalitem + " ----------  " +(itemDoComodo.cubic_feet * totalitem) + "</td>";
          varTextBody += "</tr>";
        }
      }else{
        console.log("ITEM COLUNA 0");
        console.log(itemDoComodo);
        console.log("ITEM COLUNA 0");
        varTextBody +="<tr>";
        let totalitem = itemDoComodo.pivot.quantity;
        totalItens = totalItens + totalitem;
        varTextBody += "<td>" + totalitem + "</td>";
        varTextBody += "<td>" + itemDoComodo.name + "<br>cft. item: " +itemDoComodo.cubic_feet+ "</td>";
        varTextBody += "<td>" +(itemDoComodo.cubic_feet * totalitem) + "</td>";
        //varTextBody += "<td>"+ itemDoComodo.cubic_feet + " - "+ totalitem + " ----------  " +(itemDoComodo.cubic_feet * totalitem) + "</td>";

        let itemDoComodoNovo = listItemDoComodo[1];
        if(itemDoComodoNovo!=undefined){
          //totItem = totItem + 1;
          console.log("ITEM COLUNA 1");
          console.log(itemDoComodoNovo);
          console.log("ITEM COLUNA 1");

          let totalitem = itemDoComodoNovo.pivot.quantity;
          totalItens = totalItens + totalitem;
          varTextBody += "<td>" + totalitem + "</td>";
          varTextBody += "<td>" + itemDoComodoNovo.name + "<br>cft. item: " +itemDoComodoNovo.cubic_feet+ "</td>";
          varTextBody += "<td>" +(itemDoComodoNovo.cubic_feet * totalitem) + "</td>";
        //varTextBody += "<td>"+ itemDoComodo.cubic_feet + " - "+ totalitem + " ----------  " +(itemDoComodo.cubic_feet * totalitem) + "</td>";
        } 
        varTextBody +="</tr>";
      }






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
          let totCuMete = (totCubic/35.15);
          let totLb = (totCuMete*2.205);
        varTextFooter +="Total <br>";
        varTextFooter +="Cubic Feet: " + totCubic.toFixed(2) + " | Cubic Meter " + totCuMete.toFixed(2) + " | Weight (lbs.) " + totLb.toFixed(2);
      varTextFooter +="</caption>";

      

      totalCubic = totalCubic + totCubic;
            
      varTextItemComodo += varTextFooter;
    //varTextItemComodo +="</tbody>";

    //varText +="<tr>";
        //varText += "<td colspan='2' ><hr></td>";
    //varText +="</tr>";

    //varText +="<tr>";
      //varText += "<th colspan='2' class='subtitle-2' >Imagens: " + objListImage.length + "</th>";
    //varText +="</tr>";

    
    
    //varText += generateHtmlListImg(objListImage, objList.room_id); 
    
  
    varTextItemComodo +="</table>";
    //console.log("FOOTER" , varTextItemComodo);
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


varText += getStyle(); 

  varText += "</div>";
  
  return varText;

}



function getItensOrdenadosImpressao(array, cols=4){

  var ret = [];

  for (var i = 0; i < array.length; i = i + cols) {
    ret.push(array.slice(i, i + cols));
  }






  /*var ret = [];
	if (cols==1 || array.length === 1){
		ret.push(array);
	}else{
		var size = Math.ceil(array.length / cols);
    //console.log("SIZE: "+size);
		for (var i = 0; i < cols; i++) {
			var start = i*size;
      //console.log("aaaaa ", array.slice(start, start+size).length);
      //if(array.slice(start, start+size).length > 0){
        ret.push(array.slice(start, start+size));
      //}
		}
	}*/
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

  let ll = getItensOrdenadosImpressao(lista, 2);
  console.log("AA");
  console.log(ll);
  console.log("AA");

  let html ="<table id='wrapper' style='width: 100%;' >";
  html += "<thead>";
    if(ll[0].length > 1){
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

    //if(ll.length>2){
      

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
      
    /*} else {
      let obj = new Object();
      obj = ll[b];
      html += "<tr>";
        html += "<td>" + obj.qtd + "</td>";
        html += "<td>" + obj.name + "</td>";
        html += "<td>" + obj.nameRoom + "</td>";
      html += "</tr>";
    }*/
  }
  html += "</tbody>";
  html += "</table>";

  //console.log(getStyleNovo());

  return html;
}

//getItensOrdenadosImpressao(objList.items, 3);






function getStyle(){

  let style =  "";

  style += "<style>";
    style += "@page {";
      //style += " size: landscape; ";
      style += " size: A4; ";
      style += " margin: 2px; ";
    style += "}";
  
    style += "@media print {";
      style += ".pagebreak { page-break-before: always; } ";
      style += ".page {";
        style += "margin: 0;";
        style += "border: initial;";
        style += "border-radius: initial;";
        style += "width: initial;";
        style += "min-height: initial;";
        style += "box-shadow: initial;";
        style += "background: initial;";
        style += "page-break-after: always;";
      style += "}";
    style += "}";


  

  /*style += "table {";
    style += "width: 100%;";
    style += "border-collapse: collapse;";
    style += "text-align: left;";
  style += "}";*/





  style += "#wrapper thead, #wrapper tfoot ";
    style += "{";
      style += "background-color: #3f87a6;";
      style += "color: #fff;";
    style += "}";

  style += "#wrapper tbody {";
    style += "background-color: #e4f0f5;";
  style += "}";

  style += "#wrapper caption {";
    style += "padding: 10px;";
    style += "caption-side: bottom;";
  style += "}";

  style += "#wrapper table {";
    style += "border-collapse: collapse;";
    style += "border: 1px solid rgb(200, 200, 200);";
    style += "border-spacing: inherit!important;";
    //style += "letter-spacing: 1px;";
    //style += "font-family: sans-serif;"
    //style += ""
    //style += "font-size: .8rem;";
  style += "}";

  style += "#wrapper th, #wrapper td";
  style += "{";
    style += "border: 1px solid rgb(190, 190, 190);";
    style += "padding: 5px 10px;";
  style += "}";

  //style += "#wrapper td {";
    //style += "text-align: center;";
  //style += "}";

  style += "</style>";

  return style;
}