import { Maybe } from "../classrooms/classrooms.interfaces";

export interface CreateSubjectArgs {
    name: string;
    photoUrl?: Maybe<string>;
    grade?: Maybe<string>;
    ar_name?: Maybe<string>;
}