'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _LessonController = require('../controllers/LessonController');

var _LessonController2 = _interopRequireDefault(_LessonController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_LessonController2.default.getAll).post(_LessonController2.default.addAttendee);

router.route('/current/:userId').get(_LessonController2.default.getAllByDate);

router.route('/count').get(_LessonController2.default.countAllLessons);

router.route('/statistics/:userId').get(_LessonController2.default.getAttendanceRate);

router.route('/crawl').post(_LessonController2.default.sync);

// router.route('/single/:id')
// 	.get(LessonController.getSingleLesson);

exports.default = router;