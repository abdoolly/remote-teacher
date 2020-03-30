import { UserInputError } from 'apollo-server';
import { prisma } from "../config/prisma-client";
import { pipeP } from "../utils/functional-utils";
import { convertToResolverPipes, GQLResolver, isAuthenticated, resolverPipe, toIdsObject } from "../utils/general-utils";
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

const createClassroom: GQLResolver<i.MutationCreateClassroomArgs> = ({
    args: { data },
    context: { prisma, user }
}) => {
    return prisma.createClassroom({
        teacher: { connect: { _id: user._id } },
        cost: data.cost,
        students: data.students && data.students.length ? {
            connect: [...data.students.map((_id) => ({ _id }))]
        } : undefined,
        subject: {
            connect: { _id: data.subject }
        },
        schedule: data.schedule ? {
            create: [
                ...data.schedule.map(
                    ({ date, durationInMin, endTime, startTime }) =>
                        ({ date, durationInMin, endTime, startTime }))
            ]
        } : undefined
    });
};

const updateClassroom: GQLResolver<i.MutationUpdateClassroomArgs> = async ({
    args: { data, classroom } = {},
    context: { prisma }
}) => {
    // handling if user send both options at the same time 
    if (data?.schedule?.add && data?.schedule?.set)
        throw new UserInputError('you should send either schedule.add or schedule.set not both');

    if (data?.schedule?.set) {
        await prisma.updateClassroom({
            data: { schedule: { deleteMany: {} } },
            where: { _id: classroom }
        })
    }

    return prisma.updateClassroom({
        data: {
            teacher: data?.teacher ? { connect: { _id: data?.teacher } } : undefined,
            cost: data?.cost,
            subject: data?.subject ? { connect: { _id: data?.subject } } : undefined,
            students: data?.students ? {
                connect: toIdsObject(data?.students?.add),
                set: toIdsObject(data?.students?.set)
            } : undefined,
            schedule: { create: data?.schedule?.add || data?.schedule?.set }
        },
        where: { _id: classroom }
    });
};

const addStudentInClassroom: GQLResolver<i.MutationAddStudentInClassroomArgs> = ({
    args: { classroom } = {},
    context: { prisma, user }
}) =>
    prisma.updateClassroom({
        data: { students: { connect: { _id: user._id } } },
        where: { _id: classroom }
    });

const students: GQLResolver<any> = ({ root, context: { prisma } }) =>
    prisma.classroom({ _id: root._id }).students();

const subject: GQLResolver<any> = ({ root, context: { prisma } }) =>
    prisma.classroom({ _id: root._id }).subject();

const teacher: GQLResolver<any> = ({ root, context: { prisma } }) =>
    prisma.classroom({ _id: root._id }).teacher();

export const classroomResolvers = convertToResolverPipes({
    Query: {
        getClassrooms,
        getClassroom,
        getStudentClassrooms,
    },
    Mutation: {
        createClassroom: pipeP([isAuthenticated, createClassroom]),
        updateClassroom: pipeP([isAuthenticated, updateClassroom]),
        addStudentInClassroom: pipeP([isAuthenticated, addStudentInClassroom]),
    },
    Classroom: {
        students: resolverPipe(students),
        subject: resolverPipe(subject),
        teacher: resolverPipe(teacher)
    }
});