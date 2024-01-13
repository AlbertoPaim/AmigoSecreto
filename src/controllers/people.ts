import { RequestHandler } from 'express';
import * as people from '../services/people';

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
