import {
	getCommentsByEstablishment,
	getCommentByUser,
	createComment,
	updateComment,
	deleteComment,
} from "./repository.mjs";

export async function getCommentsByEstablishmentService() {
	return await getCommentsByEstablishment();
}

export async function getCommentByUserService() {
	return await getCommentByUser();
}

export async function createCommentService(data, userId, establishmentName) {
	return await createComment(data, userId, establishmentName);
}

export async function updateCommentService(data, userId, commentId) {
	return await updateComment(data, userId, commentId);
}

export async function deleteCommentService(commentId) {
	return await deleteComment(commentId);
}

