import { AuthenticationError, UserInputError, } from "apollo-server-express";
import * as _ from 'ramda';
import { signJWT } from "../config/jwt";
import { pipeP } from "../utils/functional-utils";
import { checkPhoneUnique, convertToResolverPipes, GQLResolver, resolverPipe } from "../utils/general-utils";
import { CreateStudentArgs, CreateTeacherArgs, LoginArgs, GetTeachersArgs } from "./users.interfaces";
import { addUserType, uploadProfileImg } from "./users.utils";
import { IMG_UPLOAD_LOCATION } from "../config/upload";

const login: GQLResolver<LoginArgs> = async ({
    args: { phone, password },
    context: { prisma }
}) => {
    const user = await prisma.user({ phone });
    if (!user)
        throw new AuthenticationError('Wrong phone or password');

    if (user.password !== password)
        throw new AuthenticationError('Wrong phone or password');

    return {
        user,
        token: signJWT(_.omit(['password'], user))
    }
}

const registerUser: GQLResolver<CreateTeacherArgs> = async ({
    args: { data },
    context: { prisma }
}) => {
    if (data.password !== data.confirmPassword)
        throw new UserInputError('Password and confirm password does not match');

    const mainUserData = _.omit(['confirmPassword', 'subjects'], {
        ...data,
        userType: data.userType,
    }) as any;

    // let {} = await uploadProfileImg(data.profileImg, IMG_UPLOAD_LOCATION);

    const user = await prisma.createUser({
        ...mainUserData,

        // connecting the subjects incase they exist 
        ...(
            data.subjects ? {
                subjects: {
                    connect: data.subjects.map((_id) => ({ _id }))
                }
            } : undefined)
    });

    return {
        user,
        token: signJWT(_.omit(['password'], user))
    }
};

const registerTeacher: GQLResolver<CreateTeacherArgs> = _.pipe(addUserType('TEACHER'), registerUser);

const registerStudent: GQLResolver<CreateStudentArgs> = _.pipe(addUserType('STUDENT'), registerUser);

const getTeachers: GQLResolver<GetTeachersArgs> = async ({
    args: { firstTen, grade, name },
    context: { prisma }
}) => {
    let searchFor = {};

    if (grade) {
        searchFor['grade'] = grade;
    }

    if (name) {
        searchFor['fullName_contains'] = name;
    }

    return await prisma.users({
        first: firstTen ? 10 : undefined,
        where: {
            userType: 'TEACHER',
            ...searchFor,
        }
    });
};

const getTeacher: GQLResolver<{ id: string }> = async ({ args: { id }, context: { prisma } }) => {
    return prisma.user({ _id: id });
}

const subjects: GQLResolver<any> = ({ root, context: { prisma } }) => {
    return prisma.user({ _id: root._id }).subjects();
};

const studentClassrooms: GQLResolver<any> = ({ root, context: { prisma } }) => {
    return prisma.user({ _id: root._id }).studentClassrooms();
};

const teacherClassrooms: GQLResolver<any> = ({ root, context: { prisma } }) => {
    return prisma.user({ _id: root._id }).teacherClassrooms();
};

const userResolvers = convertToResolverPipes({
    Query: {
        login,
        getTeachers,
        getTeacher
    },
    Mutation: {
        registerTeacher: pipeP([checkPhoneUnique, registerTeacher]),
        registerStudent: pipeP([checkPhoneUnique, registerStudent]),
    },
    User: {
        subjects: resolverPipe(subjects),
        studentClassrooms: resolverPipe(studentClassrooms),
        teacherClassrooms: resolverPipe(teacherClassrooms)
    }
});

export default userResolvers;
