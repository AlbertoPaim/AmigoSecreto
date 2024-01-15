import { PrismaClient, Prisma } from '@prisma/client';
import * as groups from './groups';
const prisma = new PrismaClient();

type getAllFilters = { id_event: number; id_group?: number }
export const getAllPeopleServices = async (filters: getAllFilters) => {
	try {
		return await prisma.eventPeople.findMany({ where: filters });
	} catch (error) {
		return false;
	}
};

type getOneFilters = { id_event: number; id_group?: number, id?: number, cpf?: string }
export const getOndePeopleServices = async (filters: getOneFilters) => {
	try {
		if (!filters.id && !filters.cpf) false;
		return await prisma.eventPeople.findFirst({ where: filters });
	} catch (error) {
		return false;
	}
};

type PeopleCreateData = Prisma.Args<typeof prisma.eventPeople, 'create'>['data']
export const createPeopleService = async (data: PeopleCreateData) => {
	try {
		if (!data.id_group) false;

		const groupFound = await groups.getGroupService({
			id: Number(data.id_group),
			id_event: data.id_event
		});

		if (!groupFound) false;

		return await prisma.eventPeople.create({ data });
	} catch (error) {
		return false;
	}
};
type DataUpdate = Prisma.Args<typeof prisma.eventPeople, 'update'>['data']
type FiltersUpdate = { id?: number, id_event: number, id_group: number, }
export const updatePeopleService = async (filters: FiltersUpdate, data: DataUpdate) => {
	try {
		return await prisma.eventPeople.updateMany({ where: filters, data });
	} catch (error) {
		return false;
	}
};

