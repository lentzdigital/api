import express from 'express';
import UserRoutes from './UserRoutes';
import LessonRoutes from './LessonRoutes';
import verify from '../middlewares/AuthMiddleware';

const router = express.Router();

router.get('/test-server', (req, res) => res.send('OK'));

router.use('/lesson', [verify], LessonRoutes);

router.use('/user', UserRoutes);

export default router;