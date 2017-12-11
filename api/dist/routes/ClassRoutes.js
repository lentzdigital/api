'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ClassController = require('../controllers/ClassController');

var _ClassController2 = _interopRequireDefault(_ClassController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(_ClassController2.default.create).get(function (req, res, next) {
	res.send('class');
});

router.route('/:id/create-message').post(_ClassController2.default.createMessage);

router.route('/:id/create-record').post(_ClassController2.default.createRecord);

exports.default = router;