import { Router } from 'express';
import * as auth from '../controllers/auth';
import { createEvent, deleteEvent, getAllEvent, getEvent, updateEvent } from '../controllers/events';
import { getAllGroups, getGroup } from '../controllers/groups';

const router = Router();

router.post('/login', auth.login);

router.use(auth.validate);

router.get('/ping', (req, res) => res.status(200).json({ pong: true, admin: true }));

router.get('/events', getAllEvent);
router.get('/events/:id', getEvent);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

router.get('/events/:id_event/groups', getAllGroups);
router.get('/event/:id_event/groups/:id', getGroup);

export default router;

