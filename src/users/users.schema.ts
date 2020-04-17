import { gql } from "apollo-server-express";

export const userTypeDef = gql`
enum UserType {
    TEACHER
    STUDENT
}

type User {
    _id: ID!
    fullName: String! 
    phone: String
    userType: UserType!
    password: String
    grade: String
    email: String
    profileImg: String
    subjects: [Subject]
    studentClassrooms: [Classroom]
    teacherClassrooms: [Classroom]
    device_token: String
    facebook_id: String
    google_id: String
    createdAt: DateTime! 
    updatedAt: DateTime! 
}

type RegisterOutput {
    user: User!
    token : String!
}

input UserInput {
    fullName: String!
    phone: String
    password: String
    confirmPassword: String
    grade: String
    email: String
    profileImg: Upload
    device_token: String
    facebook_id: String
    google_id: String
}

input RegisterTeacherInput {
    fullName: String!
    phone: String
    password: String
    confirmPassword: String
    grade: String
    email: String
    subjects: [ID!]
    profileImg: Upload
    device_token: String
    facebook_id: String
    google_id: String
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
    registerTeacher(data: RegisterTeacherInput!) : RegisterOutput!
    registerStudent(data: UserInput!) : RegisterOutput!
}
`;