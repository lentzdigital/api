'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _TicketController = require('../controllers/TicketController');

var _TicketController2 = _interopRequireDefault(_TicketController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_TicketController2.default.getAllTickets).post(_TicketController2.default.createNewTicket);

router.route('/message').put(_TicketController2.default.addNewMessageToTicket);

exports.default = router;