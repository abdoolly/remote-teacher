import * as _ from 'ramda';

export type PipeInterface = (...fns: Function[]) => any;


const pipeWith: (piperFn: (f: any, res: any) => any) => PipeInterface = _.pipeWith as any;

/**
 * @description make pipe while not null
 */

export const pipeWhileNotNull = pipeWith((f: any, res: any) => _.isNil(res) ? res : f(res));

/**
 * @description make pipe for promises and normal values
 */
export const pipeP = pipeWith((f, res) => (res && res.then) ? res.then(f) : f(res));