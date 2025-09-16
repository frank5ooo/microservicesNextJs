"use server"

import { services } from "@/lib/services";

export const login = services.login.post;

export const auth = services.auth.post;

export const getUsers= services.users.get;