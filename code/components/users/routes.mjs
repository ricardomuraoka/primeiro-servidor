import {getUser, login, creatingUser, updateUser, delUser, getGroup} from "./service.mjs";
/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the users"
 *
 *     tags:
 *       - "auth"
 *
 *     operationId: user_login
 *     x-eov-operation-handler: users/routes
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
 *     summary: "Retrieves users information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: get_user
 *     x-eov-operation-handler: users/routes
 *
 *     responses:
 *       '200':
 *         description: "Returns the users"
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
 * /users/users:
 *   post:
 *     summary: "Creates a users"
 *
 *     tags:
 *     - "profile"
 *
 *
 *     operationId: create_user
 *     x-eov-operation-handler: users/routes
 *
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUser"
 *
 *
 *     responses:
 *       '200':
 *         description: "User created successfully"
 *
 *       '400':
 *         description: "Failed to create users"
 *
 *     security:
 *       - {}
 *       - JWT: ['ADMIN']
 */

export async function create_user(req, res, _) {
  const { username, name, password } = await(req.body);
  let user = await creatingUser(username, name, password );
  return user ? res.json({ user }) : res.sendStatus(400);
}

/**
 * @openapi
 *
 * /users/me:
 *   put:
 *     summary: "Updates users information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: update_user
 *     x-eov-operation-handler: users/routes
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
 *       '500':
 *         description: "Error updating users"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */

export async function update_user(req, res, _) {
  try {
    const userId = await getUser(req.user.id);
    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }
    let id = userId.id;
    let { username, name, password } = req.body;
    const updatedUser = await updateUser(id, username, name, password);
    return res.status(200).json({ message: 'User updated', updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating users' });
  }
}

/**
 * @openapi
 *
 * /users/me:
 *   delete:
 *     summary: "Delete users information"
 *
 *     tags:
 *       - "profile"
 *
 *     operationId: delete_user
 *     x-eov-operation-handler: users/routes
 *
 *
 *     responses:
 *       '200':
 *         description: "User deleted"
 *       '400':
 *         description: "Bad request"
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
    return res.sendStatus(404); //users not found
  }
  let id = userId.id;
  const deleteSuccess = await delUser(id);
  if(deleteSuccess){
    return res.json({ message: 'User deleted', deleteSuccess });
  }else{
    return res.sendStatus(400);
  }
}

/**
 * @openapi
 *
 * /users/info:
 *   get:
 *     summary: "Group information"
 *
 *     tags:
 *       - "group"
 *
 *     operationId: get_group
 *     x-eov-operation-handler: users/routes
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