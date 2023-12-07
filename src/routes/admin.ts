import { Router } from 'express';
import * as auth from '../controllers/auth';
import { getAll } from '../controllers/events';

const router = Router();

router.post('/login', auth.login);

router.use(auth.validate);

router.get('/ping', (req, res) => res.status(200).json({ pong: true, admin: true }));

router.get('/events', getAll);

export default router;

