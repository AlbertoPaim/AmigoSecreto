import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllGroupsServices = async (id_event: number) => {
	try {
		return await prisma.eventGroup.findMany({ where: { id_event } });
	} catch (error) {
		return false;
	}
};

type GetGroupFilter = {
	id_event?: number,
	id: number;
}

export const getGroupService = async (filter: GetGroupFilter) => {
	try {
		return await prisma.eventGroup.findFirst({ where: filter });
	} catch (error) {
		return false;
	}
};