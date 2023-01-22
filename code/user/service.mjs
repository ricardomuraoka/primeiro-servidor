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

export async function creatingUser(id, userLogin, userIsAdmin) {
    return createUser(id, userLogin, userIsAdmin);
}

export async function updateUser(userId, userLogin, userIsAdmin) {
    let user = putUser(userId, userLogin, userIsAdmin);
    return user;
}

export async function delUser(userId) {
    try {
        let deletedUser = await deleteUser(userId);
        if (deletedUser) {
            return deletedUser;
        }
        return false;
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
}

export async function getGroup() {
    return loadGroup();
}

