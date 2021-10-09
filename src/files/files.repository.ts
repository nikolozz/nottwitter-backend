import { File } from './interfaces/file.interface';
import { PrismaRepository } from '../database/prisma/prisma.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesRepository {
  constructor(private readonly filesRepository: PrismaRepository) {}

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
