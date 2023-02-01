import {PrismaClient} from '@prisma/client'
import {unauthorized, badRequest, ServerError} from '../../lib/errors.mjs';


const prisma = new PrismaClient()

const ESTABLISHMENTS_FIELDS = {
	id: true,
	name: true,
	style: false,
	approved: true,
	verified: true,
	rating: false,
	comments: false,
	email: false,
	phone: false,
	address: true,
	city: true,
	state: true,
	zip: true,
	website: false,
	open_monday: false,
	open_tuesday: false,
	open_wednesday: false,
	open_thursday: false,
	open_friday: false,
	open_saturday: false,
	open_sunday: false,
	open: true,
	close: true,
	created_at: false,
	updated_at: false,
	deleted: false,
	deleted_at: false,
}

// Gets all establishments that HAVE BEEN APPROVED.
export async function getAllEstablishments() {
	const establishments = await prisma.establishments.findMany({
		where: {
			approved: true,
		}
	})
	return establishments;
}

export async function getEstablishmentByName(name) {
	const establishment = await prisma.establishments.findUnique({
		where: { name },
		select: ESTABLISHMENTS_FIELDS,
	})
	return establishment;
}

export async function createEstablishment(establishmentData) {
	const getEstablishment = await prisma.establishments.findUnique({where: {name: establishmentData.name}})
		ServerError
			.throwIf(getEstablishment, "Establishment already exists", badRequest)


	let dateComment;
	if (establishmentData.comments !== "") {
		dateComment = establishmentData.comment_at = new Date(Date.now())
	} else {
		dateComment = establishmentData.comment_at = null;
	}

	const establishment = await prisma.establishments.create({
		data: {
			name: establishmentData.name,
			style: establishmentData.style || null,
			rating: establishmentData.rating || null,
			comments: establishmentData.comments || null,
			comment_at: dateComment,
			email: establishmentData.email || null,
			phone: establishmentData.phone || null,
			address: establishmentData.address || null,
			city: establishmentData.city || null,
			state: establishmentData.state || null,
			zip: establishmentData.zip || null,
			website: establishmentData.website || null,
			open_monday: establishmentData.open_monday || null,
			open_tuesday: establishmentData.open_tuesday || null,
			open_wednesday: establishmentData.open_wednesday || null,
			open_thursday: establishmentData.open_thursday || null,
			open_friday: establishmentData.open_friday || null,
			open_saturday: establishmentData.open_saturday || null,
			open_sunday: establishmentData.open_sunday || null,
			open: establishmentData.open || null,
			close: establishmentData.close || null,
			deleted_at: establishmentData.deleted_at || null,
		},
	})
	ServerError
		.throwIf(establishmentData.name === "", "Name is required", badRequest)

	return establishment;
}


export async function updateEstablishment(name, establishmentData) {
	const getEstablishment = !await prisma.establishments.findUnique({where: {name: establishmentData.name}})
	ServerError
		.throwIf(getEstablishment, "Establishment already exists", badRequest)

	const establishment = await prisma.establishments.update({
		where: { name },
		data: {
			name: establishmentData.name,
			style: establishmentData.style || null,
			rating: establishmentData.rating || null,
			comments: establishmentData.comments || null,
			comment_at: establishmentData.comment_at || null,
			email: establishmentData.email || null,
			phone: establishmentData.phone || null,
			address: establishmentData.address || null,
			city: establishmentData.city || null,
			state: establishmentData.state || null,
			zip: establishmentData.zip || null,
			website: establishmentData.website || null,
			open_monday: establishmentData.open_monday,
			open_tuesday: establishmentData.open_tuesday,
			open_wednesday: establishmentData.open_wednesday,
			open_thursday: establishmentData.open_thursday,
			open_friday: establishmentData.open_friday,
			open_saturday: establishmentData.open_saturday,
			open_sunday: establishmentData.open_sunday,
			open: establishmentData.open || null,
			close: establishmentData.close || null,
			deleted_at: establishmentData.deleted_at || null,
		},
	})
	return establishment;
}

export async function deleteEstablishment(name) {
	const establishment = await prisma.establishments.delete({
		where: { name },
	})
	return establishment
}