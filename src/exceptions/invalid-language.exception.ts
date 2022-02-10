import { BadRequestException } from '@nestjs/common';

export class InvalidLanguageException extends BadRequestException {
  constructor() {
    super('Invalid language');
  }
}
