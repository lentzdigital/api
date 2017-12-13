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

	static updateTrack(req, res, next) {
		const newTrack = {
			'start': req.body.start
		}

		TrackModel.findByIdAndUpdate(
		        req.body.trackId,
		        {
		        	$push: {
		        		'tracks': newTrack
		        	}
		        },
		        {
		        	safe: true, 
		        	upsert: true, 
		        	new: true
		        }, (error, model) => {
		            if(error) console.log(error);
		            res.json(model);
		        }
		    );
	}
}