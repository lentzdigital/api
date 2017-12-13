import express from 'express';
import TrackController from '../controllers/TrackController';

const router = express.Router();

router.route('/')
	.post(TrackController.newTrack)
	.put(TrackController.updateTrack);

export default router;

