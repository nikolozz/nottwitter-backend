import { File } from './interfaces/file.interface';

export abstract class FilesService {
  abstract getPresignedUrl(key: string): string;

  abstract create(file: File): Promise<File>;

  abstract getFile(id: number): Promise<File>;
}
