import Vue from "vue";
import VueRouter from "vue-router";

import Modulos from "../views/estruturaPrincipal/Modulos.vue";
//import DashBoardSistema from "../components/sistema/DashboardSistema.vue";
import store from "@/store/index.js";


import DashboardMoving from "@/modulos/moving/DashboardMoving.vue";
import Customer from "@/modulos/moving/Customer.vue";
import Room from "@/modulos/moving/Room.vue";
import Item from "@/modulos/moving/Item.vue";
import Orders from "@/modulos/moving/Orders.vue";
import Packing from "@/modulos/moving/Packing.vue";

import DashboardSystem from "@/modulos/system/DashboardSystem.vue";
import User from "@/modulos/system/User.vue";
import Role from "@/modulos/system/Role.vue";
import Permission from "@/modulos/system/Permission.vue";

//import { getRotasUser, getListaRotaValidacao } from "@/helper/getModulosRotasActionsUserLogado.js";

//import { getPermissionRoute } from "@/helper/getPermission.js";

import { getListaRotasUserLogado } from "@/helper/listRoutes.js";

Vue.use(VueRouter);

const routes = [  
  {
    path: "/moving",
    name: "moving",
    component: DashboardMoving,
    children: [
      {
        path: "customers",
        components: {
          routeViewMoving: Customer,
        },
        props: true,
      },
      {
        path: "rooms",
        components: {
          routeViewMoving: Room,
        },
        props: true,
      },
      {
        path: "items",
        components: {
          routeViewMoving: Item,
        },
        props: true,
      },
      {
        path: "orders",
        components: {
          routeViewMoving: Orders,
        },
        props: true,
      },
      {
        path: "packings",
        components: {
          routeViewMoving: Packing,
        },
        props: true,
      },
    ],
  },

  {
    path: "/system",
    name: "System",
    component: DashboardSystem,
    children: [
      {
        path: "users",
        components: {
          routeViewSystem: User,
        },
        props: true,
      },
      {
        path: "roles",
        components: {
          routeViewSystem: Role,
        },
        props: true,
      },
      {
        path: "permissions",
        components: {
          routeViewSystem: Permission,
        },
        props: true,
      },
    ],
  },
  
  
  
  
  
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    props: true,
  },


  {
    path: "/acessonegado",
    name: "AcessoNegado",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ErroDePermissao.vue"),
    props: true,
  },

  

  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/estruturaPrincipal/InicioEstrutura.vue"),
    
    children: [
      {
        path: "/home",
        components: {
          routeViewPrincipal: Modulos,
        },
        props: true,
        //component: import("@/views/Modulos.vue"),
      },
      /*{
        path: "/sistema",
        components: {
          routeViewPrincipal: DashBoardSistema,
        },
        props: true,
        //component: import("@/views/Modulos.vue"),
      },*/
    ],
  },
  { path: "*", redirect: "/home", props: true, },
];

const router = new VueRouter({
  //mode: "history",
  routes,
});

router.afterEach((to) => {
//router.afterEach((to, from) => {  
  // Complete the animation of the route progress bar.
  //console.log("afterEach ");
  //console.log(to.name);
  //console.log(from);
  //console.log("afterEach ");
  store.state.exibicaoMenu = false;
  store.state.statusMenu = false;
  if (to.path !== "/") {
    store.state.exibicaoMenu = true;
    //store.state.statusMenu = true;
  }

  //console.log(store.state.statusMenu);
  //console.log(store.state.exibicaoMenu);
  //NProgress.done();
  //this.$loading(false);
});

router.beforeEach((to, from, next) => {
// se nao tiver as permissies mandar pra login



  // redirect to login page if not logged in and trying to access a restricted page
  /*const publicPages = ["login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("logado");
  //const loggedIn = false;
  console.log("caminho livre");
  console.log(authRequired);
  console.log("status logado");
  console.log(loggedIn);
  if (authRequired && !loggedIn) {
    return next("/login");
  }*/

  //let publicPages = ["/login"];
  //let publicPages = getListMenusPublic();
  //let rotasUserLogado = getRotasUser();

  //if(rotasUserLogado.length>0){

    //console.log("aqui");
    //publicPages = rotasUserLogado;
    //console.log(rotasUserLogado);
    //var z =0;
    //for(z; z<rotasUserLogado.length; z++){
      //publicPages.push(rotasUserLogado[z]);
    //}

    //publicPages.push("/login");
    //publicPages.push("/");
    //publicPages.push("/acessonegado");
  //}
  let publicPages = [];
  publicPages.push("/login");
  publicPages.push("/acessonegado");

  let listaRotasUserLogado = getListaRotasUserLogado();
  //console.log('aqui');
  //console.log(listaRotasUserLogado);
  if(listaRotasUserLogado!=null){
    //console.log(listaRotasUserLogado);
    var z =0;
    for(z; z<listaRotasUserLogado.length; z++){
      publicPages.push(listaRotasUserLogado[z]);
    }
  }else{
    //se nao tiver lista de rotas do usuario logado bota pra o login
    return next("/login");
  }
  const authRequired = !publicPages.includes(to.path);


  let userLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if( userLogado === null){
    //console.log("NAO TEM USUARIO LOGADO");
    userLogado = false;
  }else{
    //console.log("TEM USUARIO LOGADO");
    userLogado = true;
  }

  let permissions = JSON.parse(sessionStorage.getItem("permissions"));
  if(permissions === null){
    ///console.log("NAO TEM PERMISSAO, NAO TEM USUARIO LOGADO");
    userLogado =false;
  }

  const loggedIn = userLogado;

  if (authRequired && !loggedIn) {      
      return next("/login");
  }else{
    publicPages.push("/home");
    if(!publicPages.includes(to.path)){
      return next("/acessonegado");
    }else{
      next();
    }
  }
});

export default router;