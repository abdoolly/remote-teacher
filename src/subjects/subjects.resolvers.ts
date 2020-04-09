import { GQLResolver, convertToResolverPipes } from "../utils/general-utils";
import { CreateSubjectArgs } from "./subjects.interface";


const getSubjects: GQLResolver<{ grade?: string }> = async ({
    args = {},
    context: { prisma }
}) => {
    return await prisma.subjects({
        where: {
            grade: args && args.grade ? args.grade : undefined
        }
    });
};

const getGrades: GQLResolver<{}> = async () => {
    return [
        { _id: '1', en_name: '3rd secondry', ar_name: 'تالتة ثانوى' },
        { _id: '2', en_name: '2nd secondry', ar_name: 'تانية ثانوى' },
        { _id: '3', en_name: '1st secondry', ar_name: 'أول ثانوي' },
        { _id: '4', en_name: '3rd prep', ar_name: 'تالتة اعدادي' },
        { _id: '5', en_name: '2nd prep', ar_name: 'تانية اعدادي' },
        { _id: '6', en_name: '1st prep', ar_name: 'أولي اعدادي' },
        { _id: '7', en_name: 'Primary 6', ar_name: 'ستة ابتدائي' },
        { _id: '8', en_name: 'Primary 5', ar_name: 'خامسة ابتدائي' },
        { _id: '9', en_name: 'Primary 4', ar_name: 'رابعة ابتدائي' },
        { _id: '10', en_name: 'Primary 3', ar_name: 'تالتة ابتدائي' },
        { _id: '11', en_name: 'Primary 2', ar_name: 'تانية ابتدائي' },
        { _id: '12', en_name: 'Primary 1', ar_name: 'أول ابتدائي' },
    ];
}

const createSubject: GQLResolver<{ subject: CreateSubjectArgs }> = ({ args, context: { prisma }
}) => prisma.createSubject(args.subject);

export const subjectResolvers = convertToResolverPipes({
    Query: {
        getSubjects,
        getGrades
    },
    Mutation: {
        createSubject
    }
});