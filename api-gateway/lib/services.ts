import "server-only";

import axios from "axios";

export const services = {
  products: {
    get() {
      return axios
        .get<{ name: string }[]>(`${process.env.PRODUCTS_SERVICE_URL!}/api`)
        .then((res) => res.data);
    },
  },
  users: {
    get() {
      return axios
        .get<{ name: string }[]>(
          `${process.env.USERS_SERVICE_URL!}/api`
        )
        .then((res) => res.data);
    },
  },

  login: {
    post(username: string, password: string) {
      return axios
        .post<{ isAuthenticated: boolean; token?: string; message?: string }>(
          `${process.env.USERS_SERVICE_URL!}/api/login`,
          { username, password }
        )
        .then((res) => res.data);
    },
  },
  
  auth: {
    post(token: string) {
      return axios
        .post<{valid:boolean, user?: {name: string, email: string} }>(
          `${process.env.USERS_SERVICE_URL}/api/auth`,
          { token }
        )
        .then((res) => res.data);
    },
  },
};
