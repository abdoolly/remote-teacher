import { ApolloServer, gql } from 'apollo-server-express';
import casual from 'casual';
import { DateTimeResolver, EmailAddressResolver, ObjectIDResolver, URLResolver } from 'graphql-scalars';
import { classroomsTypeDef } from '../../classrooms/classrooms.schema';
import { subjectResolvers } from '../../subjects/subjects.resolvers';
import { subjectsTypeDef } from '../../subjects/subjects.schema';
import userResolvers from '../../users/users.resolvers';
import { userTypeDef } from '../../users/users.schema';
import { fromHeaderOrQuerystring, verifyJWT } from '../jwt';
import { prisma } from '../prisma-client';
import { UpperCaseDirective } from './directives/auth.directive';
import { classroomResolvers } from '../../classrooms/classrooms.resolvers';

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

const basicTypeDef = gql`
directive @upper on FIELD_DEFINITION

scalar DateTime
scalar EmailAddress
scalar URL
scalar ObjectID
`;

const scalarResolvers = {
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
    URL: URLResolver,
    ObjectID: ObjectIDResolver
};

// apollo server here
const apolloServer = new ApolloServer({
    typeDefs: [basicTypeDef, subjectsTypeDef, userTypeDef, classroomsTypeDef],
    // mocks,
    resolvers: [
        userResolvers,
        subjectResolvers,
        scalarResolvers,
        classroomResolvers,
    ],
    context: ({ req }) => {

        // JWT authentication
        let user;
        const token = fromHeaderOrQuerystring(req);
        if (token)
            user = verifyJWT(token);

        return {
            prisma,
            user
        };
    },
    schemaDirectives: {
        // auth: AuthDirective,
        upper: UpperCaseDirective
    },
    formatError: (err) => {
        console.log('\x1b[41m', 'Error:', err.message);
        if (err.extensions)
            console.log('\x1b[41m', err.extensions.exception.stacktrace.join('\n'));

        return err;
    },
    tracing: process.env.NODE_ENV === 'development' ? true : false
});

export default apolloServer;