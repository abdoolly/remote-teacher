import { GQLResolver, convertToResolverPipes } from "../utils/general-utils";


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
        { en_name: '3rd secondry', ar_name: 'تالتة ثانوى' },
        { en_name: '2nd secondry', ar_name: 'تانية ثانوى' },
        { en_name: '1st secondry', ar_name: 'أول ثانوي' },
        { en_name: '3rd prep', ar_name: 'تالتة اعدادي' },
        { en_name: '2nd prep', ar_name: 'تانية اعدادي' },
        { en_name: '1st prep', ar_name: 'أولي اعدادي' },
        { en_name: 'Primary 6', ar_name: 'ستة ابتدائي' },
        { en_name: 'Primary 5', ar_name: 'خامسة ابتدائي' },
        { en_name: 'Primary 4', ar_name: 'رابعة ابتدائي' },
        { en_name: 'Primary 3', ar_name: 'تالتة ابتدائي' },
        { en_name: 'Primary 2', ar_name: 'تانية ابتدائي' },
        { en_name: 'Primary 1', ar_name: 'أول ابتدائي' },
    ];
}

export const subjectResolvers = convertToResolverPipes({
    Query: {
        getSubjects,
        getGrades
    },
    Mutation: {}
});