import UserModel from '../models/UserModel';

export default class UserController {
	static create(req, res, next) {
		const user = new UserModel({
			'username': req.body.username,
			'password': req.body.password,
			'groupdId': req.body.groupdId
		});

		user.save()
		    .then(savedUser => res.json(savedUser))
		    .catch(e => next(e, user));
	}
}