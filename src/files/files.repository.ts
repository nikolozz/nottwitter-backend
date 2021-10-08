import { File } from './interfaces/file.interface';
import { PrismaService } from '../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesRepository {
  constructor(private readonly filesRepository: PrismaService) {}

  create(file: File) {
    return this.filesRepository.file.create({ data: file });
  }

  get(id: number) {
    return this.filesRepository.file.findFirst({
      where: { id },
      rejectOnNotFound: true,
    });
  }
}
