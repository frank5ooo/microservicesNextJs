import axios from "axios";
import { PropsWithChildren } from "react";

export default async function ACL({children}: PropsWithChildren) {
    const response = await axios.get(process.env.USERS_SERVICE_URL!);
    const usuario = response.data;

    if(!usuario) return console.log("<PaginaError/>")
    return children
}