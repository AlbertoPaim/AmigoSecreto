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