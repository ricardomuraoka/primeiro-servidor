import {
	approveEstablishment,
	createEstablishment,
	deleteEstablishment,
	getAllEstablishments, getAllEstablishmentsUnapproved,
	getEstablishmentByName,
	updateEstablishment
} from "./repository.mjs";

export async function getAllEstablishmentsService() {
	return await getAllEstablishments();
}

export async function getEstablishmentByNameService(name) {
	return await getEstablishmentByName(name);
}

export async function createEstablishmentService(data) {
	return await createEstablishment(data);
}

export async function updateEstablishmentService(name, data) {
	return await updateEstablishment(name, data);
}

export async function deleteEstablishmentService(name) {
	return await deleteEstablishment(name);
}

export async function approveEstablishmentService(name) {
	return await approveEstablishment(name);
}

export async function getAllEstablishmentsUnapprovedService() {
	return await getAllEstablishmentsUnapproved();
}
