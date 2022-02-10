import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async create({ name, language }: CreateWordDto): Promise<Word> {
    const findName = await this.findByName(name);

    if (!!findName) throw new BadRequestException('Word already exists');

    if (!this.validateName(name))
      throw new BadRequestException('Invalid name size');

    if (!this.validateLanguage(language))
      throw new BadRequestException('Invalid language');

    return this.wordRepository.save(
      this.wordRepository.create({ name, language }),
    );
  }

  async findAll(): Promise<Word[]> {
    return this.wordRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: string): Promise<Word | undefined> {
    return this.wordRepository.findOne(id);
  }

  async update(id: string, { name, language }: UpdateWordDto) {
    const word = await this.findOne(id);

    if (!word) throw new BadRequestException('Word not found');

    const wordAlreadyExists = await this.findByName(name);

    if (!!wordAlreadyExists)
      throw new BadRequestException('Word already exists');

    if (!this.validateName(name))
      throw new BadRequestException('Invalid name size');

    if (!this.validateLanguage(language))
      throw new BadRequestException('Invalid language');

    word.name = name;
    word.language = language;

    return this.wordRepository.save(word);
  }

  async remove(id: string) {
    const word = await this.findOne(id);

    if (!word) throw new BadRequestException('Word not found');

    await this.wordRepository.delete(id);
  }

  findByName(name: string): Promise<Word | undefined> {
    return this.wordRepository.findOne({ name });
  }

  validateName(name: string): boolean {
    const nameSize = 5;
    if (name.length !== nameSize) return false;

    return true;
  }

  validateLanguage(language: string): boolean {
    const validLanguages = ['pt-br', 'en-us'];
    if (!validLanguages.includes(language)) return false;

    return true;
  }
}
