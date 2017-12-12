import express from 'express';
import TrackController from '../controllers/TrackController';

const router = express.Router();

router.route('/')
	.post(TrackController.newTrack);

export default router;

