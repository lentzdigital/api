'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = verifyToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyToken(req, res, next) {
	var token = req.headers['x-access-token'];

	if (!token) return res.status(403).send({
		auth: false,
		message: 'No token provided.'
	});

	_jsonwebtoken2.default.verify(token, _auth2.default.secret, function (err, decoded) {
		if (err) return res.status(500).send({
			auth: false,
			message: 'Failed to authenticate token.'
		});

		req.userId = decoded.id;
		next();
	});
}