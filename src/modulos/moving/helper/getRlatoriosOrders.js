import {execGet} from "@/helper/execRequests.js";

import i18n from '@/i18n'

export async function exportRelatorioHtmlNovo(objEdicao, urlAPICustomers)
{

  //console.log(objEdicao);
  //EXEMPLO DE TRADUCAO
  console.log("TRADUCAO: ", i18n.t('tradPoupUpCaptureImagemCameraUtilizada'));
  //EXEMPLO DE TRADUCAO

  //let objEndereco = null;
  let objCliente = null;

  let objEndereco= {
    address: null,
    postcode: null,
    city: null,
    locality: null,
    country: null,
  };

  if (objEdicao.address_id == objEdicao.customer.primary_address_id) {

    //o endereco e o mesmo do cliente
    //buscar endereco do cliente
    let urlGetCustomer = urlAPICustomers.concat(
      "/" + objEdicao.customer.id
    );
    objCliente = await execGet(urlGetCustomer);
    objEndereco.address = objCliente.primary_address.address;
    objEndereco.postcode = objCliente.primary_address.postcode;
    objEndereco.city = objCliente.primary_address.city;
    objEndereco.locality = objCliente.primary_address.locality;
    objEndereco.country = objCliente.primary_address.country;
    //console.log(objCliente);
  } else {
    //e outro endereco
    objEndereco.address = objEdicao.address.address;
    objEndereco.postcode = objEdicao.address.postcode;
    objEndereco.city = objEdicao.address.city;
    objEndereco.locality = objEdicao.address.locality;
    objEndereco.country = objEdicao.address.country;
  }
  let objUsuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));


  let html ='<div id="printMe">';
  
    html +='<div class="report">';
      html +='<div class="report_container">';
        
        //html +='<header>';
        html +='<section>';
          html += getHeader(objEdicao, objEndereco, objUsuarioLogado);
        //html +='</header>';
        html +='</section>';

        html +='<section>';
          html += getComodos(objEdicao);
          //console.log(getComodos(objEdicao));
        html +='</section>';

        html +='<section>';
          html += getCarrier(objEdicao);
          //console.log(getCarrier(objEdicao));
        html +='</section>';

        html +='<section>';
          html += getImage(objEdicao);
          //console.log(getImage(objEdicao));
        html +='</section>';

        html +='<footer>';
          html +='<p>';
            html += i18n.t('tradRelatorioGeralTrechoAssinatura');
            //html +='Signing below acknowledges receipt of an estimate of your move based';
            //html +='on the Table of Measurements. Only the items listed are included in';
            //html +='the cost. Any items added or additional services may result in';
            //html +='additional cost.';
          html +='</p>';
          html +='<div class="signature_container">';
            html +='<div class="signature_left">'+ i18n.t('tradRelatorioGeralCustomerAssinatura') +'</div>';            
            html +='<div class="signature_right">'+ i18n.t('tradRelatorioGeralData') +'</div>';
          html +='</div>';

          html +='<div class="signature_container">';
            html +='<div class="signature_left">'+ i18n.t('tradRelatorioGeralRepresentanteTrasnporte') +'</div>';
            html +='<div class="signature_right">'+ i18n.t('tradRelatorioGeralData') +'</div>';
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


