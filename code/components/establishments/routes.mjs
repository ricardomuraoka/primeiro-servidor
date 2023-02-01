import {
	createEstablishmentService,
	deleteEstablishmentService,
	getAllEstablishmentsService,
	getEstablishmentByNameService,
	updateEstablishmentService
} from "./service.mjs";
import {ServerError, unauthorized} from "../../lib/errors.mjs";

/**
 * @openapi
 *
 * /establishments:
 *   get:
 *     summary: "Retrieves establishments information"
 *
 *     tags:
 *       - "establishments"
 *
 *     operationId: get_establishments
 *     x-eov-operation-handler: establishments/routes
 *
 *     responses:
 *       '200':
 *         description: "Returns establishments information"
 *       '404':
 *         description: "Establishments not found"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */
export async function get_establishments(req, res, _) {
	const establishments = await getAllEstablishmentsService();
	if (!establishments) {
		return res.sendStatus(404); //establishments not found
	}
	return res.json(establishments);
}

/**
 * @openapi
 *
 * /establishments/{name}:
 *   get:
 *     summary: "Retrieves establishment information by name"
 *
 *     tags:
 *       - "establishments"
 *
 *     operationId: get_establishment_by_id
 *     x-eov-operation-handler: establishments/routes
 *
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the establishment to retrieve
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: "Returns establishment information"
 *       '404':
 *         description: "Establishment not found"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */
export async function get_establishment_by_id(req, res, _) {
	const { name } = req.params;
	const establishment = await getEstablishmentByNameService(name);
	if (!establishment) {
		return res.sendStatus(404); //establishment not found
	}
	return res.json(establishment);
}

/**
 * @openapi
 *
 * /establishments:
 *   post:
 *     summary: "Creates a new establishment"
 *
 *     tags:
 *       - "establishments"
 *
 *     operationId: create_establishment
 *     x-eov-operation-handler: establishments/routes
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEstablishment'
 *
 *     responses:
 *       '201':
 *         description: "Establishment created"
 *       '400':
 *         description: "Bad request"
 *
 *     security:
 *       - JWT: ['USER']
 */
export async function create_establishment(req, res, _) {
	const data = req.body;
	const establishment = await createEstablishmentService(data);
	if (!establishment) {
		return res.sendStatus(400); // bad request
	}
	return res.status(201).json(establishment);
}

/**
 * @openapi
 *
 * /establishments/{name}:
 *   put:
 *     summary: "Updates an establishment by name"
 *
 *     tags:
 *       - "establishments"
 *
 *     operationId: update_establishment
 *     x-eov-operation-handler: establishments/routes
 *
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: The name of the establishment to update
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: "Returns the updated establishment information"
 *       '404':
 *         description: "Establishment not found"
 *
 *     security:
 *       - {}
 *       - JWT: ['USER']
 */
export async function update_establishment(req, res, _) {
	const name = req.params;
	const data = req.body;
	const updatedEstablishment = await updateEstablishmentService(name, data);
	if (!updatedEstablishment) {
		return res.sendStatus(404); //establishment not found
	}
	return res.json(updatedEstablishment);
}

/**
 * @openapi
 *
 * /establishments/{name}:
 *   delete:
 *     summary: "Delete an establishment by name"
 *
 *     tags:
 *       - "establishments"
 *
 *     operationId: delete_establishment
 *     x-eov-operation-handler: establishments/routes
 *
 *     parameters:
 *       - name: "name"
 *         in: "path"
 *         description: "ID of the establishment to delete"
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
 *       - {}
 *       - JWT: ['USER']
 */
export async function delete_establishment(req, res, _) {
	const { name } = req.params;
	const establishment = await deleteEstablishmentService(name);
	if (!establishment) {
		return res.sendStatus(404); //establishment not found
	}
	return res.sendStatus(200); //establishment deleted successfully
}

