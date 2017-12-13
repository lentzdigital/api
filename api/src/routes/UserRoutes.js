import express from 'express';
import UserController from '../controllers/UserController';
import verify from '../middlewares/AuthMiddleware';

const router = express.Router();

router.route('/')
	.post(UserController.createNewUser)
	.get(UserController.getToken);

router.route('/login')
	.post(UserController.login);

export default router;
