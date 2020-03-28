import { UserType } from "../config/prisma-client";
import { ResolverArgs } from "../utils/general-utils";
import * as _ from 'ramda';

export const addUserType = _.curry((userType: UserType, args: ResolverArgs<any>) =>
    _.set(_.lensPath(['args', 'data', 'userType']), userType, args));