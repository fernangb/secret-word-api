import { BadRequestException } from '@nestjs/common';

export class WordAlreadyExistsException extends BadRequestException {
  constructor() {
    super('Word already exists');
  }
}
