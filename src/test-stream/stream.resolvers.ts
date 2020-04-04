import { FileUpload } from 'graphql-upload';
import { pubsub } from '../config/graphql/graphql';
import { convertToResolverPipes, GQLResolver } from '../utils/general-utils';
import { promisify } from 'util';
const SEAT_RESERVED = 'SEAT_RESERVED';
import * as fs from 'fs';
import { VIDEO_UPLOAD_LOCATION } from '../config/upload';

const onSeatReserved = {
    subscribe: () => pubsub.asyncIterator(SEAT_RESERVED)
};

const reserveSeat: GQLResolver<{ data: string, file: Promise<FileUpload> }> = async ({
    args: { data, file }
}) => {
    const fileUpload = await file;
    // const uploading = fileUpload.createReadStream();
    const uploading = fs.createReadStream(`${VIDEO_UPLOAD_LOCATION}/koko.mov`);
    const streamOn = promisify(uploading.on).bind(uploading);

    uploading.on('data', (chunk: Buffer[]) => {

        // convert from buffer to string
        const base64Chunk = Buffer.from(chunk).toString('base64');

        // then publish it
        pubsub.publish(SEAT_RESERVED, {
            onSeatReserved: {
                message: 'Video Streaming',
                number: '123',
                status: 'RESERVED',
                data: base64Chunk
            }
        })
    });

    uploading.once('end', () => console.log('uploading ended'));

    await streamOn('close');

    // await pubsub.publish(SEAT_RESERVED, {
    //     onSeatReserved: {
    //         message: 'Seat is reserved',
    //         number: '123',
    //         status: 'RESERVED',
    //         data
    //     }
    // });

    return 'Seat is reserved successfully';
}

const releaseSeat: GQLResolver<any> = async ({ }) => {
    await pubsub.publish(SEAT_RESERVED, {
        onSeatReserved: {
            message: 'Seat is released',
            number: '321',
            status: 'RELEASING'
        }
    });

    return 'Seat is released successfully';
}


export const streamResolvers = convertToResolverPipes({
    Mutation: {
        reserveSeat,
        releaseSeat,
    },
    Subscription: {
        onSeatReserved
    },
});