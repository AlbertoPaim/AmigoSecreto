import { PrismaClient, Prisma } from '@prisma/client';
import * as event from './events';
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

type groupCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data']

export const createGroupeService = async (data: groupCreateData) => {
	try {
		if (!data.id_event) {
			return false;
		}

		const eventItem = await event.getOne(data.id_event);

		if (!eventItem) {
			return false;
		}

		return await prisma.eventGroup.create({ data });

	} catch (error) {
		return false;
	}
};