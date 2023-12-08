import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async () => {
	try {
		return await prisma.event.findMany();
	} catch (error) {
		return false;
	}
};


export const getOne = async (id: number) => {
	try {
		return await prisma.event.findUnique({
			where: {
				id
			}
		});
	} catch (error) {
		return false;
	}
};

type createEventData = Prisma.Args<typeof prisma.event, 'create'>['data']

export const addEvent = async (data: createEventData) => {
	try {
		return await prisma.event.create({ data });
	} catch (error) {
		return false;
	}
};