function getHeader(objEdicao, objEndereco, objUsuarioLogado)
{
  let header = null;
  header ='<div class="report_header">';
    header +='<h1>'+ i18n.t('tradRelatorioGeralDadosCliente') +'</h1>';
    header +='<img width="20%" src="' + objUsuarioLogado.tenant.logo + '" />';
  header +='</div>';

  header +='<div class="report_detail_container">';  
    header +='<div id="order_box" class="order_container">';
      header +='<div class="order_title">';
        header +='<h3>'+ i18n.t('tradMsgmOrder') +'</h3>';
      header +='</div>';
      
      header +='<div class="order_details">';
        header +='<span>'+ i18n.t('tradRelatorioGeralNumero') +': ' + objEdicao.id + '</span>';
        //header +='<p>Total rooms: 2</p>';
        header +='<p>'+ i18n.t('tradOrderVendedor') +': ' + objEdicao.user.name + ' | '+ objEdicao.user.email +'</p>';
        header +='<p>'+ i18n.t('tradRelatorioGeralData') +': 20/01/2021</p>';
        header +='<span>'+ i18n.t('tradRelatorioGeralData') +': ' + objEdicao.expected_date + '</span>';
        header +='<p class="order_address">';
          header +=i18n.t('tradEnderecoCustumer') +': ' + objEndereco.address + ' ' + objEndereco.postcode + ' ' + objEndereco.city + ' ' + objEndereco.locality + ' ' +objEndereco.country;
        header +='</p>';
      header +='</div>';
    header +='</div>';

    header +='<div id="customer_box" class="order_container">';
      header +='<div class="order_title">';
        header +='<h3>' + i18n.t('tradMsgmCustomer') + '</h3>';
      header +='</div>';
      header +='<div class="order_details">';
        header +='<span>' + i18n.t('tradNamePacking') + ': ' + objEdicao.customer.name + '</span>';
        header +='<p>' + i18n.t('tradPhoneCustumer') + ': ' + objEdicao.customer.phone + '</p>';
        header +='<p>' + i18n.t('tradEmailCustumer') + ': ' + objEdicao.customer.email + '</p>';
      header +='</div>';
    header +='</div>';
  header +='</div>';

  
  header +='<div class="totals_container">';
       
      header += getTotais(objEdicao);    
  header +='</div>';

  return header;
}

function getTotais(objEdicao)
{
  let listaComodo = objEdicao.order_rooms;
  let htmlTotais = '';
  let i = 0;

  let totCubic = 0;
  let qtdItem = 0;
  for(i; i<listaComodo.length; i++){
    let objComo = listaComodo[i];    
    let listaObjItem = objComo.items;
    let totItem = 0;    
    for(totItem; totItem<listaObjItem.length; totItem++){
      let item = listaObjItem[totItem];
      totCubic = totCubic + Number( item.cubic_feet * item.pivot.quantity);
      qtdItem = qtdItem + item.pivot.quantity;
    }    
  }
  let totCuMete = (totCubic/35.15);
  let totLb = (totCuMete*2.205);

  htmlTotais +='<div class="total">';
    htmlTotais +='<span>'+ i18n.t('tradRelatorioGeralTotal') +':</span>';
  htmlTotais +='</div>';
  

  htmlTotais +='<div class="total">';
    htmlTotais +='<span>Weight (lbs.):' + totLb.toFixed(2) + '</span>';
    //htmlTotais +='<span>' + totLb.toFixed(2) + ' lbs.</span>';
  htmlTotais +='</div>';

  htmlTotais +='<div class="total">';
    htmlTotais +='<span>Cubic Feet:' + totCubic.toFixed(2) + '</span>';
    //htmlTotais +='<span>' + totCubic.toFixed(2) + '</span>';
  htmlTotais +='</div>';

  htmlTotais +='<div class="total">';
    htmlTotais +='<span>Cubic Meter:' + totCuMete.toFixed(2) + '</span>';
    //htmlTotais +='<span>' + totCuMete.toFixed(2) + '</span>';
  htmlTotais +='</div>';

  htmlTotais +='<div class="total">';
    htmlTotais +='<span>'+ i18n.t('tradMsgmItem') +':' + qtdItem + '</span>';
    //htmlTotais +='<span>' + qtdItem + '</span>';
  htmlTotais +='</div>';

  return htmlTotais;
}

