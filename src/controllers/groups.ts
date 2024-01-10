import { RequestHandler } from 'express';
import * as groups from '../services/groups';
import { z } from 'zod';

export const getAllGroups: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	try {
		const foundGroups = await groups.getAllGroupsServices(Number(id_event));

		if (!foundGroups) {
			return res.status(404).json({ message: 'Nenhum grupo foi encontrado' });
		}

		return res.status(200).json(foundGroups);
	} catch (error) {
		return res.status(500).json({ error });
	}

};

export const getGroup: RequestHandler = async (req, res) => {
	const { id, id_event } = req.params;

	try {
		const foundGroup = await groups.getGroupService({
			id_event: Number(id_event),
			id: Number(id)
		});

		if (!foundGroup) {
			return res.status(404).json({ message: 'Grupo não pode ser deletado' });
		}

		return res.status(200).json(foundGroup);

	} catch (error) {
		return res.status(500).json({ error });

	}
};

export const creategroup: RequestHandler = async (req, res) => {
	const { id_event } = req.params;
	try {
		const createGroupeSchema = z.object({
			name: z.string()
		});

		const body = createGroupeSchema.safeParse(req.body);

		if (!body.success) {
			return res.status(400).json({ message: 'Dados inválidos' });
		}

		const newGroupEvent = await groups.createGroupeService({
			name: body.data.name,
			id_event: Number(id_event)
		});

		return res.status(201).json(newGroupEvent);
	} catch (error) {
		return res.status(500).json({ error });

	}
};

const data = 'data asdasd asdas';