import { AuthenticationError, UserInputError, } from "apollo-server-express";
import * as _ from 'ramda';
import { signJWT } from "../config/jwt";
import { pipeP } from "../utils/functional-utils";
import { checkPhoneUnique, convertToResolverPipes, GQLResolver } from "../utils/general-utils";
import { CreateStudentArgs, CreateTeacherArgs, LoginArgs, GetTeachersArgs } from "./users.interfaces";
import { addUserType } from "./users.utils";

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

const registerUser = async ({
    args: { data },
    context: { prisma }
}) => {
    if (data.password !== data.confirmPassword)
        throw new UserInputError('Password and confirm password does not match');

    const user = await prisma.createUser(_.omit(['confirmPassword'], { ...data, userType: data.userType }));

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

const userResolvers = convertToResolverPipes({
    Query: { login, getTeachers, getTeacher },
    Mutation: {
        registerTeacher: pipeP([checkPhoneUnique, registerTeacher]),
        registerStudent: pipeP([checkPhoneUnique, registerStudent]),
    }
});

export default userResolvers;
