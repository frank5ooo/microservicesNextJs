import axios from "axios";

export const services = {
    products: {
        get() {
            return axios.get<{name:string}[]>(`${process.env.PRODUCTS_SERVICE_URL!}/api`).then(res => res.data);
        },
    },
    users: {
        get() {
            return axios.get<{name:string}[]>(`${process.env.USERS_SERVICE_URL!}/api`).then(res => res.data);
        },
    },
};