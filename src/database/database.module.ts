import { Global, Module } from '@nestjs/common';
import { PrismaRepository } from './prisma/prisma.repository';

@Global()
@Module({
  providers: [PrismaRepository],
  exports: [PrismaRepository],
})
export class DatabaseModule {}
