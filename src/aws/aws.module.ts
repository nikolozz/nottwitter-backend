import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { AWS_MODULE_TOKEN } from './contants';
import { IAWSModuleOptions } from './interfaces/aws-module-options.interface';
import {
  IAWSModuleConfiguration,
  ServiceOptions,
} from './interfaces/aws-module-configuration.interface';
import { getAwsServiceToken } from './utils/aws.utils';

@Global()
@Module({})
export class AwsModule {
  static forRootAsync(options: IAWSModuleOptions): DynamicModule {
    return {
      module: AwsModule,
      imports: options.imports,
      providers: [this.createProvider(options)],
      exports: [AWS_MODULE_TOKEN],
    };
  }

  static forFeature(services: ServiceOptions[]): DynamicModule {
    const providers = services.map(this.createAwsServiceProvider);
    return {
      module: AwsModule,
      providers,
      exports: providers,
    };
  }

  private static createProvider(options: IAWSModuleOptions): Provider {
    return {
      provide: AWS_MODULE_TOKEN,
      inject: options.inject,
      useFactory: options.useFactory,
    };
  }

  private static createAwsServiceProvider({
    service,
    options: serviceOptions,
  }: ServiceOptions): Provider {
    return {
      provide: getAwsServiceToken(service.serviceIdentifier),
      useFactory: (options: IAWSModuleConfiguration) =>
        new service({
          region: options.region,
          credentials: {
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey,
          },
          ...serviceOptions,
        }),
      inject: [AWS_MODULE_TOKEN],
    };
  }
}
