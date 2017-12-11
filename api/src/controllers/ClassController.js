import ClassModel from '../models/ClassModel';

export default class ClassController {
	static create(req, res, next) {
		const model = new ClassModel({
			'userId': parseInt(req.body.userId),
			'classId': parseInt(req.body.classId)
		});

		model.save()
			.then(savedClass => res.json(savedClass))
			.catch(e => next(e));
	}

	static createMessage(req, res, next) {
		let message = {
			'message': req.body.message,
			'byAdmin': req.body.byAdmin
		};

		ClassModel.findOneAndUpdate({'_id': req.params.id}, {
			$push: {
				messages: message
			}
		}, {
			safe: true, 
			upsert: true
		})
		.then(updatedMessage => res.json(updatedMessage))
		.catch(e => next(e));
	}

	static createRecord(req, res, next) {
		let record = {
			'startedAt': req.body.message,
			'endedAt': req.body.byAdmin
		};

		ClassModel.findOneAndUpdate({'_id': req.params.id}, {
			$push: {
				records: record
			}
		}, {
			safe: true, 
			upsert: true
		})
		.then(updatedRecord => res.json(updatedRecord))
		.catch(e => next(e));
	}
}

// function create(req, res, next) {
// 	const model = new ClassModel({
// 		'userId': parseInt(req.body.userId),
// 		'classId': parseInt(req.body.classId)
// 	});

// 	model.save()
// 		.then(savedClass => res.json(savedClass))
// 		.catch(e => next(e));
// }

// function createMessage(req, res, next) {
// 	let message = {
// 		'message': req.body.message,
// 		'byAdmin': req.body.byAdmin
// 	};

// 	ClassModel.findOneAndUpdate({'_id': req.params.id}, {
// 		$push: {
// 			messages: message
// 		}
// 	}, {
// 		safe: true, 
// 		upsert: true
// 	})
// 	.then(updatedMessage => res.json(updatedMessage))
// 	.catch(e => next(e));
// }

// function createRecord(req, res, next) {
// 	let record = {
// 		'startedAt': req.body.message,
// 		'endedAt': req.body.byAdmin
// 	};

// 	ClassModel.findOneAndUpdate({'_id': req.params.id}, {
// 		$push: {
// 			records: record
// 		}
// 	}, {
// 		safe: true, 
// 		upsert: true
// 	})
// 	.then(updatedRecord => res.json(updatedRecord))
// 	.catch(e => next(e));
// }

// export default {
// 	create,
// 	createMessage
// };