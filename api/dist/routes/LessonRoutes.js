'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _LessonController = require('../controllers/LessonController');

var _LessonController2 = _interopRequireDefault(_LessonController);

var _WebunitsController = require('../controllers/WebunitsController');

var _WebunitsController2 = _interopRequireDefault(_WebunitsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/crawl').post(_LessonController2.default.getLessonIds);

exports.default = router;