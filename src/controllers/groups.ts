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
			return res.status(404).json({ message: 'Grupo não encontrado' });
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

export const updateGroup: RequestHandler = async (req, res) =>{
	const {id, id_event} = req.params;
	try {
		const updateGroupSchema = z.object({
			name: z.string().optional()
		});

		const body = updateGroupSchema.safeParse(req.body);

		
		if(!body.success){
			return res.status(400).json({ message: 'Dados inválidos' });
		}			
		
		const updatedGroup = await groups.updateGroupService({
			id: parseInt(id),
			id_event: parseInt(id_event),
		}, body.data);

		console.log(updatedGroup);
		
		return res.status(200).json(updatedGroup);

	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const deleteGroup : RequestHandler =  async (req, res) =>{
	const {id_event, id} = req.params;
	try {
		const deletedGroup = await groups.deleteGroupService({
			id_event: Number(id_event),
			id: Number(id)
		});

		if(!deletedGroup){
			return res.status(400).json({message: 'Não foi possivel deletar o grupo'});
		}
		return res.status(200).json(deletedGroup);
	} catch (error) {
		return res.status(500).json({ error });
	}
};