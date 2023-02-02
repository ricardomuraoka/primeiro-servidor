import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { badRequest, notFound, ServerError } from '../../lib/errors.mjs';

const prisma = new PrismaClient()

let group = [
    {name: "Alexandre Magno Strukoski", email: "alexandre.strukoski@pucpr.edu.br"},
    {name: "Michel dos Santos Santiago", email: "michel.santiago@pucpr.edu.br"},
    {name: "Ricardo Muraoka", email: "alexandre.strukoski@pucpr.edu.br"}
];

const USER_FIELDS = {
    id: true,
    username: true,
    name: true,
    roles: true,
    password: false
}

export const loadById = async(id) =>
    await prisma.user.findUnique({
        where: {id},
        select: USER_FIELDS
    });


export async function loadByCredentials(username, password) {
    const user = await prisma.user
        .findUnique({
            where: {username},
            select: {
                ...USER_FIELDS,
                password: true
            }
        });

    ServerError
        .throwIfNot(user, `Not Found: ${username}`, notFound)
        .throwIfNot(await bcrypt.compare(password, user.password),
            "Invalid credentials")

    delete user.password;
    return user;
}


export async function createUser(userLogin, userName, userPass) {

    try {
        if (await prisma.user.findUnique({where: {username: userLogin}})) {
            return "Username already exists";
        }

        const user = await prisma.user.create({
            data: {
                username: userLogin,
                name: userName,
                password: await bcrypt.hash(
                    userPass,
                    await bcrypt.genSalt()
                ),
                roles: {
                    connect: [
                        {name: 'USER'}
                    ]
                }
            },
        })
        delete user.password;
        return user;

    } catch (error) {
        console.error("Error creating users: ", error);
        throw error;
    }
}



export async function putUser(userId, username, name, password) {
    try {
        const updateUsers = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: name,
                username: username,
                password: await bcrypt.hash(
                    password,
                    await bcrypt.genSalt()
                ),
            },
        })
        delete updateUsers.password;
        return updateUsers

    } catch (error) {
        console.error("Error updating users: ", error);
        throw error;
    }
}


export async function deleteUser(id) {
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: id,
            },
        })
        delete deleteUser.password;
        return deleteUser;
    } catch (error) {
        console.error("Error deleting users: ", error);
        throw error;
    }
}

export async function loadGroup() {
    return group;
}


export async function PromotesUserToCommercial(userName) {

    const user = await prisma.user.update({
        where: {
            username: userName,
        },
        data: {
            roles: {
                connect: [
                        {name: 'COMMERCIAL'}, {name: 'USER'}
                ]
            }
        },
    })
    return user;
}