import { Router } from 'express';
import * as auth from '../controllers/auth';
import { createEvent, deleteEvent, getAllEvent, getEvent, updateEvent } from '../controllers/events';
import { creategroup, deleteGroup, getAllGroups, getGroup, updateGroup } from '../controllers/groups';
import { createPeople, getAllPeople, getOnePeople, updatePeople } from '../controllers/people';

const router = Router();

router.post('/login', auth.login);

router.use(auth.validate);

router.get('/ping', (req, res) => res.status(200).json({ pong: true, admin: true }));

router.get('/event', getAllEvent);
router.get('/event/:id', getEvent);
router.post('/event', createEvent);
router.put('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);

router.get('/event/:id_event/groups', getAllGroups);
router.get('/event/:id_event/groups/:id', getGroup);
router.post('/event/:id_event/groups', creategroup);
router.put('/event/:id_event/groups/:id', updateGroup);
router.delete('event/:id_event/groups/:id', deleteGroup);

router.get('/event/:id_event/groups/:id_group/people', getAllPeople);
router.get('/event/:id_event/groups/:id_group/people/:id', getOnePeople);
router.post('/event/:id_event/groups/:id_group/people', createPeople);
router.put('/event/:id_event/groups/:id_group/people/:id', updatePeople);

export default router;

