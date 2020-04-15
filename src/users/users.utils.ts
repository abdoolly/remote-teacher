import { UserType, Maybe } from "../config/prisma-client";
import { ResolverArgs, randomString, getExtensionFromFileName } from "../utils/general-utils";
import * as _ from 'ramda';
import { FileUpload } from "graphql-upload";
import { IMG_UPLOAD_LOCATION } from "../config/upload";
import * as fs from 'fs';
import { promisify } from "util";

export const addUserType = _.curry((userType: UserType, args: ResolverArgs<any>) =>
    _.set(_.lensPath(['args', 'data', 'userType']), userType, args));


export let uploadProfileImg = async (fileUploaded: Maybe<Promise<FileUpload>>, uploadPath: string) => {
    if (!fileUploaded)
        return null;

    const file = await fileUploaded;
    const fileName = randomString();
    const mimeType = file.mimetype;
    const extension = getExtensionFromFileName(file.filename);
    const fullFileName = `${fileName}.${extension}`;

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
    };
};