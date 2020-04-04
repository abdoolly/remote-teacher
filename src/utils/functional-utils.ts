import * as _ from 'ramda';

export type PipeInterface = (...fns: Function[]) => any;

type PiperFn = (f: any, res: any) => any;
type PipeWithInterface = (fn: PiperFn) => (fns: any[]) => any;

const pipeWith: PipeWithInterface = _.pipeWith as any;

/**
 * @description make pipe while not null
 */

export const pipeWhileNotNull = pipeWith((f: any, res: any) => _.isNil(res) ? res : f(res));

/**
 * @description make pipe for promises and normal values
 */
export const pipeP = pipeWith((f, res) => (res && res.then) ? res.then(f) : f(res));

export const tapP = _.curry(async (fn: any, args: any) => {
    const result = fn(args);
    if (result.then)
        await result;

    return args;
});

export const debug = _.curry((label = '', value = '') => console.log(label, value));