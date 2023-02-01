import { createEstablishment, deleteEstablishment,getAllEstablishments,getEstablishmentByName,updateEstablishment } from "./repository.mjs";

export async function getAllEstablishmentsService() {
	return await getAllEstablishments()
}

export async function getEstablishmentByNameService(id) {
	return await getEstablishmentByName(id)
}

export async function createEstablishmentService(data) {
	return await createEstablishment(data)
}

export async function updateEstablishmentService(id, data) {
	return await updateEstablishment(id, data)
}

export async function deleteEstablishmentService(id) {
	return await deleteEstablishment(id)
}