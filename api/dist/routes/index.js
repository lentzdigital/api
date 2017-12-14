'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserRoutes = require('./UserRoutes');

var _UserRoutes2 = _interopRequireDefault(_UserRoutes);

var _LessonRoutes = require('./LessonRoutes');

var _LessonRoutes2 = _interopRequireDefault(_LessonRoutes);

var _AuthMiddleware = require('../middlewares/AuthMiddleware');

var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/test-server', function (req, res) {
  return res.send('OK');
});

router.use('/lesson', [_AuthMiddleware2.default], _LessonRoutes2.default);
router.use('/user', _UserRoutes2.default);

exports.default = router;