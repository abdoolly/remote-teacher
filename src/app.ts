import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/test', (req: Request, res: any) => res.send('hello world'));

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
