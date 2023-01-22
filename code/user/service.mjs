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

export async function creatingUser(userLogin, userPass, userIsAdmin) {
    return createUser(userLogin, userPass, userIsAdmin);
}

export async function updateUser(user, userLogin, userIsAdmin) {
    console.log(userIsAdmin);
    return await putUser(user, userLogin, userIsAdmin);
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

