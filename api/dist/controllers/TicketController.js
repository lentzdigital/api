'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _TicketModel = require('../models/TicketModel');

var _TicketModel2 = _interopRequireDefault(_TicketModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicketController = function () {
	function TicketController() {
		_classCallCheck(this, TicketController);
	}

	_createClass(TicketController, null, [{
		key: 'createNewTicket',
		value: function createNewTicket(req, res, next) {
			var model = new _TicketModel2.default({
				'userId': req.body.userId,
				'lessonId': req.body.lessonId,
				'subject': req.body.subject,
				'messages': [{
					'message': req.body.message
				}]
			});

			model.save().then(function (savedTicket) {
				return res.json(savedTicket);
			}).catch(function (e) {
				return next(e);
			});
		}
	}, {
		key: 'addNewMessageToTicket',
		value: function addNewMessageToTicket(req, res, next) {
			var newMessage = {
				'message': req.body.message
			};

			_TicketModel2.default.findByIdAndUpdate(req.body.ticketId, {
				$push: {
					'messages': newMessage
				}
			}, {
				safe: true,
				upsert: true,
				new: true
			}, function (error, model) {
				if (error) console.log(error);
				res.json(model);
			});
		}
	}, {
		key: 'getAllTickets',
		value: function getAllTickets(req, res, next) {
			_TicketModel2.default.find({
				'userId': req.headers['user-id']
			}, function (error, tickets) {
				res.json(tickets);
			});
		}
	}]);

	return TicketController;
}();

exports.default = TicketController;