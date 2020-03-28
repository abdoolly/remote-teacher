import { AuthenticationError, UserInputError } from "apollo-server-express";
import * as _ from 'ramda';
import { signJWT } from "../config/jwt";
import { convertToResolverPipes, GQLResolver } from "../utils/general-utils";
import { CreateStudentArgs, CreateTeacherArgs, LoginArgs } from "./users.interfaces";
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

const registerTeacher: GQLResolver<CreateTeacherArgs> = _.pipe(
    addUserType('TEACHER'),
    registerUser
);

const registerStudent: GQLResolver<CreateStudentArgs> = _.pipe(
    addUserType('STUDENT'),
    registerUser
);

const userResolvers = convertToResolverPipes({
    Query: { login },
    Mutation: { registerTeacher, registerStudent }
});

export default userResolvers;
