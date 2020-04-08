import { UserInputError } from 'apollo-server';
import * as fs from 'fs';
import moment from 'moment';
import * as _ from 'ramda';
import { promisify } from 'util';
import { prisma } from '../config/prisma-client';
import { VIDEO_UPLOAD_LOCATION } from '../config/upload';
import { pipeP } from "../utils/functional-utils";
import { convertToResolverPipes, getExtensionFromFileName, GQLResolver, isAuthenticated, isTeacher, OnlyDate, OnlyTime, randomString, resolverPipe, toIdsObject } from "../utils/general-utils";
import { makeVideoStreamKey } from '../utils/protection';
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
    args: { today } = {},
    context: { prisma, user }
}) => {

    // get student classrooms
    const studentClassrooms = await prisma.user({ _id: user._id }).studentClassrooms({
        ...(today ? {
            where: {
                schedule_some: {
                    date: OnlyDate(moment().format('YYYY-MM-DD')),
                    endTime_gte: OnlyTime(moment().format('h:mm a')),
                }
            }
        } : {})
    });

    // if there are not classrooms then just return an error that there is no classrooms 
    if (!studentClassrooms.length)
        throw new UserInputError('No Classrooms found');

    // if today is true then filter the schedules of the classrooms
    // here we are filtering the classroom schedule
    // only get the classrooms schedules of today only
    if (today) {
        for (let classroom of studentClassrooms) {
            const schedule = classroom.schedule as any;
            classroom.schedule = schedule.filter(({ date }) =>
                moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'));
        }
    }

    return studentClassrooms;
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
                    ({ date, durationInMin, endTime, startTime, videoUrl, encoding }) =>
                        ({
                            date: OnlyDate(date),
                            durationInMin,
                            endTime: OnlyTime(endTime),
                            startTime: OnlyTime(startTime),
                            videoUrl,
                            encoding
                        }))
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

    const convertStringToDates = _.map(({ endTime, startTime, date, ...otherItems }: i.CreateClassroomDate) => ({
        ...otherItems,
        endTime: OnlyTime(endTime),
        startTime: OnlyTime(startTime),
        date: OnlyDate(date),
    }));

    if (data?.schedule?.set) {
        await prisma.updateClassroom({
            data: { schedule: { deleteMany: {} } },
            where: { _id: classroom }
        })
        data.schedule.set = convertStringToDates(data.schedule.set);
    }

    if (data?.schedule?.add)
        data.schedule.add = convertStringToDates(data.schedule.add);

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

const addStudentInClassroom: GQLResolver<i.MutationAddStudentInClassroomArgs> = async ({
    args: { classroom } = {},
    context: { prisma, user }
}) => {

    // adding the student to the classroom 
    const students = await prisma.updateClassroom({
        data: { students: { connect: { _id: user._id } } },
        where: { _id: classroom }
    }).students();

    // adding the classroom to user classrooms array 
    await prisma.updateUser({
        data: {
            studentClassrooms: { connect: { _id: classroom } }
        },
        where: { _id: user._id }
    });

    return students;
}

const getClassroomStreamUrl: GQLResolver<i.getClassroomStreamUrlArgs> = async ({
    args: { scheduleId },
    context: { prisma, user: { _id, createdAt, updatedAt, phone, fullName, grade } }
}) => {
    const classrooms = await prisma.classrooms({
        where: {
            schedule_some: {
                _id: scheduleId
            }
        }
    });

    if (!classrooms.length)
        throw new UserInputError('No Schedule found with this id');

    return {
        streamUrl: makeVideoStreamKey({
            scheduleId,
            user: { _id, createdAt, updatedAt, phone, fullName, grade }
        })
    };
};

const students: GQLResolver<any> = ({ root, context: { prisma } }) =>
    prisma.classroom({ _id: root._id }).students();

const subject: GQLResolver<any> = ({ root, context: { prisma } }) =>
    prisma.classroom({ _id: root._id }).subject();

const teacher: GQLResolver<any> = ({ root, context: { prisma } }) =>
    prisma.classroom({ _id: root._id }).teacher();

const uploadClassroomVideo: GQLResolver<i.UploadClassroomVideoArgs> = async ({
    args: { video, scheduleId },
    context: { user }
}) => {
    const uploadedFile = await video;
    const mimeType = uploadedFile.mimetype;
    const fileName = randomString();
    const extension = getExtensionFromFileName(uploadedFile.filename);
    const fullFileName = `${fileName}.${extension}`;

    const uploadStream = uploadedFile.createReadStream();
    const fwrite = fs.createWriteStream(`${VIDEO_UPLOAD_LOCATION}/${fullFileName}`);

    // promisifying and rebinding the function to it's main object cause promisify happen to 
    // change the function context
    const writeOn = promisify(fwrite.on).bind(fwrite);
    uploadStream.pipe(fwrite);

    // wating for the close event 
    await writeOn('close');

    // make sure that this classroom belongs to that teacher
    const classrooms = await prisma.classrooms({
        where: {
            teacher: {
                _id: user._id
            },
            schedule_some: { _id: scheduleId }
        }
    });

    if (!classrooms.length)
        throw new UserInputError('No schedule with that id');

    // get the first classroom as we are selecting by unique things after all
    const classroom = classrooms[0];

    // update classroom schedule here
    await prisma.updateClassroom({
        data: {
            schedule: {
                update: {
                    data: {
                        videoUrl: fullFileName,
                        encoding: mimeType
                    },
                    where: { _id: scheduleId }
                }
            }
        },
        where: {
            _id: classroom._id
        }
    });

    return { ...uploadedFile, filename: fullFileName };
}

export const classroomResolvers = convertToResolverPipes({
    Query: {
        getClassrooms,
        getClassroom,
        getStudentClassrooms,
        getClassroomStreamUrl: pipeP([isAuthenticated, getClassroomStreamUrl]),
    },
    Mutation: {
        createClassroom: pipeP([isAuthenticated, isTeacher, createClassroom]),
        updateClassroom: pipeP([isAuthenticated, isTeacher, updateClassroom]),
        addStudentInClassroom: pipeP([isAuthenticated, addStudentInClassroom]),
        uploadClassroomVideo: pipeP([isAuthenticated, isTeacher, uploadClassroomVideo]),
    },
    Classroom: {
        students: resolverPipe(students),
        subject: resolverPipe(subject),
        teacher: resolverPipe(teacher),
    }
});