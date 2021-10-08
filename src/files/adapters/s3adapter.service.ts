import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'src/aws/decorators/inject-aws-service.decorator';
import { FilesRepository } from '../files.repository';
import { FilesService } from '../files.service';
import { File } from '../interfaces/file.interface';

@Injectable()
export class S3AdapterService implements FilesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectAwsService(S3) private readonly s3Service: S3,
    private readonly filesRepository: FilesRepository,
  ) {}

  getPresignedUrl(key: string) {
    return this.s3Service.getSignedUrl('putObject', {
      Bucket: this.configService.get('PUBLIC_BUCKET'),
      Expires: Number(this.configService.get('URL_EXPIRATION_TIME')),
      Key: key,
    });
  }

  create(file: File) {
    return this.filesRepository.create(file);
  }

  getFile(id: number) {
    return this.filesRepository.get(id);
  }
}
