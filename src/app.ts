import { ApolloServer, gql } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import * as casual from 'casual';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// any normal apis should come here

app.use(express.static(path.join(__dirname, 'public')));

const typeDefs = gql`
enum UserType {
    TEACHER
    STUDENT
}

type User {
    fullName: String!
    phone: String!
    userType: UserType!
    password: String!
}

type Query {
    me: User
}
`;

const mocks = {
    User: () => ({
        type: casual.random_element(['STUDENT', 'TEACHER'])
    })
};

// apollo server here
const server = new ApolloServer({
    typeDefs: [typeDefs],
    mocks,
    resolvers: {},
    formatError: (err) => {
        console.log('\x1b[41m', 'Error:', err.message);
        if (err.extensions)
            console.log('\x1b[41m', err.extensions.exception.stacktrace.join('\n'));

        return err;
    }
});

// applying middleware
server.applyMiddleware({
    app,
    cors: true,
    path: '/graphql'
});


module.exports = app;
