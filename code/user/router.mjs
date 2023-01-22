import {getUser, login, postUser, updateUser, delUser, getGroup} from "./service.mjs";

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the user"
 *
 *     tags:
 *       - "auth"
 *
 *     operationId: user_login
 *     x-eov-operation-handler: router
 *
 *     requestBody:
 *       description: Login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsernamePassword"
 *
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */
export async function user_login(req, res, _) {
  const user = await login(req.body);
  return user ? res.json(user) : res.sendStatus(401);
}

/**
 * @openapi
 *
 * /users/me:
 *   get:
 *     summary: "Retrieves user information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: get_user
 *     x-eov-operation-handler: router
 *
 *     responses:
 *       '200':
 *         description: "Returns the user"
 *       '404':
 *         description: "User not found"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */
export async function get_user(req, res, _) {
  if (!req.user) res.send("Hello guest!");

  const user = await getUser(req.user.id);
  return user ? res.json(user) : res.sendStatus(404);
}

/**
 * @openapi
 *
 * /users/create:
 *   post:
 *     summary: "Creates a user"
 *
 *     tags:
 *     - "profile"
 *
 *
 *     operationId: create_user
 *     x-eov-operation-handler: router
 *
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *
 *
 *     responses:
 *       '200':
 *         description: "User created successfully"
 *
 *       '400':
 *         description: "Failed to create user"
 *
 *     security:
 *       - {}
 *       - JWT: ['ADMIN']
 */

export async function create_user(req, res, _) {
  const { login, password, isAdmin } = await(req.body);
  await postUser(login, password, isAdmin);
  return { login, password, isAdmin } ? res.sendStatus(200) : res.sendStatus(400);
}

/**
 * @openapi
 *
 * /users/me:
 *   put:
 *     summary: "Updates user information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: update_user
 *     x-eov-operation-handler: router
 *
 *     requestBody:
 *       description: Update User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *
 *     responses:
 *       '200':
 *         description: "User updated"
 *       '404':
 *         description: "User not found"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */

export async function update_user(req, res, _) {
  const userId = await getUser(req.user.id);
  if (!userId) {
    return res.sendStatus(404); //user not found
  }
  const { login, password, admin } = req.body;
  const updateSuccess = await updateUser(userId, login, password, admin);
  if(updateSuccess){
    return res.sendStatus(200);
  }else{
    return res.sendStatus(400);
  }
}

/**
 * @openapi
 *
 * /users/me:
 *   delete:
 *     summary: "Delete user information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: delete_user
 *     x-eov-operation-handler: router
 *
 *
 *     responses:
 *       '200':
 *         description: "User deleted"
 *       '404':
 *         description: "User not found"
 *
 *     security:
 *        - {}
 *        - JWT: ['USER']
 */

export async function delete_user(req, res, _) {
  const userId = await getUser(req.user.id);
  if (!userId) {
    return res.sendStatus(404); //user not found
  }
  const deleteSuccess = await delUser(userId);
  if(deleteSuccess){
    return res.sendStatus(200);
  }else{
    return res.sendStatus(400);
  }
}

/**
 * @openapi
 *
 * /users/group:
 *   get:
 *     summary: "Group information"
 *
 *     tags:
 *       - "group"
 *
 *     operationId: get_group
 *     x-eov-operation-handler: router
 *
 *     responses:
 *       '200':
 *         description: "Returns information from the group"
 *       '404':
 *         description: "Information not found"
 *
 *     security:
 *       - {}
 */
export async function get_group(req, res, _) {
  const group = await getGroup();
    return group ? res.json(group) : res.sendStatus(404);
}
