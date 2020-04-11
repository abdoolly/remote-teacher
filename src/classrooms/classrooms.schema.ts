import { gql } from "apollo-server";

export const classroomsTypeDef = gql`
input CreateClassroomDate {
    startTime: String! @date(format: "h:mm a")
    endTime: String! @date(format: "h:mm a")
    date: String! @date
    durationInMin: Int
    video: Upload
}

input CreateClassroomInput {
    teacher: ID!
    students: [ID!]
    subject: ID
    cost: Float
    schedule: [CreateClassroomDate!]

    # this is something like Group A or Group B and it's totally optional
    tag: [String]
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

type Times {
    # classroom startTime in format hour:minutes AM/PM h:M TT
    startTime: String @date(format: "h:mm a")
    
    endTime: String @date(format: "h:mm a")
}

type classroomDate {
    _id: ID!

    # startTime and endTime of the classrooms 
    times: [Times!]

    # this the date of this classroom and it should be in format (yyyy-mm-dd) "1999-01-30" 
    date: String @date

    durationInMin: Int
    videoUrl: String
    encoding: String
}

type ClassroomStream {
    streamUrl: String!
}

type Classroom {
    _id: ID!
    teacher: User!
    students: [User]!
    subject: Subject
    cost: Float
    schedule: [classroomDate]!
}

extend type Query {
    getClassrooms(teacher: ID, first:Int, subject: ID,grade: String): [Classroom]!
    getClassroom(classroom: ID!): Classroom!
    getStudentClassrooms(today: Boolean): [Classroom]!
    getClassroomStreamUrl(scheduleId: ID) :ClassroomStream!
}

extend type Mutation {
    createClassroom(data: CreateClassroomInput!): Classroom!
    updateClassroom(data: ClassroomUpdateInput!, classroom: ID): Classroom
    addStudentInClassroom(classroom: ID!): [User!]!
    uploadClassroomVideo(scheduleId:ID!, video: Upload!): File!
}
`;