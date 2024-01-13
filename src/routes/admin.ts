import { Router } from 'express';
import * as auth from '../controllers/auth';
import { createEvent, deleteEvent, getAllEvent, getEvent, updateEvent } from '../controllers/events';
import { creategroup, deleteGroup, getAllGroups, getGroup, updateGroup } from '../controllers/groups';
import { getAllPeople, getOnePeople } from '../controllers/people';

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
router.post('/events/:id_event/groups', creategroup);
router.put('/events/:id_event/groups/:id', updateGroup);
router.delete('/events/:id_event/groups/:id', deleteGroup);

router.get('/events/:id_events/groups/:id_group/people', getAllPeople);
router.get('/events/:id_events/groups/:id_group/people/:id', getOnePeople);
router.post('/events/:id_events/groups/:id_group/people/');
export default router;

