import { Module } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AwsModule } from '../aws/aws.module';
import { S3AdapterService } from './adapters/s3adapter.service';
import { FilesRepository } from './files.repository';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

const FilesServiceProvider = {
  provide: FilesService,
  useClass: S3AdapterService,
};

@Module({
  imports: [
    AwsModule.forFeature([
      { service: S3, options: { signatureVersion: 'v4' } },
    ]),
  ],
  providers: [FilesResolver, FilesServiceProvider, FilesRepository],
  exports: [FilesServiceProvider],
})
export class FilesModule {}
