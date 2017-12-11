'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ClassRoutes = require('./ClassRoutes');

var _ClassRoutes2 = _interopRequireDefault(_ClassRoutes);

var _LessonRoutes = require('./LessonRoutes');

var _LessonRoutes2 = _interopRequireDefault(_LessonRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/test-server', function (req, res) {
	return res.send('OK');
});

router.use('/class', _ClassRoutes2.default);
router.use('/lesson', _LessonRoutes2.default);

exports.default = router;