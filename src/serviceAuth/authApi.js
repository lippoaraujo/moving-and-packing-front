import axios from "axios";
import router from "@/router";
import { auth } from "./endPoints";

export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  console.log('token vindo do local storage');
  return `Bearer ${token}`;
};

export function refreshToken() {
  const options = {
    headers: {
      Authorization: getAccessToken(),
    },
  };
  console.log("is refreshing request with headers", options);
  return axios.post(
    process.env.VUE_APP_URL_CONNECTION + auth.refresh,
    [],
    options
  );
}

export function setAccessToken(newToken) {
  localStorage.setItem("token", newToken);
}

export const logoutSystem = () => {
  console.log('logout system');
  localStorage.clear();
  sessionStorage.clear();
  router.push("/login");
};
