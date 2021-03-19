"use strict";

import Vue from "vue";
import axios from "axios";
import { refreshToken } from "@/helper/execRequests.js";
import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    console.log("interceptors.request AQQQUUUUIII");
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

// Add a response interceptor
const inter = _axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log("recebendo resposta OK: ",response);
    return response;
  },
  function(error) {

    console.log("recebendo resposta ERRRO: ",error);

    // Do something with response error
    const { config, response: { status } } = error;
    const originalRequest = config;

    //console.log("capturou o erro");
    console.log("ERRO CONFIG Authorization:",error.config.headers.Authorization);
    //console.log(status);
    //console.log("capturou o erro");

    if (status === 401) {
      //console.log("erro comum entrou aqui");
      if (!isRefreshing) {
        console.log("entrou pra o refresh");
        console.log(inter);
        
        isRefreshing = true;
        
        
  
        /*let url = process.env.VUE_APP_URL_CONNECTION + "/auth/refresh";
        const AuthStr = "Bearer ".concat(localStorage.getItem("token"));
        let headerRequest = {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthStr,
          },
        };
      
        let objPut = {
          Bearer: localStorage.getItem("token"),
        };
  
        try{
          _axios.post(url, objPut, headerRequest)
            .then(newToken => {
              isRefreshing = false;
              console.log("new token", newToken);
              localStorage.setItem("token", newToken);
              onRrefreshed(newToken);
              refreshSubscribers = [];
            })
            .catch(err => {
              console.log("ERRO REQUISICAO TOKEN: ", JSON.stringify(err));
              localStorage.clear();
              sessionStorage.clear();
              router.push("/login");
            });
        }catch(erro){
          console.log("erroerroerroerroerroerro", erro);
        }*/
        
  
        /* 
        * When response code is 401, try to refresh the token.
        * Eject the interceptor so it doesn't loop in case
        * token refresh causes the 401 response
        */

        //_axios.interceptors.response.eject(inter);
  
        refreshToken().then(response => {
          isRefreshing = false;
          console.log("new token", response.data.token);
          localStorage.setItem("token", response.data.token);
          onRrefreshed(response.data.token);
          refreshSubscribers = [];
        })
        .catch(err => {
          console.log("ERRO REQUISICAO TOKEN: ", JSON.stringify(err));
          localStorage.clear();
          sessionStorage.clear();
          router.push("/login");
        });
      }
      console.log("terminou o refresh: ");
      
  
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);

    
    
    
    
    

    /*if (status === 401) {
      let url = process.env.VUE_APP_URL_CONNECTION + "/auth/refresh";
      const AuthStr = "Bearer ".concat(localStorage.getItem("token"));
      let headerRequest = {
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthStr,
        },
      };

      let objPut = {
        Bearer: localStorage.getItem("token"),
      };
    }*/

    //return Promise.reject(error);
  }
);

function subscribeTokenRefresh(cb) 
{
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) 
{
  refreshSubscribers.map(cb => cb(token));
}

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
