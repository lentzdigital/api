import express from 'express';
import ClassController from '../controllers/ClassController';

const router = express.Router();

router.route('/')
	.post(ClassController.create)
	.get(function(req, res, next) {
		res.send('class');
	});

router.route('/:id/create-message')
	.post(ClassController.createMessage);

router.route('/:id/create-record')
	.post(ClassController.createRecord);

export default router;

