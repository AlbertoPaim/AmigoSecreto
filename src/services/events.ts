/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Prisma } from '@prisma/client';
import * as people from './people';
import * as groups from './groups';
import { encryptMatch } from '../utils/match';

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

type EventUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data']

export const updateEventService = async (id: number, data: EventUpdateData) => {
	try {

		return await prisma.event.update({
			where: { id },
			data
		});

	} catch (error) {
		return false;
	}
};

export const deleteEventService = async (id: number) => {
	try {
		return await prisma.event.delete({ where: { id } });
	} catch (error) {
		return false;
	}
};

// export const doMatches = async (id: number): Promise<boolean> => {
// 	const eventItem = await prisma.event.findFirst({ where: { id }, select: { grouped: true } });

// 	if (eventItem) {
// 		const peopleList = await people.getAllPeopleServices({ id_event: id });

// 		if (peopleList) {

// 			let sortedList: { id: number, matched: number }[] = [];
// 			let sortable: number[] = [];
// 			let attempts = 0;
// 			const maxAttempts = peopleList.length;
// 			let keepTrying = true;

// 			while (keepTrying && attempts < maxAttempts) {
// 				keepTrying = false;
// 				attempts++;
// 				sortedList = [];
// 				sortable = peopleList.map(item => item.id);

// 				for (const i in peopleList) {
// 					let sortableFiltered: number[] = sortable;

// 					if (eventItem.grouped) {
// 						sortableFiltered = sortable.filter(sortableItem => {
// 							const sortablePerson = peopleList.find(item => item.id === sortableItem);
// 							return peopleList[i].id_group !== sortablePerson?.id_group;
// 						});
// 					}

// 					if (sortableFiltered.length === 0 || (sortableFiltered.length === 1 && peopleList[i].id === sortableFiltered[0])) {
// 						keepTrying = true;
// 					} else {
// 						let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);

// 						while (sortableFiltered[sortedIndex] === peopleList[id].id) {
// 							sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
// 						}

// 						sortedList.push({
// 							id: peopleList[i].id,
// 							matched: sortableFiltered[sortedIndex]
// 						});
// 						sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex]);
// 					}
// 				}

// 			}

// 			if (attempts < maxAttempts) {
// 				for (const i in sortedList) {
// 					await people.updatePeopleService({
// 						id: sortedList[i].id,
// 						id_event: id
// 					}, { matched: encryptMatch(sortedList[i].matched) });
// 				}

// 				return true;
// 			}

// 			console.log(sortedList);


// 		}

// 	}

// 	return false;

// };

export const doMatches = async (id: number): Promise<boolean> => {
	const eventItem = await prisma.event.findFirst({ where: { id }, select: { grouped: true } });

	if (eventItem) {
		const peopleList = await people.getAllPeopleServices({ id_event: id });

		if (peopleList) {
			let sortedList: { id: number, matched: number }[] = [];

			const maxAttempts = peopleList.length;

			for (let attempts = 0; attempts < maxAttempts; attempts++) {
				sortedList = [];
				let sortable = peopleList.map(item => item.id);

				let keepTrying = false;

				for (const person of peopleList) {
					let sortableFiltered = sortable;

					if (eventItem.grouped) {
						sortableFiltered = sortable.filter(sortableItem => {
							const sortablePerson = peopleList.find(item => item.id === sortableItem);
							return person.id_group !== sortablePerson?.id_group;
						});
					}

					if (sortableFiltered.length === 0 || (sortableFiltered.length === 1 && person.id === sortableFiltered[0])) {
						keepTrying = true;
					} else {
						let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);

						while (sortableFiltered[sortedIndex] === person.id) {
							sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
						}

						sortedList.push({
							id: person.id,
							matched: sortableFiltered[sortedIndex]
						});

						sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex]);
					}
				}

				if (!keepTrying) {
					for (const match of sortedList) {
						await people.updatePeopleService({
							id: match.id,
							id_event: id
						}, { matched: encryptMatch(match.matched) });
					}

					console.log(sortedList);

					return true;
				}
			}
		}
	}

	return false;
};
