import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default function verifyToken(req, res, next) {
	let token = req.headers['x-access-token'];

	if(!token) return res.status(403).send({ 
		auth: false, 
		message: 'No token provided.' 
	});

	jwt.verify(token, authConfig.secret, function(err, decoded) {
		if(err) return res.status(500).send({ 
			auth: false, 
			message: 'Failed to authenticate token.' 
		});

	    req.userId = decoded.id;
	    next();
	});
}