import { getPermissionModule, getPermissionMenu } from "@/helper/getPermission.js";

export function getListaRotasUserLogado(){
  let listaRotaRetorno = [];
  let a = 0;
  let listModules = getListModules();
  //let temPermissao = false;
  for(a; a<listModules.length; a++){
    let modulo = listModules[a];
    if(getPermissionModule(modulo.name)){
      //temPermissao = true;
      let b = 0;
      listaRotaRetorno.push("/" + modulo.name);    
      let listaMenuModulo = modulo.menu;
      for(b; b < listaMenuModulo.length; b++){
        let menu =  listaMenuModulo[b];
        if(getPermissionMenu(menu.name)){
          listaRotaRetorno.push("/" + modulo.name + "/" + menu.name.concat("s"));
        }
      }
    }
  }
  //if(temPermissao){
    //listaRotaRetorno.push("/home");
  //}
  return listaRotaRetorno;
}


export function getObjMenu($routePath)
{
  let arrayNameModulo = $routePath.split("/");
  //let nameModule = arrayNameModulo[1];
  let nameMenu = arrayNameModulo[2];
  let listModule = getListMenuModule($routePath);
  let a = 0;
  for(a; a<listModule.length; a++){
    let objMenu = listModule[a];
    if(objMenu.name === nameMenu.substr( 0, (nameMenu.length-1))){
      return objMenu;
    }
  }
}

export function getListMenuModule($routePath)
{
  let arrayNameModulo = $routePath.split("/");
  let nameModule = arrayNameModulo[1];
    
  let listModules = getListModules();
  let listMenuReturn = [];
  let a = 0;
  for(a; a<listModules.length; a++){
    let objModule = listModules[a];
    
    if(objModule.name == nameModule){
      let b = 0;
      let listMenu = objModule.menu;
      
      for(b=0; b<listMenu.length; b++){
        let objMenu = listMenu[b];
        listMenuReturn.push(objMenu);
      }

    }
  }
  return listMenuReturn;
}


