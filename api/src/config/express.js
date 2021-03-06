import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from '../routes/index';

const app = express();

app.use(session({
	secret: 'secretkey',
	resave: true,
	saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true 
}));

app.use(morgan('dev'));

app.use('/api', routes);

export default app;