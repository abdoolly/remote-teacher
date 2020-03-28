import { ApolloServer, gql } from 'apollo-server-express';
import casual from 'casual';
import userResolvers from '../../users/users.resolvers';
import { userTypeDef } from '../../users/users.schema';
import { fromHeaderOrQuerystring, verifyJWT } from '../jwt';
import { prisma } from '../prisma-client';
import { AuthDirective, UpperCaseDirective } from './directives/auth.directive';

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
`;

// apollo server here
const apolloServer = new ApolloServer({
    typeDefs: [basicTypeDef, userTypeDef],
    // mocks,
    resolvers: [userResolvers],
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
    }
});

export default apolloServer;