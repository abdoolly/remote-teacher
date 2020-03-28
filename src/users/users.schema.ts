import { gql } from "apollo-server-express";

export const userTypeDef = gql`
enum UserType {
    TEACHER
    STUDENT
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

type RegisterOutput {
    user: User!
    token : String!
}

input UserInput {
    fullName: String!
    phone: String!
    password: String!
    confirmPassword: String!
}

type LoginResult {
    user: User!
    token: String!
}

type Query {
    login(phone: String!, password: String): LoginResult!
    getTeachers(firstTen: Boolean,grade: String, name: String): [User]!
    getTeacher(id: ID!) : User
}

type Mutation {
    registerTeacher(data: UserInput!) : RegisterOutput!
    registerStudent(data: UserInput!) : RegisterOutput!
}
`;