function getComodos(objEdicao)
{
  let htmlComodo = '';
  //console.log("getComodos ",objEdicao);
  let listaComodo = objEdicao.order_rooms;
  let totalComodo = 0;

  let linguagem = localStorage.getItem("linguagemUsuario");

  for(totalComodo; totalComodo < listaComodo.length; totalComodo++) {

    htmlComodo += '<div class="items_container">';

    let como = listaComodo[totalComodo];
    let objComodo = como.room;
    
    let itemsComodos = getItensOrdenadosImpressao(como.items, 2); 
    htmlComodo += '<h3>' + objComodo.name + '</h3>';
    htmlComodo += '<div class="items_table_container">';
    let incrItem=0;
    let arrayObs = [];
    htmlComodo += '<table id="tableReport">';

    if(itemsComodos[0].length > 1){
      htmlComodo += '<tr>';
        htmlComodo += '<th class="item_qtd">#</th>';
        htmlComodo += '<th class="item_desc">'+ i18n.t('tradRelatorioGeralDescItem') +'</th>';
        htmlComodo += '<th class="item_cft">CFt.</th>';

        htmlComodo += '<th class="item_qtd">#</th>';
        htmlComodo += '<th class="item_desc">'+ i18n.t('tradRelatorioGeralDescItem') +'</th>';
        htmlComodo += '<th class="item_cft">CFt.</th>';
      htmlComodo += '</tr>';
    } else {
      htmlComodo += '</tr>';
        htmlComodo += '<th class="item_qtd">#</th>';
        htmlComodo += '<th class="item_desc">'+ i18n.t('tradRelatorioGeralDescItem') +'</th>';
        htmlComodo += '<th class="item_cft">CFt.</th>';
      htmlComodo += '</tr>';
    }


    let totCubic = 0;
    let qtdItens = 0;
    for(incrItem; incrItem<itemsComodos.length; incrItem++){

      let listaItem = itemsComodos[incrItem];
      //guarda as observações para inserir no final
      let b = 0;
      for (b; b < listaItem.length; b++) {
        let item = listaItem[b];
        totCubic = totCubic + Number( item.cubic_feet * item.pivot.quantity);
        qtdItens = qtdItens + item.pivot.quantity;
        let objObs = new Object();
        objObs.item = item.name;
        objObs.obs = item.pivot.obs;
        if(objObs.obs!=null){
          arrayObs.push(objObs);
        }
      }

      let a=0;
      let cont = 0;
      for(a; a<listaItem.length; a++){
        if(cont==0){
          htmlComodo += "<tr>";
        }
        let item = listaItem[a];
        
        htmlComodo += "<td>" + item.pivot.quantity + "</td>";

        switch (linguagem) {
          case 'pt-BR':          
            if(item.name_pt != null){
              htmlComodo += "<td>" + item.name_pt + "</td>";
            }
            break;    
          case 'es':          
            if(item.name_es != null){
              htmlComodo += "<td>" + item.name_es + "</td>";
            }
            break;
          default:          
            htmlComodo += "<td>" + item.name + "</td>";
        } 

        
        htmlComodo += "<td>" + (item.cubic_feet * item.pivot.quantity).toFixed(2) + "</td>";

        if(listaItem[a+1]!=undefined){
          a = a +1;  
          let item2 = listaItem[a];
          htmlComodo += "<td>" + item2.pivot.quantity + "</td>";
          htmlComodo += "<td>" + item2.name + "</td>";
          htmlComodo += "<td>" + (item2.cubic_feet * item2.pivot.quantity).toFixed(2) + "</td>";
        }
        cont = cont + 1;
        if(cont==2){
          cont = 0;
          htmlComodo += "</tr>";
        }
      }          
    }
    htmlComodo += '</table>';
  htmlComodo += '</div>';

  if(arrayObs.length>0){
    htmlComodo += '<h4>Observações</h4>';
    htmlComodo += '<div class="items_table_container">';
      htmlComodo += '<table id="tableReport">';
      htmlComodo += '<tr>';
        htmlComodo += '<th class="item_qtd">Item</th>';
        htmlComodo += '<th class="item_desc">Observação</th>';
      htmlComodo += '</tr>';
      let totObs=0;
      for(totObs; totObs<arrayObs.length; totObs++){
        let objObs = arrayObs[totObs];
        htmlComodo += '<tr>';
          htmlComodo += '<td >' + objObs.item + '</td>';
          htmlComodo += '<td >' + objObs.obs + '</td>';
        htmlComodo += '</tr>';
      }
      htmlComodo += '</table>';
    htmlComodo += '</div>';
  }

    let totCuMete = (totCubic/35.15);
    let totLb = (totCuMete*2.205);      
    htmlComodo += '<div class="items_totals_container">';
        
        htmlComodo += '<div class="items_totals">';
          htmlComodo +='<p>Total: </p>';
          htmlComodo += '<p>Weight (lbs.): ' + totLb.toFixed(2) + '</p>';
          //htmlComodo += '<p>' + totLb.toFixed(2) + '</p>';

          htmlComodo += '&nbsp;&nbsp;<p>Cubic Feet: ' + totCubic.toFixed(2) + '</p>';
          //htmlComodo += '<p>' + totCubic.toFixed(2) + '</p>';

          htmlComodo += '&nbsp;&nbsp;<p>Cubic Meter: ' + totCuMete.toFixed(2) + '</p>';
          //htmlComodo += '<p>' + totCuMete.toFixed(2) + '</p>';

          htmlComodo += '&nbsp;&nbsp;<p>Nb. Itens: ' + qtdItens + '</p>';
          //htmlComodo += '<p></p>';

        htmlComodo += '</div>';
    htmlComodo += '</div>';

  htmlComodo += '</div>';

  }
  return htmlComodo;
}

