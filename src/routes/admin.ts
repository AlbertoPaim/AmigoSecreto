import { Router } from 'express';
import * as auth from '../controllers/auth';
import { createEvent, getAll, getEvent } from '../controllers/events';

const router = Router();

router.post('/login', auth.login);

router.use(auth.validate);

router.get('/ping', (req, res) => res.status(200).json({ pong: true, admin: true }));

router.get('/events', getAll);
router.get('/events/:id', getEvent);
router.post('/events', createEvent);

export default router;

