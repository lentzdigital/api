import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from '../routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true 
}));

app.use(morgan('dev'));

app.use('/api', routes);

export default app;