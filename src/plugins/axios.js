"use strict";

import Vue from "vue";
import axios from "axios";
import {  logoutSystem, refreshToken } from "@/serviceAuth/authApi";

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

// _axios.interceptors.request.use(
//   function (config) {

//     const bearerToken = getAccessToken();
//     if (bearerToken) {
//         console.log('setando token pra request');
//         config.headers.Authorization = bearerToken;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     console.log("interceptors.request AQQQUUUUIII");
//     return Promise.reject(error);
//   }
// );

let isRefreshing = false;
let refreshSubscribers = [];

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // console.log("recebendo resposta OK: ", response);
    return response;
  },
  function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }

    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    console.log("status:", status);
    console.log("error response:", error.response);

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshToken()
          .then((response) => {
            isRefreshing = false;
            console.log("novo refresh token", response.data.token);
            onRrefreshed(response.data.token);
            localStorage.setItem("token", response.data.token);
            refreshSubscribers = [];
          })
          .catch(() => {
            console.log("TOKEN IS NOT REFRESHABLE! TIME EXPIRATION: ");
            logoutSystem();
          });
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
            console.log('token do subscribe: ', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
}

Plugin.install = function (Vue) {
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
