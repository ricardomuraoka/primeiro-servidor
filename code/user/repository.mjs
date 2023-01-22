import { randomUUID } from 'crypto'

let users = [
    {id: randomUUID(), login:'admin', password: 'admin', admin: true},
    {id: randomUUID(), login:'vinicius', password: 'vinicius', admin: false},
    {id: randomUUID(), login:'guest', password: 'guest', admin: true}
];

let group = [
    {name: "Alexandre Magno Strukoski", email: "alexandre.strukoski@pucpr.edu.br"},
    {name: "Michel dos Santos Santiago", email: "michel.santiago@pucpr.edu.br"},
    {name: "Ricardo Muraoka", email: "alexandre.strukoski@pucpr.edu.br"}
];

function formatUser(user) {
    if (!user) return user;
    return {...user, password: undefined};
}

export async function loadById(id) {
    try {
        return formatUser(users.find(u => u.id === id));
    } catch (error) {
        console.error("Error loading user by id: ", error);
        throw error;
    }
}

export async function loadByCredentials(username, password) {
    return formatUser(
        users.find(u =>
            u.login === username &&
            u.password === password
        )
    );
}

export async function createUser(userLogin, userPass, userIsAdmin) {
    try {
        let id = randomUUID();
        let user = {id, login: userLogin, password: userPass, admin: userIsAdmin};
        users.push(user);
        return {...user, password: undefined};
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
}

export async function putUser(user, userLogin, userIsAdmin){
    let data = null;

    users.forEach((el, i) => {
        if (el.id === user.id) {
            users[i].login = userLogin;
            users[i].admin = userIsAdmin;

            data = users[i];

            return true;
        }

        return false;
    })

    return data;
}

export async function deleteUser(user) {
    try {
        let deletedUser = users.find(item => item.id === user.id);
        users = users.filter(item => item.id !== user.id);
        return {...deletedUser, password: undefined};
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
}

export async function loadGroup() {
    return group;
}