function getCarrier(objEdicao)
{
  //console.log("getCarrier ", objEdicao);
  let htmlCarrier = '';
  let listaComodo = objEdicao.order_rooms;
  let a=0;
  let lista = [];
  for(a; a<listaComodo.length; a++){
    let room = listaComodo[a];
    let items = room.items;
    let countItem = 0
    for(countItem; countItem<items.length; countItem++){
      //html += "<tr>";
      let item = items[countItem];
      let packing = item.packing;
      let obj = new Object();
      obj.qtd = item.packing_qty;
      if(packing === null){
        obj.name = i18n.t('tradRelatorioGeralPackingNotDefined');
      }else{
        obj.name = packing.name;
      }
      obj.nameRoom = room.room.name;
      lista.push(obj);
    }
  }  

  let listaPronta = getItensOrdenadosImpressao(lista, 2);
  
  htmlCarrier += '<div class="report_header">';
    htmlCarrier += '<h1>'+ i18n.t('tradRelatorioGeralResumoEmbalagem') +'</h1>';
  htmlCarrier += '</div >';
    htmlCarrier += '<div class="items_container">';
      htmlCarrier += '<div class="items_table_container">';
        htmlCarrier += '<table id="tableReport" >';
          if(listaPronta[0].length > 1){
            htmlCarrier += "<tr>";
              htmlCarrier += '<th>#</th>';
              htmlCarrier += '<th>'+ i18n.t('tradRelatorioGeralDescricaoEmbalagem') +'</th>';
              htmlCarrier += '<th>'+ i18n.t('tradMsgmRoom') +'</th>';
              htmlCarrier += '<th>#</th>';
              htmlCarrier += '<th>'+ i18n.t('tradRelatorioGeralDescricaoEmbalagem') +'</th>';
              htmlCarrier += '<th>'+ i18n.t('tradMsgmRoom') +'</th>';
            htmlCarrier += "</tr>";
          } else {
            htmlCarrier += "<tr>";
              htmlCarrier += '<th>#</th>';
              htmlCarrier += '<th>'+ i18n.t('tradRelatorioGeralDescricaoEmbalagem') +'</th>';
              htmlCarrier += '<th>'+ i18n.t('tradMsgmRoom') +'</th>';
            htmlCarrier += "</tr>";
          }
          let b = 0;
          let totalgeral=0;
          for(b; b<listaPronta.length; b++){
            let obj = new Object();
            obj = listaPronta[b];
            let a=0;
            let cont = 0;
            for(a; a<obj.length; a++){
              if(cont==0){
                htmlCarrier += "<tr>";
              }
              let ob = obj[a];
              htmlCarrier += "<td>" + ob.qtd + "</td>";
              totalgeral = totalgeral + ob.qtd;
              htmlCarrier += "<td>" + ob.name + "</td>";
              htmlCarrier += "<td>" + ob.nameRoom + "</td>";
              if(ob[a+1]!=undefined){
                a = a +1;  
                let ob2 = ob[a];
                htmlCarrier += "<td>" + ob2.qtd + "</td>";
                htmlCarrier += "<td>" + ob2.name + "</td>";
                htmlCarrier += "<td>" + ob2.nameRoom + "</td>";
                totalgeral = totalgeral + ob2.qtd;
              }
              cont = cont + 1;
              if(cont==2){
                cont = 0;
                htmlCarrier += "</tr>";
              }
            }
            if(listaPronta[b+1]!=undefined){
              b = b+1;
              let obj2 = new Object();
              obj2 = listaPronta[b];
              let z=0;
              let cont2 = 0;
              for(z; z<obj2.length; z++){
                if(cont2==0){
                  htmlCarrier += "<tr>";
                }
                let ob = obj2[z];         
                totalgeral = totalgeral + ob.qtd; 
                htmlCarrier += "<td>" + ob.qtd + "</td>";
                htmlCarrier += "<td>" + ob.name + "</td>";
                htmlCarrier += "<td>" + ob.nameRoom + "</td>";
        
                if(obj2[z + 1]!=undefined){
                  z = z +1;  
                  let ob2 = new Object();
                  ob2 = obj2[z];
                  htmlCarrier += "<td>" + ob2.qtd + "</td>";
                  htmlCarrier += "<td>" + ob2.name + "</td>";
                  htmlCarrier += "<td>" + ob2.nameRoom + "</td>";
                  totalgeral = totalgeral + ob2.qtd;
                }
              }
              cont2 = cont2 + 1;
              if(cont2==2){
                cont2 = 0;
                htmlCarrier += "</tr>";
              }
            }
          }
        htmlCarrier += '</table>';
      htmlCarrier += '</div>';

    htmlCarrier += '<div class="items_totals_container">';
      htmlCarrier += '<div class="items_totals">';
        htmlCarrier += '<p>Total:</p>';
        htmlCarrier += '<p>'+ totalgeral +'</p>';
      htmlCarrier += '</div>';
    htmlCarrier += '</div>';

  htmlCarrier += '</div>';
  return htmlCarrier;
}

