import { gql } from "apollo-server";

export const classroomsTypeDef = gql`
input CreateClassroomDate {
    startTime: DateTime!
    endTime: DateTime!
    date: DateTime
    durationInMin: Int
}

input CreateClassroomInput {
    teacher: ID
    students: [ID!]
    subject: ID
    cost: Float
    schedule: [CreateClassroomDate!]
}

input ClassroomUpdateStudents {
    # replace those Ids instead of the old ones
    set: [ID]

    # add some Ids to the already existing student Ids 
    add: [ID]  
}

input classroomDateUpdateManyInput {
    # replace those Ids instead of the old ones
    set: [CreateClassroomDate!]

    # add some Ids to the already existing student Ids 
    add: [CreateClassroomDate!]
}

input ClassroomUpdateInput {
    teacher: ID
    students: ClassroomUpdateStudents
    subject: ID
    schedule: classroomDateUpdateManyInput
    cost: Float
}

type classroomDate {
    _id: ID!
    startTime: DateTime
    endTime: DateTime
    date: DateTime
    durationInMin: Int
}

type Classroom {
    _id: ID!
    teacher: User
    students: [User]!
    subject: Subject
    cost: Float
    schedule: [classroomDate]!
}

extend type Query {
    getClassrooms(teacher: ID, first:Int, subject: ID,grade: String): [Classroom]!
    getClassroom(classroom: ID!): Classroom!
    getStudentClassrooms: [Classroom]!
}

extend type Mutation {
    createClassroom(data: CreateClassroomInput!): Classroom!
    updateClassroom(data: ClassroomUpdateInput!, classroom: ID): Classroom
    addStudentInClassroom(classroom: ID!): Boolean
}
`;