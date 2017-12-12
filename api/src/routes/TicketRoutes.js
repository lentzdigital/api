import express from 'express';
import TicketController from '../controllers/TicketController';

const router = express.Router();

router.route('/')
	.get(TicketController.getAllTickets)
	.post(TicketController.createNewTicket);


router.route('/message')
	.put(TicketController.addNewMessageToTicket);

export default router;

