import { RequestHandler } from 'express';
import * as events from '../services/events';
import { z } from 'zod';
import { updatePeopleService } from '../services/people';

export const getAllEvent: RequestHandler = async (req, res) => {
	try {
		const itens = await events.getAll();

		res.json({ itens });
	} catch (error) {

		return res.status(500).json({ message: 'Erro inesperado do servidor' });
	}

};

export const getEvent: RequestHandler = async (req, res) => {

	const { id } = req.params;
	try {
		const iten = await events.getOne(Number(id));

		if (!iten) {
			return res.status(404).json({ message: 'Nenhum evento foi encontrado' });
		}
		return res.status(200).json({ iten });
	} catch (error) {
		return res.status(500).json({ message: 'Erro inesperado do servidor' });

	}
};

export const createEvent: RequestHandler = async (req, res) => {
	try {
		const createSchema = z.object({
			title: z.string(),
			description: z.string(),
			grouped: z.boolean()
		});

		const body = createSchema.safeParse(req.body);

		if (!body.success) {
			return res.status(401).json(body.success);

		}
		const newEvent = await events.addEvent(body.data);

		if (!newEvent) {
			return res.status(401).json({ message: 'Não foi possivel criar um evento' });
		}
		return res.status(201).json(newEvent);

	} catch (error) {
		return res.status(500).json({ error });

	}
};

export const updateEvent: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const updateEventSchema = z.object({
			status: z.boolean().optional(),
			title: z.string().optional(),
			description: z.string().optional(),
			grouped: z.boolean().optional()
		});

		const body = updateEventSchema.safeParse(req.body);
		if (!body.success) {
			return res.json({ error: 'Dados inválidos' });
		}

		const eventUpdated = await events.updateEventService(Number(id), body.data);

		if (eventUpdated) {
			if (eventUpdated.status) {
				const result = await events.doMatches(parseInt(id));
				if (!result) {
					return res.status(400).json({ message: 'Não foi possivel fazer o evento' });
				}
			} else {
				await updatePeopleService({ id_event: Number(id) }, { matched: 'oi' });
			}
			return res.status(200).json(eventUpdated);
		}
		return res.status(400).json({ message: 'Não foi possivel atualizar o evento' });
	} catch (error) {

		return res.status(500).json({ error });

	}

};

export const deleteEvent: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedEvent = await events.deleteEventService(Number(id));

		if (!deletedEvent) {
			return res.status(400).json({ message: 'Não foi possivel deletar o evento' }
			);
		}

		return res.status(204).json({ deleteEvent });
	} catch (error) {
		return res.status(500).json({ error });

	}

};
