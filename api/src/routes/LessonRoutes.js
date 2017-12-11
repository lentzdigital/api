import express from 'express';
import LessonController from '../controllers/LessonController';
import WebuntisController from '../controllers/WebunitsController';

const router = express.Router();

router.route('/')
	.get(LessonController.getAll),

router.route('/next')
	.get(LessonController.getSingleLesson);

router.route('/crawl')
	.post(LessonController.sync);

export default router;

