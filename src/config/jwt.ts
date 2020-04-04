import { sign, verify } from 'jsonwebtoken';
import * as _ from 'ramda';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from 'apollo-server';

const secret: any = process.env.secret;

export const fromHeaderOrQuerystring = (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

export const signJWT = (payload: any): string => sign(payload, secret);

export const verifyJWT = (token: string): any => verify(token, secret);

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    let user;
    const token = fromHeaderOrQuerystring(req);
    if (token)
        user = verifyJWT(token);

    if (!token || !user)
        throw new AuthenticationError('You are not authenticated');

    // putting the user in the req object
    req['user'] = user;

    return next();
}