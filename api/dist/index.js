'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import mongoose */
_mongoose2.default.Promise = global.Promise;

/** Import express config */


_mongoose2.default.connect('mongodb://localhost:27017/absence', {
	useMongoClient: true,
	keepAlive: 1
});

console.log(_mongoose2.default.connection.readyState);

_express2.default.listen(8888, function () {
	console.log('Listening on port 8888');
});