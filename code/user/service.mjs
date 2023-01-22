import { createToken } from "../security.mjs";
import {loadByCredentials, loadById, putUser, createUser, deleteUser, loadGroup} from "./repository.mjs";

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

export async function postUser(id, userLogin, userIsAdmin) {
    return createUser(id, userLogin, userIsAdmin);
}

export async function updateUser(userId, userLogin, userIsAdmin) {
    let user = putUser(userId, userLogin, userIsAdmin);
    return user;
}

export async function delUser(userId) {
    if (await deleteUser(userId)) {
        return true;
    }
    return false;
}

export async function getGroup() {
    return loadGroup();
}

