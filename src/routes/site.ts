import { Router } from 'express';
import { getEvent } from '../controllers/events';
import { searchPeople } from '../controllers/people';

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ pong: true }));

router.get('/event/:id', getEvent);
router.get('/event/:id_event/search', searchPeople);

export default router;

