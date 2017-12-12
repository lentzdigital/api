import axios from 'axios';
import TrackModel from '../models/TrackModel';

export default class TrackController {
	static newTrack(req, res, next) {
		const model = new TrackModel({
			'userId': req.body.userId,
			'lessonId': req.body.lessonId,
			'tracks': [{
				'start': req.body.start
			}]
		});

		model.save()
		    .then(savedTrack => res.json(savedTrack))
		    .catch(e => next(e));
	}
}