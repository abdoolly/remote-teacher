import { gql } from "apollo-server";

export const subjectsTypeDef = gql`
type Grades {
    en_name: String!
    ar_name: String
}

extend type Query {
    getGrades : [Grades]!
    getSubjects(grade: String) : [Subject]!
}
`;