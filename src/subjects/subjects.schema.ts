import { gql } from "apollo-server";

export const subjectsTypeDef = gql`
extend type Query {
    getGrades : [String]!
    getSubjects(grade: String) : [Subject]!
}
`;