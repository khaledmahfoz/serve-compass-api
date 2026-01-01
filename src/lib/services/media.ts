import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

@Injectable()
export class MediaService {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly folderName: string;
  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow<string>('B2_BUCKET_NAME');
    this.folderName = this.configService.getOrThrow<string>('B2_FOLDER_NAME');
    this.s3 = new S3Client({
      endpoint: this.configService.getOrThrow<string>('B2_ENDPOINT'),
      region: this.configService.getOrThrow<string>('B2_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('B2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'B2_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async compressImage(image: Express.Multer.File): Promise<Buffer> {
    return sharp(image.buffer)
      .toFormat('webp', {
        quality: 80,
      })
      .toBuffer();
  }

  async uploadImage(
    image: Express.Multer.File,
    keyName: string,
  ): Promise<string> {
    try {
      const compressedBuffer = await this.compressImage(image);
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: `${this.folderName}/${keyName}.webp`,
          Body: compressedBuffer,
        }),
      );
      return `${keyName}.webp`;
    } catch (error) {
      if (error instanceof S3ServiceException) {
        throw new HttpException(
          error.message,
          error.$metadata.httpStatusCode ?? 500,
        );
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeImage(keyName: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: `${this.folderName}/${keyName}.webp`,
      }),
    );
  }
}