export function getListModules(){
  let modulos = [];
  let moduloSystem = { 
    "name": "system",
    "nameExibicao": "System",
    "ordemExibicao" : 0,
    "color": "#1F7087",
    "description": "users, permissions, system management...",
    "image": "mdi-shield-home",
    "menu": [
      {
      "name": "user",
      "nameExibicao": "Users",
      "icon": "mdi-account-tie",
      "url" : "/system/users",
      "actions" : [
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 6,
            name: "user-list",
            pivot: {role_id: 1, permission_id: 6},
            updated_at: "2021-01-31T18:51:12.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 7,
            name: "user-create",
            pivot: {role_id: 1, permission_id: 7},
            updated_at: "2021-01-31T18:51:12.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 8,
            name: "user-show",
            pivot: {role_id: 1, permission_id: 8},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 9,
            name: "user-edit",
            pivot: {role_id: 1, permission_id: 9},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 10,
            name: "user-delete",
            pivot: {role_id: 1, permission_id: 10},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
        ]
      },

      {
      "name": "role",
      "nameExibicao": "Roles",
      "icon": "mdi-account-group-outline",
      "url" : "/system/roles",
      "actions" : [
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 1,
            name: "role-list",
            pivot: {role_id: 1, permission_id: 1},
            updated_at: "2021-01-31T18:51:12.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 2,
            name: "role-create",
            pivot: {role_id: 1, permission_id: 2},
            updated_at: "2021-01-31T18:51:12.000000Z"
          },
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 3,
            name: "role-show",
            pivot: {role_id: 1, permission_id: 3},
            updated_at: "2021-01-31T18:51:12.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 4,
            name: "role-edit",
            pivot: {role_id: 1, permission_id: 4},
            updated_at: "2021-01-31T18:51:12.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:12.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 5,
            name: "role-delete",
            pivot: {role_id: 1, permission_id: 5},
            updated_at: "2021-01-31T18:51:12.000000Z",
          },
        ]
      },

      {
        "name": "permission",
        "nameExibicao": "Permissions",
        "icon": "mdi-account-details",
        "url" : "/system/permissions",
        "actions" : [
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 1,
              name: "permission-list",
              pivot: {role_id: 1, permission_id: 1},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 2,
              name: "permission-create",
              pivot: {role_id: 1, permission_id: 2},
              updated_at: "2021-01-31T18:51:12.000000Z"
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 3,
              name: "permission-show",
              pivot: {role_id: 1, permission_id: 3},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 4,
              name: "permission-edit",
              pivot: {role_id: 1, permission_id: 4},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
            {
              created_at: "2021-01-31T18:51:12.000000Z",
              deleted_at: null,
              guard_name: "api",
              id: 5,
              name: "permission-delete",
              pivot: {role_id: 1, permission_id: 5},
              updated_at: "2021-01-31T18:51:12.000000Z",
            },
          ]
        },













    ]
  };
  modulos.push(moduloSystem);
  let moduloMoving = { 
    "name": "moving",
    "nameExibicao": "Moving",
    "ordemExibicao" : 1,
    "color": "#45b877",
    "description": "moving, packing, orders and customers management...",
    "image": "mdi-clipboard-edit-outline",
    "menu" : [
      {
        "name": "customer",
        "nameExibicao": "Customers",
        "icon": "mdi-account-arrow-left",
        "url" : "/moving/customers",
        "actions" : [
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 11,
            name: "customer-list",
            pivot: {role_id: 1, permission_id: 11},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 12,
            name: "customer-create",
            pivot: {role_id: 1, permission_id: 12},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 13,
            name: "customer-show",
            pivot: {role_id: 1, permission_id: 13},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 14,
            name: "customer-edit",
            pivot: {role_id: 1, permission_id: 14},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 15,
            name: "customer-delete",
            pivot: {role_id: 1, permission_id: 15},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
        ]
      },
      {
        "name": "room",
        "nameExibicao": "Rooms",
        "icon": "mdi-widgets",
        "url" : "/moving/rooms",
        "actions" : [
          //room
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 21,
            name: "room-list",
            pivot: {role_id: 1, permission_id: 21},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 22,
            name: "room-create",
            pivot: {role_id: 1, permission_id: 22},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 23,
            name: "room-show",
            pivot: {role_id: 1, permission_id: 23},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 24,
            name: "room-edit",
            pivot: {role_id: 1, permission_id: 24},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 25,
            name: "room-delete",
            pivot: {role_id: 1, permission_id: 25},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
        ]
      },
      {
        "name": "item",
        "nameExibicao": "Items",
        "icon": "mdi-scatter-plot",
        "url" : "/moving/items",
        "actions" : [
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 16,
            name: "item-list",
            pivot: {role_id: 1, permission_id: 16},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 17,
            name: "item-create",
            pivot: {role_id: 1, permission_id: 17},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 18,
            name: "item-show",
            pivot: {role_id: 1, permission_id: 18},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 19,
            name: "item-edit",
            pivot: {role_id: 1, permission_id: 19},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 20,
            name: "item-delete",
            pivot: {role_id: 1, permission_id: 20},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
        ]
      },
      {
        "name": "order",
        "nameExibicao": "Orders",
        "icon": "mdi-package-variant",
        "url" : "/moving/orders",
        "actions" : [
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 31,
            name: "order-list",
            pivot: {role_id: 1, permission_id: 31},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 32,
            name: "order-create",
            pivot: {role_id: 1, permission_id: 32},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 33,
            name: "order-show",
            pivot: {role_id: 1, permission_id: 33},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 34,
            name: "order-edit",
            pivot: {role_id: 1, permission_id: 34},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 35,
            name: "order-delete",
            pivot: {role_id: 1, permission_id: 35},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
        ]
      },
      {
        "name": "packing",
        "nameExibicao": "Packings",
        "icon": "mdi-package-variant-closed",
        "url" : "/moving/packings",
        "actions" : [
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 26,
            name: "packing-list",
            pivot: {role_id: 1, permission_id: 26},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 27,
            name: "packing-create",
            pivot: {role_id: 1, permission_id: 27},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 28,
            name: "packing-show",
            pivot: {role_id: 1, permission_id: 28},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 29,
            name: "packing-edit",
            pivot: {role_id: 1, permission_id: 29},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
          {
            created_at: "2021-01-31T18:51:13.000000Z",
            deleted_at: null,
            guard_name: "api",
            id: 30,
            name: "packing-delete",
            pivot: {role_id: 1, permission_id: 30},
            updated_at: "2021-01-31T18:51:13.000000Z",
          },
        ]
      }
    ]
  };
  modulos.push(moduloMoving);
  return modulos;
}