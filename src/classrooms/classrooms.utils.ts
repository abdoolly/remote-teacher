import { Classroom, classroomDate } from "../config/prisma-client";

// transform the classroomDate array in the each classroom
export const classroomTransformer = (classroom: Classroom) => {
    let schedule = classroom.schedule;

    const arrSchedule = (schedule as any) as classroomDate[];

    // loop on the schedule items 
    // reduce all with the dates to has an times array that has all the start and end times

    let finalObject: any = {};

    for (let schedule of arrSchedule) {
        // safety check that there is a date in the schedule
        if (!schedule.date || !schedule.startTime || !schedule.endTime)
            continue;

        const date = schedule.date;

        if (finalObject[date]) {
            finalObject[date].times.push({
                startTime: schedule.startTime,
                endTime: schedule.endTime
            });
            continue;
        }

        finalObject[date] = {
            ...schedule,
            times: [{
                startTime: schedule.startTime,
                endTime: schedule.endTime
            }]
        };
    }

    classroom.schedule = Object.values(finalObject) as any;

    return classroom;
}