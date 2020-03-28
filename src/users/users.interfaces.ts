import { Maybe } from '../config/prisma-client/index';

export interface LoginArgs {
    phone: Maybe<string>;
    password: string;
}

export interface CreateTeacherArgs {
    data: {
        fullName: Maybe<string>;
        phone: string;
        password: Maybe<string>;
        confirmPassword: Maybe<string>;
    }
}

export type CreateStudentArgs = CreateTeacherArgs;

export interface GetTeachersArgs {
    firstTen?: Boolean;
    grade?: string;
    name?: string;
}