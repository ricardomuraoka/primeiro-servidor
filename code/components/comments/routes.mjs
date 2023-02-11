import {createCommentService,
		deleteCommentService,
		getCommentByUserService,
		getCommentsByEstablishmentService,
		updateCommentService} from "./service.mjs";


/**
 * @openapi
 *
 * /comment/{establishmentName}:
 *   get:
 *     summary: "Retrieves Comments by establishment name"
 *
 *     tags:
 *       - "comments"
 *
 *     operationId: get_comments_establishment
 *     x-eov-operation-handler: comments/routes
 *
 *     parameters:
 *       - name: establishmentName
 *         in: path
 *         required: true
 *         description: "The name of the establishment to retrieve"
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: "Returns comments information by establishment name"
 *       '404':
 *         description: "Comments for this establishment not found"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function get_comments_establishment(req, res, _) {
	const { establishmentName } = req.params;
	const comment = await getCommentsByEstablishmentService(establishmentName);
	if (!comment) {
		return res.sendStatus(404); //establishments not found
	}
	return res.json(comment);
}

/**
 * @openapi
 *
 * /comments/me:
 *   get:
 *     summary: "Retrieves Comments by user"
 *
 *     tags:
 *       - "comments"
 *
 *     operationId: get_comments_user
 *     x-eov-operation-handler: comments/routes
 *
 *     responses:
 *       '200':
 *         description: "Returns comments information by user"
 *       '404':
 *         description: "Comments for this user not found"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function get_comments_user(req, res, _) {
	const { id } = req.user.id;
	const comment = await getCommentByUserService(id);
	if (!comment) {
		return res.sendStatus(404); //establishment not found
	}
	return res.json(comment);
}

/**
 * @openapi
 *
 * /comments/{establishmentName}:
 *   post:
 *     summary: "Creates a new comment"
 *
 *     tags:
 *       - "comments"
 *
 *     operationId: create_comment
 *     x-eov-operation-handler: comments/routes
 *
 *     parameters:
 *       - name: establishmentName
 *         in: path
 *         required: true
 *         description: "The name of the establishment to retrieve"
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *
 *     responses:
 *       '201':
 *         description: "Comment created"
 *       '400':
 *         description: "Bad request"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function create_comment(req, res, _) {
	const data = req.body;
	const { establishmentName } = req.params;
	const userId = req.user.id;
	const comment = await createCommentService(data, userId, establishmentName);
	if (!comment) {
		return res.sendStatus(400); // bad request
	}
	return res.status(201).json(comment);
}

/**
 * @openapi
 *
 * /comments/{commentId}:
 *   put:
 *     summary: "Updates a comment by id"
 *
 *     tags:
 *       - "comments"
 *
 *     operationId: update_comment
 *     x-eov-operation-handler: comments/routes
 *
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Comment'
 *
 *     responses:
 *       '200':
 *         description: "Returns the updated establishment information"
 *       '404':
 *         description: "Establishment not found"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function update_comment(req, res, _) {
	const data = req.body;
	const { commentId } = req.params;
	const userId = req.user.id;
	const comment = await updateCommentService(data, userId, commentId);
	if (!comment) {
		return res.sendStatus(400);
	}
	return res.status(200).json(comment);
}

/**
 * @openapi
 *
 * /comments/{commentId}:
 *   delete:
 *     summary: "Deletes a comment by id"
 *
 *     tags:
 *       - "comments"
 *
 *     operationId: delete_comment
 *     x-eov-operation-handler: comments/routes
 *
 *     parameters:
 *       - name: commentId
 *         in: "path"
 *         description: "ID of the comment to delete"
 *         required: true
 *         schema:
 *           type: "string"
 *
 *     responses:
 *       '200':
 *         description: "Establishment deleted successfully"
 *       '404':
 *         description: "Establishment not found"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function delete_comment(req, res, _) {
	const { commentId } = req.params;
	const comment = await deleteCommentService(commentId);
	if (!comment) {
		return res.sendStatus(404);
	}
	return res.sendStatus(200);
}