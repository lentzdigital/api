/** Import mongoose */
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = global.Promise;

/** Import express config */
import app from './config/express';

mongoose.connect('mongodb://localhost:27017/absence', {
	useMongoClient: true,
	keepAlive: 1 
});

console.log(mongoose.connection.readyState);

app.listen(8888, () => {
	console.log('Listening on port 8888');
});
