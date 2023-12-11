import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FileService {
  constructor() {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { buffer } = file;

    const bucket = firebaseAdmin.storage().bucket();
    const fileName = `${new Date().getTime()}_${Math.floor(
      Math.random() * 10000,
    )}`;
    const fileUpload = bucket.file(fileName);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error(error);
        reject(new Error('Unable to upload file.'));
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;
        resolve(publicUrl);
      });

      blobStream.end(buffer);
    });
  }
}
