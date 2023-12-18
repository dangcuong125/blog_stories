import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { User } from '../../auth/entities/user.entity';
import { FileRepository } from '../repositories/file.repository';

@Injectable()
export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async uploadFile(file: Express.Multer.File, user: User) {
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

    const url = await new Promise<string>((resolve, reject) => {
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

    const image = await this.fileRepository.save({
      userId: user.id,
      url: url,
    });
    return image;
  }

  async uploadMultipleImages(files: Express.Multer.File[], user: User) {
    const res = files.map((file) => {
      return this.uploadFile(file, user);
    });
    const images = await Promise.all(res);

    return Promise.all(images);
  }
}
