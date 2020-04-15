import * as fs from 'fs';
import { FileUpload } from "graphql-upload";
import * as _ from 'ramda';
import { promisify } from "util";
import { Maybe, UserType } from "../config/prisma-client";
import { IMG_LOCATION, IMG_UPLOAD_LOCATION } from "../config/upload";
import { getExtensionFromFileName, randomString, ResolverArgs } from "../utils/general-utils";
const existsP = promisify(fs.exists);
const mkdirP = promisify(fs.mkdir);

export const addUserType = _.curry((userType: UserType, args: ResolverArgs<any>) =>
    _.set(_.lensPath(['args', 'data', 'userType']), userType, args));


export let uploadFile = async (fileUploaded: Maybe<Promise<FileUpload>>, uploadPath: string) => {
    if (!fileUploaded)
        return null;

    const file = await fileUploaded;
    const fileName = randomString();
    const mimeType = file.mimetype;
    const extension = getExtensionFromFileName(file.filename);
    const fullFileName = `${fileName}.${extension}`;

    // check if a file exists and if does not exist then just make that directory for it
    if (!(await existsP(uploadPath)))
        await mkdirP(uploadPath);

    const imgStream = file.createReadStream();
    const fwrite = fs.createWriteStream(`${uploadPath}/${fullFileName}`);

    // promisifying and rebinding the function to it's main object cause promisify happen to 
    // change the function context
    const writeOn = promisify(fwrite.on).bind(fwrite);
    imgStream.pipe(fwrite);

    await writeOn('close');

    return {
        uploadPath: `${IMG_UPLOAD_LOCATION}/${fullFileName}`,
        mimeType,
        extension,
        fileName,
        fullFileName,
        downloadPath: `${IMG_LOCATION}/${fullFileName}`
    };
};