import { ForbiddenError, ValidationError } from 'apollo-server-express';
import * as _ from 'ramda';
import { Prisma, User } from '../config/prisma-client';
import { PipeInterface, pipeP } from './functional-utils';

export interface GraphQlContext {
    prisma: Prisma;
    user: User
}

export interface ResolverArgs<T> {
    root: any;
    args: T;
    context: GraphQlContext;
}

/**
 * @description types for the resolver functions
 */
export type GQLResolver<T> = (object: ResolverArgs<T>) => any;

/**
 * @description making my own pipe to fix the type errors 
 */
const pipe: PipeInterface = _.pipe as any;

/**
 * @description turning the arguments to make them one object to be more functional
 * @param root 
 * @param args 
 * @param context 
 */
const makeResolverArgs = (root, args, context): ResolverArgs<any> => ({ root, args, context });

/**
 * @description special pipe function for resolvers
 * @param  {...any} fns 
 */
export const resolverPipe = (...fns: any[]): any => {
    return (root, args, context) => pipeP(...fns)(makeResolverArgs(root, args, context));
};

/**
 * @description let the resolver functions get their arguments as objects instead of arguments
 * @param {*} param0 
 */
export const convertToResolverPipes = ({ Query = {}, Mutation = {} }) => {
    return {
        Query: resolverPiper(Query),
        Mutation: resolverPiper(Mutation)
    }
}

/**
 * @description helper for the convertToResolverPipes
 * @param {*} toIterateOn 
 */
const resolverPiper = (toIterateOn) => {
    let newIterator = {};
    for (let [resolverName, fn] of Object.entries(toIterateOn)) {
        newIterator[resolverName] = resolverPipe(fn);
    }

    return newIterator;
}

/**
 * @description authentication middleware
 */
const shouldBeAuthenticated: GQLResolver<{}> = _.tap(({ context }) => {
    if (!context.user)
        throw new ForbiddenError('You are not authenticated');
});


/**
 * @description graphql middleware that will make sure that a certain field is unique
 * @param param0 
 */
const shouldBeUnique = (pathLensInArgs: _.Lens, modelName: string | 'user', fieldName: string) =>
    _.tap(async ({
        args,
        context: { prisma }
    }: ResolverArgs<any>) => {
        const fieldToCheck = _.view(pathLensInArgs, args);

        const found = await prisma[modelName]({ [fieldName]: fieldToCheck });
        if (found) {
            new ValidationError(`${fieldName} already exists`);
        }
    })



/**
 * - authentication directive
 * - unique validation directive
 */