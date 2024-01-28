import { RequestHandler } from 'express';
import * as people from '../services/people';
import { z } from 'zod';
import { decryptMatch } from '../utils/match';

export const getAllPeople: RequestHandler = async (req, res) => {
	const { id_event, id_group } = req.params;
	try {
		const peopleFound = await people.getAllPeopleServices({
			id_event: Number(id_event),
			id_group: Number(id_group)
		});

		if (!peopleFound) {
			return res.status(404).json({ message: 'Pessoas não encontradas' });
		}

		return res.status(200).json(peopleFound);
	} catch (error) {
		return res.status(500).json({ message: 'Erro interno do servidor' });
	}
};

export const getOnePeople: RequestHandler = async (req, res) => {
	const { id_event, id_group, id } = req.params;
	try {
		const peopleFound = await people.getOndePeopleServices({
			id_event: Number(id_event),
			id_group: Number(id_group),
			id: Number(id)
		});

		if (!peopleFound) {
			return res.status(404).json({ message: 'Pessoas não encontradas' });
		}

		return res.status(200).json(peopleFound);
	} catch (error) {
		return res.status(500).json({ message: 'Erro interno do servidor' });
	}
};

export const createPeople: RequestHandler = async (req, res) => {
	const { id_event, id_group } = req.params;
	try {
		const createPeopleSchema = z.object({
			name: z.string(),
			cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
		});

		const body = createPeopleSchema.safeParse(req.body);

		if (!body.success) {
			return res.status(400).json({ message: 'Dados inválidos' });
		}

		const createdPeople = await people.createPeopleService({
			...body.data,
			id_event: Number(id_event),
			id_group: Number(id_group),
		});

		return res.status(201).json({ createdPeople });
	} catch (error) {
		return res.status(500).json({ message: 'Erro interno do servidor' });
	}
};

export const updatePeople: RequestHandler = async (req, res) => {
	const { id, id_event, id_group } = req.params;
	try {
		const updatePeopleSchema = z.object({
			name: z.string().optional(),
			cpf: z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
			matched: z.string().optional()
		});

		const body = updatePeopleSchema.safeParse(req.body);

		if (!body.success) {
			return res.status(400).json({ message: 'Dados inválidos' });
		}

		const updatedPeople = await people.updatePeopleService({
			id: Number(id),
			id_event: Number(id_event),
			id_group: Number(id_group)
		}, body.data);

		return res.status(200).json(updatedPeople);
	} catch (error) {
		return res.status(500).json({ message: 'Erro interno do servidor' });
	}
};

export const deletePeople: RequestHandler = async (req, res) => {
	const { id, id_event, id_group } = req.params;
	try {
		const deletedPeople = await people.deletePeopleService({
			id: Number(id),
			id_event: Number(id_event),
			id_group: Number(id_group)
		});

		if (!deletedPeople) {
			return res.status(400).json({ message: 'Não foi possivel deletar' });
		}

		return res.status(204).json({ message: 'Deletado' });
	} catch (error) {
		return res.status(500).json({ message: 'Erro interno do servidor' });
	}
};

export const searchPeople: RequestHandler = async (req, res) => {
	const { id_event } = req.params;

	const searchPeopleSchema = z.object({
		cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
	});

	const query = searchPeopleSchema.safeParse(req.query);

	if (!query.success) {
		return res.status(400).json({ message: 'Não foi possivel achar a pessoa' });
	}

	const personData = await people.getOndePeopleServices({
		id_event: Number(id_event),
		cpf: query.data.cpf
	});

	if (personData && personData.matched) {
		const matchedId = decryptMatch(personData.matched);

		const personMatched = await people.getOndePeopleServices({
			id_event: Number(id_event),
			id: matchedId
		});

		if (personMatched) {
			return res.json({
				person: {
					id: personData.id,
					name: personData.name
				},
				personMatched: {
					id: personMatched.id,
					name: personMatched.name
				}
			});
		}
	}

	return res.status(400).json({ message: 'Não foi possivel achar a pessoa' });
};
