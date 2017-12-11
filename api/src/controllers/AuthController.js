// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import authConfig from '../config/auth';
// import UserModel from '../models/UserModel';

// export default class AuthController {
// 	static createErrorHandling(e, user) {
// 		if(e) return res.status(500).send("Error - creating a new user.");

// 		const token = jwt.sign({ 
// 			'id': user._id 
// 		}, authConfig.secret, {
// 			expiresIn: 86400
// 		});
// 		    // create a token
// 		    var token = jwt.sign({ id: user._id }, config.secret, {
// 		      expiresIn: 86400 // expires in 24 hours
// 		    });
// 		    res.status(200).send({ auth: true, token: token });
// 	}
// }