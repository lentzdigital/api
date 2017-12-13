'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _TrackController = require('../controllers/TrackController');

var _TrackController2 = _interopRequireDefault(_TrackController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(_TrackController2.default.newTrack).put(_TrackController2.default.updateTrack);

exports.default = router;