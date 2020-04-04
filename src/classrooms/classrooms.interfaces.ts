// this page is generated by this tool
// https://transform.tools/graphql-to-typescript

import { FileUpload } from "graphql-upload";

export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type ClassroomDateUpdateManyInput = {
    set?: Maybe<Array<CreateClassroomDate>>;
    add?: Maybe<Array<CreateClassroomDate>>;
};

export type ClassroomUpdateInput = {
    teacher?: Maybe<Scalars["ID"]>;
    students?: Maybe<ClassroomUpdateStudents>;
    subject?: Maybe<Scalars["ID"]>;
    schedule?: Maybe<ClassroomDateUpdateManyInput>;
    cost?: Maybe<Scalars["Float"]>;
};

export type ClassroomUpdateStudents = {
    set?: Maybe<Array<Maybe<Scalars["ID"]>>>;
    add?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type CreateClassroomDate = {
    startTime: Scalars["DateTime"];
    endTime: Scalars["DateTime"];
    date?: Maybe<Scalars["DateTime"]>;
    durationInMin?: Maybe<Scalars["Int"]>;
    videoUrl?: Maybe<Scalars["String"]>;
    encoding?: Maybe<Scalars["String"]>;
};

export type CreateClassroomInput = {
    teacher?: Maybe<Scalars["ID"]>;
    students?: Maybe<Array<Scalars["ID"]>>;
    subject?: Maybe<Scalars["ID"]>;
    cost?: Maybe<Scalars["Float"]>;
    schedule?: Maybe<Array<CreateClassroomDate>>;
};

export type MutationCreateClassroomArgs = {
    data: CreateClassroomInput;
};

export type MutationUpdateClassroomArgs = {
    data: ClassroomUpdateInput;
    classroom?: Maybe<Scalars["ID"]>;
};

export type MutationAddStudentInClassroomArgs = {
    classroom: Maybe<Scalars["ID"]>;
};

export type QueryGetClassroomsArgs = {
    first?: Maybe<Scalars["Int"]>;
    teacher?: Maybe<Scalars["ID"]>;
    subject?: Maybe<Scalars["ID"]>;
    grade?: Maybe<Scalars["String"]>;
};

export type QueryGetClassroomArgs = {
    classroom: Maybe<Scalars["ID"]>;
};

export type QueryGetStudentClassroomsArgs = {
    today?: Maybe<Scalars["Boolean"]>;
};

export type getClassroomStreamUrlArgs = {
    scheduleId: Scalars["String"]
};

export type UploadClassroomVideoArgs = {
    scheduleId: Scalars["String"];
    video: Promise<FileUpload>;
};