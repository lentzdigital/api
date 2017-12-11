import express from 'express';
import ClassRoutes from './ClassRoutes';
import LessonRoutes from './LessonRoutes';

const router = express.Router();

router.get('/test-server', (req, res) =>
	res.send('OK')
);

router.use('/class', ClassRoutes);
router.use('/lesson', LessonRoutes);

export default router;