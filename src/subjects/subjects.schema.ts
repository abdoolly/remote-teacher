import { gql } from "apollo-server";

export const subjectsTypeDef = gql`
type Grades {
    en_name: String!
    ar_name: String
}

type Subject {
    _id: ID!
    name: String!
    photoUrl: String
    grade: String 
    ar_name: String
}

input CreateSubjectInput {
    name: String!
    photoUrl: String
    grade: String 
    ar_name: String
}

extend type Query {
    getGrades : [Grades]!
    getSubjects(grade: String) : [Subject]!
}

extend type Mutation {
    createSubject(subject: CreateSubjectInput!) : Subject!
}
`;