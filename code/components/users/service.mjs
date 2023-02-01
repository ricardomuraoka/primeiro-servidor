import { createToken } from "../../lib/security.mjs";
import {loadByCredentials, loadById, putUser, createUser, deleteUser, loadGroup} from "./repository.mjs";
import {newAxios} from "../../lib/network.mjs";

export async function login({username, password}) {
    const user = await loadByCredentials(username, password);
    if (user) return {
        token: createToken(user),
        ...user
    };
    return null;
}

export async function getUser(id) {
    const axios = newAxios();
    const user = await loadById(id);;

/*
const todos = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
if (todos.status === 200) {
    user.todoList = todos.data;
}
*/
    return user;
}

export async function creatingUser(username, name, password ) {
    return createUser(username, name, password );
}

export async function updateUser(userId, username, name, password ) {
    return await putUser(userId, username, name, password);
}

export async function delUser(userId) {
    try {
        let deletedUser = await deleteUser(userId);
        if (deletedUser) {
            return deletedUser;
        }
        return false;
    } catch (error) {
        console.error("Error deleting users: ", error);
        throw error;
    }
}

export async function getGroup() {
    return loadGroup();
}

