import axios from 'axios';
import TicketModel from '../models/TicketModel';

export default class TicketController {
	static createNewTicket(req, res, next) {
		const model = new TicketModel({
			'userId': req.body.userId,
			'lessonId': req.body.lessonId,
			'subject': req.body.subject,
			'messages': [{
				'message': req.body.message
			}]
		});

		model.save()
		    .then(savedTicket => res.json(savedTicket))
		    .catch(e => next(e));
	}

	static addNewMessageToTicket(req, res, next) {
		const newMessage = {
			'message': req.body.message
		}

		TicketModel.findByIdAndUpdate(
		        req.body.ticketId,
		        {
		        	$push: {
		        		'messages': newMessage
		        	}
		        },
		        {
		        	safe: true, 
		        	upsert: true, 
		        	new: true
		        }, (error, model) => {
		            if(error) console.log(error);
		            res.json(model);
		        }
		    );
	}

	static getAllTickets(req, res, next) {
		TicketModel.find({
			'userId': req.headers['user-id']
		}, (error, tickets) => {
			res.json(tickets);
		});
	}
}