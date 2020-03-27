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

// basic typeDef
const typeDefs = gql`
enum UserType {
    TEACHER
    STUDENT
}

type Subject {
    name: String!
    photoUrl: String
    grade: String
}

type User {
    _id: ID!
    fullName: String!
    phone: String!
    userType: UserType!
    password: String
    grade: String
    subjects: [Subject]
}

input UserInput {
    fullName: String!
    phone: String!
    password: String!
    confirmPassword: String!
}

type Query {
    login(phone: String!, password: String): User!
    getTeachers(firstTen: Boolean,grade: String, name: String): [User]!
    getTeacher(id: ID!) : User
    getSubjects(grade: String) : [Subject]!
}

type RegisterOutput {
    user: User!
    token : String!
}

type Mutation {
    registerTeacher(data: UserInput!) : RegisterOutput!
    registerStudent(data: UserInput!) : RegisterOutput!
}
`;

const grades = [
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    '1st prep',
    '2nd prep',
    '3rd prep',
    '1st secondry',
    '2nd secondry',
    '3rd secondry'
];

// mocking layer
const mocks = {
    User: () => ({
        _id: casual._uuid(),
        fullName: casual._first_name() + ' ' + casual._last_name(),
        phone: casual._phone,
        userType: casual.random_element(['STUDENT', 'TEACHER']),
        password: casual._password,
        grade: casual.random_element(grades),
    }),
    RegisterOutput: () => ({
        token: casual._uuid(),
    }),
    Subject: () => ({
        name: casual.random_element(['English', 'Arabic', 'Math', 'Science', 'Psychology']),
        photoUrl: casual._url(),
        grade: casual.random_element(grades)
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
