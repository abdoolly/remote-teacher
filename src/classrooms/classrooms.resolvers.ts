import { UserInputError } from 'apollo-server';
import { prisma } from "../config/prisma-client";
import { pipeP } from "../utils/functional-utils";
import { convertToResolverPipes, GQLResolver, isAuthenticated, resolverPipe } from "../utils/general-utils";
import * as i from "./classrooms.interfaces";

const getClassrooms: GQLResolver<i.QueryGetClassroomsArgs> = ({
    args: { first, subject, teacher, grade } = {},
    context: { prisma }
}) => {
    return prisma.classrooms({
        first: first || undefined,
        where: {
            // handling case user did not send subject 
            subject: subject ? {
                _id: subject,
                grade
            } : undefined,

            // handling case user did not send teacher 
            teacher: teacher ? {
                _id: teacher
            } : undefined
        }
    });
};

const getClassroom: GQLResolver<i.QueryGetClassroomArgs> = async ({
    args: { classroom: classroomId } = {},
    context: { prisma }
}) => {
    const classroom = await prisma.classroom({ _id: classroomId });
    if (!classroom)
        throw new UserInputError('Classroom not found');

    return classroom;
};

const getStudentClassrooms: GQLResolver<i.QueryGetStudentClassroomsArgs> = async ({
    args: { } = {},
    context: { prisma, user }
}) => {
    // get student classrooms
    const studentClassrooms = await prisma.user({ _id: user._id }).studentClassrooms();

    if (!studentClassrooms)
        throw new UserInputError('No Classrooms found');

    return studentClassrooms || [];
};

const createClassroom: GQLResolver<i.MutationCreateClassroomArgs> = async ({
    args: { data },
    context: { prisma, user }
}) => {

    console.log('createClassroom', data);
    console.log('user', user);

    const classroom = await prisma.createClassroom({
        teacher: { connect: { _id: user._id } },
        cost: data.cost,
        students: data.students && data.students.length ? {
            connect: [...data.students.map((_id) => ({ _id }))]
        } : undefined,
        subject: {
            connect: { _id: data.subject }
        },
        scheduale: data.scheduale ? {
            create: [
                ...data.scheduale.map(
                    ({ date, durationInMin, endTime, startTime }) =>
                        ({ date, durationInMin, endTime, startTime }))
            ]
        } : undefined
    });

    console.log('classroom', classroom);

    return classroom;
};

const updateClassroom: GQLResolver<i.MutationUpdateClassroomArgs> = async () => { };

const addStudentInClassroom: GQLResolver<i.MutationAddStudentInClassroomArgs> = async () => { };

const students: GQLResolver<any> = function ({ root }) {
    console.log('arguments for students', root);
    return prisma.classroom({ _id: root._id }).students();
};

const subject: GQLResolver<any> = function ({ root }) {
    console.log('arguments for subject', arguments);
    return prisma.classroom({ _id: root._id }).subject();
}

const teacher: GQLResolver<any> = ({ root, context: { prisma }, info }) => {
    console.log('info', info);
    return prisma.classroom({ _id: root._id }).teacher();
}

export const classroomResolvers = convertToResolverPipes({
    Query: {
        getClassrooms,
        getClassroom,
        getStudentClassrooms,
    },
    Mutation: {
        createClassroom: pipeP([isAuthenticated, createClassroom]),
        updateClassroom,
        addStudentInClassroom,
    },
    Classroom: {
        students: resolverPipe(students),
        subject: resolverPipe(subject),
        teacher: resolverPipe(teacher)
    }
});