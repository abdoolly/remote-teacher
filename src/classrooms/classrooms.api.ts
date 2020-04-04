import { Request, Response } from "express";
import * as fs from 'fs';
import { promisify } from "util";
import { prisma } from "../config/prisma-client";
import { VIDEO_UPLOAD_LOCATION } from "../config/upload";
import { getStreamKeyData, GetVideoStreamArgs } from "../utils/protection";
const doesItExist = promisify(fs.exists);

/**
 * @description this api will receive a key which will be used to know which video will be streamed
 * this key will be used only once so, if it's used again it wont work
 * @param req 
 * @param res 
 */
export const streamClassroomVideo = async (req: Request, res: Response) => {
    try {
        const streamKey = req.params['streamKey'];
        const decrypted = getStreamKeyData(streamKey) as GetVideoStreamArgs;
        const video = await getVideoUrlByScheduleId(decrypted.scheduleId, decrypted.user._id);

        if (!video)
            return res.status(400).send({ status: 400, message: 'Video url not found' });

        const { videoUrl, encoding } = video;

        const videoFullPath = `${VIDEO_UPLOAD_LOCATION}/${videoUrl}`;
        if (!doesItExist(videoFullPath))
            return res.status(400).send({ status: 400, message: 'Video path is not correct' });

        res.setHeader('content-type', encoding);
        return fs.createReadStream(videoFullPath).pipe(res);
    } catch (err) {
        console.log('err', err);
        return res.status(400).send({
            status: 400,
            message: 'Something went wrong'
        });
    }
}

const getVideoUrlByScheduleId = async (scheduleId: string, userId: string) => {
    let classrooms = await prisma.classrooms({
        where: {
            students_some: {
                _id: userId
            },
            schedule_some: {
                _id: scheduleId
            },
        }
    });

    if (!classrooms.length)
        return null;

    const schedules = classrooms[0].schedule as any;
    let { videoUrl, encoding } = schedules.filter(({ _id }) => _id === scheduleId)[0];
    return { videoUrl, encoding };
};