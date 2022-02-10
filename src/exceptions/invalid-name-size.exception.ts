import { BadRequestException } from '@nestjs/common';

export class InvalidNameSizeException extends BadRequestException {
  constructor() {
    super('Invalid name size');
  }
}
