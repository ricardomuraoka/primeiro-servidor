import { createToken } from "../security.mjs";
import {loadByCredentials, loadById, saveUser,} from "./repository.mjs";

export async function login({username, password}) {
    const user = await loadByCredentials(username, password);
    if (user) return {
        token: createToken(user),
        ...user
    };
    return null;
}

export async function getUser(id) {
    return loadById(id);
}

export async function postUser(id, userLogin, userPass, userIsAdmin) {
    return saveUser(id, userLogin, userPass, userIsAdmin);
}