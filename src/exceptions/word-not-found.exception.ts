import { BadRequestException } from '@nestjs/common';

export class WordNotFoundException extends BadRequestException {
  constructor() {
    super('Word not found');
  }
}
