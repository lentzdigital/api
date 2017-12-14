import express from 'express';
import UserRoutes from './UserRoutes';
import LessonRoutes from './LessonRoutes';
import TicketRoutes from './TicketRoutes';
import TrackRoutes from './TrackRoutes';
import verify from '../middlewares/AuthMiddleware';

const router = express.Router();

router.get('/test-server', (req, res) => res.send('OK'));

router.use('/lesson', LessonRoutes);
router.use('/ticket', TicketRoutes);
router.use('/track', [verify], TrackRoutes);
router.use('/user', UserRoutes);

export default router;