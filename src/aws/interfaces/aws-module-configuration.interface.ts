export type IAWSModuleConfiguration = {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly region: string;
};

export type AWSService = {
  new (options: AWSServiceOptions): any;
  serviceIdentifier?: string;
};

export type AWSServiceOptions = {
  readonly region: string;
  readonly credentials: Omit<IAWSModuleConfiguration, 'region'>;
};

export type ServiceOptions = {
  service: AWSService;
  options: { [key: string]: string };
};
