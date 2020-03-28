import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    console.log(dotenvResult.error);
}

import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import apolloServer from './config/graphql/graphql';


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// any normal apis should come here

app.use(express.static(path.join(__dirname, 'public')));

// applying middleware
apolloServer.applyMiddleware({
    app,
    cors: true,
    path: '/graphql'
});

export default app;
