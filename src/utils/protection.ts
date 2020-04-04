import * as crypto from 'crypto';
import { User } from '../config/prisma-client';
const algorithm = 'aes-256-cbc';
require('dotenv').config();

export interface GetVideoStreamArgs {
    scheduleId: string; // mongo id of the scheduale id
    user: User;
}

export const makeVideoStreamKey = (args: GetVideoStreamArgs) => encrypt(JSON.stringify(args));
export const getStreamKeyData = (streamKey: string) => JSON.parse(decrypt(streamKey));


export const streamKeySecret = process.env.streamKeySecret as string;
export const streamIV = process.env.streamKeyIVHex as string;


export const encrypt = (textToEncrypt: string) => {
    const keyBuffer = Buffer.from(streamKeySecret, 'hex');
    let cipher = crypto.createCipheriv(algorithm, keyBuffer, Buffer.from(streamIV, 'hex'));
    let encrypted = cipher.update(textToEncrypt);
    return Buffer.concat([encrypted, cipher.final()]).toString('hex');
};

export const decrypt = (textToDecrypt: string) => {
    let iv = streamIV;
    let encryptedText = Buffer.from(textToDecrypt, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(streamKeySecret, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};