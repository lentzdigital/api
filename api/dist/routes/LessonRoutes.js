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

router.route('/').post(_LessonController2.default.addAttendee);

router.route('/all/:userId').get(_LessonController2.default.getAll);

router.route('/current/:userId').get(_LessonController2.default.getAllByDate);

router.route('/statistics/:userId').get(_LessonController2.default.getAttendanceRate);

router.route('/crawl').post(_LessonController2.default.sync);

exports.default = router;