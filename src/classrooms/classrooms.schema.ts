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
    scheduale: [CreateClassroomDate!]
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
    scheduale: classroomDateUpdateManyInput
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
    scheduale: [classroomDate]!
}

extend type Query {
    getClassrooms(first:Int, teacher: ID, subject: ID): [Classroom]!
    getClassroom(classroom: ID,teacher: ID): Classroom
    getStudentClassrooms(student: ID): Classroom
}

extend type Mutation {
    createClassroom(data: CreateClassroomInput!): Classroom!
    updateClassroom(data: ClassroomUpdateInput!, classroom: ID): Classroom
    addStudentInClassroom(student: ID, classroom: ID): Boolean
}
`;