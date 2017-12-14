import express from 'express';
import LessonController from '../controllers/LessonController';

const router = express.Router();

router.route('/')
	.get(LessonController.getAll)
	.post(LessonController.addAttendee);

router.route('/current/:userId')
	.get(LessonController.getAllByDate);

router.route('/count')
	.get(LessonController.countAllLessons);

router.route('/statistics/:userId')
	.get(LessonController.getAttendanceRate);

router.route('/crawl')
	.post(LessonController.sync);

// router.route('/single/:id')
// 	.get(LessonController.getSingleLesson);

export default router;

