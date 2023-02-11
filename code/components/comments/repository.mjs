import {PrismaClient} from '@prisma/client'
import {unauthorized, badRequest, ServerError} from '../../lib/errors.mjs';


const prisma = new PrismaClient()

const COMMENTS_FIELDS= {
	id:  false,
	text: true,
	rating: true,
	comment_at: false,
	user: {
		id: true,
		username: true,
		roles: true

	},
	establishment: {
			id: true,
			name: true
	}
}


export async function getCommentsByEstablishment(establishmentName) {
	const comments = await prisma.comment.findMany({
		where: {
			establishment: {
				name: establishmentName
			}
		},
		select: {
			id:  true,
			text: true,
			rating: true,
			comment_at: true,
			user: {
				select: {
					username: true,
				}
			},
			establishment: {
				select: {
					name: true,
				}
			}
		}
	})
	return comments;
}

export async function getCommentByUser(userId) {
	const comments = await prisma.comment.findMany({
		where: {
			user: {
				id: userId
			}
		},
		select: {
			id:  true,
			text: true,
			rating: true,
			comment_at: true,
			user: {
				select: {
					username: true,
				}
			},
			establishment: {
				select: {
					name: true,
				}
			}
		}
	})
	return comments;
}

export async function createComment(data, userId, establishmentName) {
	const comment_at = new Date(Date.now());
	const comment = await prisma.comment.create({
		data: {
			text: data.text,
			rating: data.rating,
			comment_at: comment_at,
			user: {
				connect: {
					id: userId
				}
			},
			establishment: {
				connect: {
					name: establishmentName
				}
			}
		},
	})
	return comment;
}

export async function updateComment(data, userId, commentId) {
	const comment_at = new Date(Date.now());
	const updatedComment = await prisma.comment.update({
		where: {id: commentId},
		data: {
			text: data.text,
			rating: data.rating,
			comment_at: comment_at,
			user: {
				connect: {
					id: userId
				}
			}
		},
	})
	return updatedComment;
}

export async function deleteComment(commentId) {
	const deletedComment = await prisma.comment.delete({
		where: { id: commentId },
	});
	return true;
}


