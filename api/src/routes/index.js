import express from 'express';
import ClassRoutes from './ClassRoutes';
import LessonRoutes from './LessonRoutes';
import TicketRoutes from './TicketRoutes';
import TrackRoutes from './TrackRoutes';

const router = express.Router();

router.get('/test-server', (req, res) =>
	res.send('OK')
);

router.use('/lesson', LessonRoutes);
router.use('/ticket', TicketRoutes);
router.use('/track', TrackRoutes);

export default router;