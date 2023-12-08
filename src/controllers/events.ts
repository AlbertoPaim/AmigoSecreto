import { RequestHandler } from 'express';
import * as events from '../services/events';

export const getAll: RequestHandler = async (req, res) => {
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
		//asdasd
	} catch (error) {
		return res.status(500).json({ message: 'Erro inesperado do servidor' });

	}
};