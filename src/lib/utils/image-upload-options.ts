import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

export function createImageUploadOptions(options?: {
  maxSize?: number;
  fileType?: string;
}): ParseFilePipe {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: options?.maxSize || 3 * 1000 * 1000,
      }),
      new FileTypeValidator({
        fileType: options?.fileType || 'image/(jpeg|png|webp)',
      }),
    ],
  });
}
