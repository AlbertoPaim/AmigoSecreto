import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type getAllFilters = { id_event: number; id_group?: number }
export const getAllPeopleServices = async (filters: getAllFilters) => {
	try {
		return await prisma.eventPeople.findMany({ where: filters });
	} catch (error) {
		return false;
	}
};

type getOneFilters = { id_event: number; id_group: number, id: number }
export const getOndePeopleServices = async (filters: getOneFilters) => {
	try {
		return await prisma.eventPeople.findFirst({ where: filters });
	} catch (error) {
		return false;
	}
};
