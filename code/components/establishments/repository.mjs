import {PrismaClient} from '@prisma/client'
import {unauthorized, badRequest, ServerError} from '../../lib/errors.mjs';


const prisma = new PrismaClient()

const ESTABLISHMENTS_FIELDS = {
	id: true,
	name: true,
	style: true,
	approved: false,
	verified: true,
	email: true,
	phone: true,
	address: true,
	city: true,
	state: true,
	zip: true,
	website: true,
	open_monday: true,
	open_tuesday: true,
	open_wednesday: true,
	open_thursday: true,
	open_friday: true,
	open_saturday: true,
	open_sunday: true,
	open: true,
	close: true,
	created_at: false,
	updated_at: false,
	deleted: false,
	deleted_at: false,
	comment: false,
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


	const establishment = await prisma.establishments.create({
		data: {
			name: establishmentData.name,
			style: establishmentData.style || undefined,
			email: establishmentData.email || undefined,
			phone: establishmentData.phone || undefined,
			address: establishmentData.address || undefined,
			city: establishmentData.city || undefined,
			state: establishmentData.state || undefined,
			zip: establishmentData.zip || undefined,
			website: establishmentData.website || undefined,
			open_monday: establishmentData.open_monday,
			open_tuesday: establishmentData.open_tuesday,
			open_wednesday: establishmentData.open_wednesday,
			open_thursday: establishmentData.open_thursday,
			open_friday: establishmentData.open_friday,
			open_saturday: establishmentData.open_saturday,
			open_sunday: establishmentData.open_sunday,
			open: establishmentData.open || undefined,
			close: establishmentData.close || undefined,
			deleted_at: establishmentData.deleted_at || undefined,
		},
	})
	ServerError
		.throwIf(establishmentData.name === "", "Name is required", badRequest)

	return establishment;
}


export async function updateEstablishment(name, establishmentData) {
	const getEstablishment = await prisma.establishments.findUnique({where: {name: establishmentData.name}})
	ServerError
		.throwIfNot(getEstablishment, "Establishment does not exist", badRequest)

	const establishment = await prisma.establishments.update({
		where: { name },
		data: {
			name: establishmentData.name,
			style: establishmentData.style || undefined,
			email: establishmentData.email || undefined,
			phone: establishmentData.phone || undefined,
			address: establishmentData.address || undefined,
			city: establishmentData.city || undefined,
			state: establishmentData.state || undefined,
			zip: establishmentData.zip || undefined,
			website: establishmentData.website || undefined,
			open_monday: establishmentData.open_monday,
			open_tuesday: establishmentData.open_tuesday,
			open_wednesday: establishmentData.open_wednesday,
			open_thursday: establishmentData.open_thursday,
			open_friday: establishmentData.open_friday,
			open_saturday: establishmentData.open_saturday,
			open_sunday: establishmentData.open_sunday,
			open: establishmentData.open || undefined,
			close: establishmentData.close || undefined,
			deleted_at: establishmentData.deleted_at || undefined,
		},
	})
	return establishment;
}

export async function deleteEstablishment(name) {
	const establishment = await prisma.establishments.delete({
		where: { name },
	})
	return establishment;
}

export async function approveEstablishment(name) {
	const establishment = await prisma.establishments.update({
		where: { name },
		data: {
			approved: true,
		},
	})
	return establishment;
}

export async function getAllEstablishmentsUnapproved() {
	const establishments = await prisma.establishments.findMany({
		where: {
			approved: false,
		}
	})
	return establishments;
}



