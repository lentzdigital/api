import axios from 'axios';
import LessonModel from '../models/LessonModel';

const request = axios.create({
	'baseURL': 'https://api.webuntis.dk/api/',
	'headers': {
		'x-api-key': 'b4be51b712295d7e9dd122239a1826eb3d176a3d'
	} 
});

export default class LessonController {
	/**
	 * Add userId to attendees subdocument on lesson
	 * @param {Object}   req  Request object, contains userId and lessonId.
	 * @param {Object}   res  Response object, sends a response with updated model.
	 * @param {Function} next Next function for middlewares
	 */
	static addAttendee(req, res, next) {
		let userId   = req.body.userId,
		lessonId = req.body.lessonId;

		LessonModel.findByIdAndUpdate(lessonId, {
			$push: {
				'attendees': userId
			}
		}, {
			safe: true, 
			upsert: true, 
			new: true
		}, (error, model) => {
			if(error) console.log(error);
			res.json(model);
		});
	}

	static getAllByDate(req, res, next) {
		let morning = new Date();
		morning.setHours(0, 0, 0, 0);

		let night = new Date();
		night.setHours(23, 59, 59, 59);

		LessonModel.find({
			start: {
				$gte: morning,
				$lte: night
			}
		}, (error, objects) => {
			if(error) return console.log(error);

			let newObjects = objects.map((item, i, arr) => {
				return Object.assign({}, item._doc, {
					isTracked: (typeof item.attendees !== undefined && item.attendees.includes(req.params.userId))
				});
			});

			res.json(newObjects);
		});
	}

	static getAll(req, res, next) {
		LessonModel.find({ 
			groupId: '2353'
		}, (error, objects) => {
			if(error) return console.log(error);

			let newObjects = objects.map((item, i, arr) => {
				return Object.assign({}, item._doc, {
					isTracked: (typeof item.attendees !== undefined && item.attendees.includes(req.params.userId))
				});
			});

			res.json(newObjects);
		});
	}

	/**
	 * Counts all lessons until today
	 * @param  {Function} callback Callback function
	 */
	static countAllLessons(callback) {
		let now = new Date();

		LessonModel.find({ 
			groupId: '2353',
			start: {
				$lt: now
			}
		})
		.count((error, count) => {
			console.log(count);
			callback(count);
		});
	}

	/**
	 * Count all the lessons attended by userId
	 * @param  {Number}   userId   userId
	 * @param  {Function} callback Callback function
	 */
	static countAllLessonsAttended(userId, callback) {
		LessonController.countAllLessons((all) => {
			LessonModel.find({ 
				groupId: '2353',
				attendees: userId
			})
			.count((error, count) => {
				console.log(count);
				callback(count, all);
			});
		})
	}

	/**
	 * Get's attendance rate by percentage
	 * @param  {Object}   req  Request object, with get parameter userId
	 * @param  {Object}   res  Response object, sends response back as json
	 * @param  {Function} next Function for next in middlewares
	 */
	static getAttendanceRate(req, res, next) {
		LessonController.countAllLessonsAttended(req.params['userId'], (count, all) => {
			let percentage = (count / all) * 100;
			res.json({
				"statistics": percentage
			});
		});
	}

	/**
	 * Calls the webuntis api to convert subject id to subject longname
	 * @param  {Number} id untis_id of subjects
	 * @return {Promise}    Resolves null if id is undefined, if not undefined it resolves longname of subject
	 */
	 static getSubjectName(id) {
	 	if(typeof id === 'undefined') {
	 		return Promise.resolve(null);
	 	}

	 	return new Promise((resolve, reject) => {
	 		request.get('subjects/' + id)
	 		.then((response) => {
	 			resolve(response.data.longname);
	 		})
	 		.catch((error) => {
	 			reject(error);
	 		});
	 	});
	 }

	/**
	 * Calls the webuntis api to convert teacher id to teacher longname
	 * @param  {Number} id untis_id of teachers
	 * @return {Promise}    Resolves null if id is undefined, if not undefined it resolves longname of teacher
	 */
	 static getTeacherName(id) {
	 	if(typeof id === 'undefined') {
	 		return Promise.resolve(null);
	 	}

	 	return new Promise((resolve, reject) => {
	 		request.get('teachers/' + id)
	 		.then((response) => {
	 			resolve(response.data.longname);
	 		})
	 		.catch((error) => {
	 			reject(error);
	 		});
	 	});
	 }

	/**
	 * Calls the webuntis api to convert location id to location longname
	 * @param  {Number} id untis_id of locations
	 * @return {Promise}    Resolves null if id is undefined, if not undefined it resolves longname of location
	 */
	 static getLocationName(id) {
	 	if(typeof id === 'undefined') {
	 		return Promise.resolve(null);
	 	}

	 	return new Promise((resolve, reject) => {
	 		request.get('locations/' + id)
	 		.then((response) => {
	 			resolve(response.data.longname);
	 		})
	 		.catch((error) => {
	 			reject(error);
	 		});
	 	});
	 }

	/**
	 * Iterates over array of lesson objects, and converts subject id, teacher id and location id to strings
	 * @param  {Array} array Array of lesson objects
	 * @return {Promise}       Resolves a new array with longname instead of id's
	 */
	 static convertToString(array) {
	 	return new Promise((finaleResolve, finalReject) => {
	 		let lessons = [];

	 		array.map((item, i, arr) => {
	 			lessons.push(new Promise((resolve, reject) => {

	 				Promise.all([
	 					LessonController.getSubjectName(item.subjects[0]), 
	 					LessonController.getTeacherName(item.teachers[0]), 
	 					LessonController.getLocationName(item.locations[0])
	 					])
	 				.then(([subject, teacher, location]) => {
	 					resolve({
	 						'_id': item.untis_id,
	 						'groupId': 2353,
	 						'subject': subject,
	 						'teacher': teacher,
	 						'location': location,
	 						'start': item.start,
	 						'end': item.end 
	 					});
	 				});
	 			}));
	 		});

	 		Promise.all(lessons).then(lessonValues => finaleResolve(lessonValues));
	 	});
	 }

	/**
	 * Syncs mongodb with webuntis
	 */
	 static sync(req, res, next) {
	 	request.get('groups/2353/lessons')
	 	.then((response) => {
	 		let lessonIds = [];

	 		response.data.forEach((item) => {
	 			lessonIds.push(item.untis_id);
	 		});

	 		return lessonIds;
	 	})
	 	.then((lessonIds) => {
	 		let url = 'lessons?untis_ids=';

	 		lessonIds.forEach((item, index, array) => {
	 			if (index === array.length - 1) { 
	 				url += item;
	 			} else {
	 				url += item + ',';
	 			}
	 		});

	 		return url;
	 	})
	 	.then((url) => {
	 		request.get(url)
	 		.then((response) => {
	 			LessonController.convertToString(response.data)
	 			.then((lessons) => {
	 				LessonModel.insertMany(lessons)
	 				.then(insertedLessons => res.json(insertedLessons))
	 				.catch(e => next(e));
	 			});
	 		})
	 		.catch((error) => {
	 			console.log(error);
	 		});
	 	})
	 	.catch((error) => {
	 		console.log(error);
	 	});
	 }
	}