function getImage(objEdicao){
  let listaComodo = objEdicao.order_rooms;
  let totComodo = 0;
  let listImagens = [];
  for(totComodo; totComodo<listaComodo.length; totComodo++){
    let comodo = listaComodo[0];
    let listImage = comodo.images;
    let totImg = 0; 
    for(totImg; totImg<listImage.length; totImg++){
      listImagens.push(listImage[totImg]);
    }
  }
  //console.log("listImagens ", listImagens);

  //let objUsuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  let htmlImg = '';

  if(listImagens.length > 0){
    htmlImg += '<div class="report_header">';
      htmlImg += '<h1>'+ i18n.t('tradRelatorioGeralImagens') +'</h1>';
    htmlImg += '</div>';
    let totImg = 0;

    htmlImg += '<div class="images_container">';
    for(totImg; totImg<listImagens.length; totImg++){
      let objImg = listImagens[totImg];
      htmlImg += '<div class="image_group">';
        htmlImg +='<img  src="' + objImg.image + '" />';
      htmlImg += '</div>';
    }
    htmlImg += '</div>';
  }
  
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

  /*style += ".image_group img {";
    style += " margin: 0 5px;";
    style += " object-fit: contain;";
  style += "}";*/

  style += ".image_group {";
    style += "flex-basis: 45%;";
    style += "display: flex;";
    style += "justify-content: center;";
    style += "align-items: center;";
    style += "margin: 1rem;";
    style += " object-fit: contain;";
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







function getItensOrdenadosImpressao(array, cols=4){

  var ret = [];

  for (var i = 0; i < array.length; i = i + cols) {
    ret.push(array.slice(i, i + cols));
  }

	return ret;
}