import express from 'express';
import LessonController from '../controllers/LessonController';

const router = express.Router();

router.route('/')
	.post(LessonController.addAttendee);

router.route('/all/:userId')
	.get(LessonController.getAll);

router.route('/current/:userId')
	.get(LessonController.getAllByDate);

router.route('/statistics/:userId')
	.get(LessonController.getAttendanceRate);

router.route('/crawl')
	.post(LessonController.sync);

// router.route('/single/:id')
// 	.get(LessonController.getSingleLesson);

export default router;

