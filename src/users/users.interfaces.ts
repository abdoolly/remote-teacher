import { Maybe } from '../config/prisma-client/index';
import { FileUpload } from 'graphql-upload';

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
        grade: Maybe<string>;
        subjects: Maybe<string[]>;
        userType: string;
        email: Maybe<string>;
        profileImg: Maybe<Promise<FileUpload>>;
        device_token: Maybe<string>;
        facebook_id: Maybe<string>;
        google_id: Maybe<string>;
    }
}

export type CreateStudentArgs = CreateTeacherArgs;

export interface GetTeachersArgs {
    firstTen?: Boolean;
    grade?: string;
    name?: string;
}