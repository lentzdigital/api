import UserModel from '../models/UserModel';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../config/auth';

export default class UserController {
	static createNewUser(req, res, next) {
		let hash = bcrypt.hashSync(req.body.password, 8);

		UserModel.create({
			'name': req.body.name,
			'email': req.body.email,
			'password': hash,
			'groupId': req.body.groupId
		}, (error, user) => {
			if(error) return res.status(500).send('There was a problem registering the user.');

			let token = jwt.sign({ id: user._id }, authConfig.secret, {
				expiresIn: 86400
			});

			res.status(200).send({ 
				auth: true, 
				token: token 
			});
		})
	}

	static getToken(req, res) {
		let token = req.headers['x-access-token'];

		if(!token) return res.status(401).send({ 
			auth: false, 
			message: 'No token provided.' 
		});

		jwt.verify(token, authConfig.secret, function(err, decoded) {
			if (err) return res.status(500).send({ 
				auth: false, 
				message: 'Failed to authenticate token.' 
			});
			res.status(200).send(decoded);
		});
	}

	static login(req, res) {
		UserModel.findOne({ email: req.body.mail }, function (err, user) {
		    if(err) return res.status(500).send('Error on the server.');
		    if(!user) return res.status(404).send('No user found.');

		    var passwordIsValid = bcrypt.compareSync(req.body.pass, user.password);

		    if(!passwordIsValid) return res.status(401).send({ 
		    	auth: false, 
		    	token: null 
		    });

		    var token = jwt.sign({
		    	id: user._id 
		    }, authConfig.secret, {
		      	expiresIn: 86400 // expires in 24 hours
		    });

		    res.status(200).send({ 
		    	auth: true, 
		    	token: token,
		    	userId: user._id
		    });
		});
	}
}