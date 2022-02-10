import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordNotFoundException } from 'src/exceptions/word-not-found.exception';
import { WordAlreadyExistsException } from 'src/exceptions/word-already-exists.exception';
import { InvalidNameSizeException } from 'src/exceptions/invalid-name-size.exception';
import { InvalidLanguageException } from 'src/exceptions/invalid-language.exception';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async create({ name, language }: CreateWordDto): Promise<Word> {
    const findName = await this.findByName(name);

    if (!!findName) throw new WordAlreadyExistsException();

    if (!this.validateName(name)) throw new InvalidNameSizeException();

    if (!this.validateLanguage(language)) throw new InvalidLanguageException();

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

    if (!word) throw new WordNotFoundException();

    const wordAlreadyExists = await this.findByName(name);

    if (!!wordAlreadyExists) throw new WordAlreadyExistsException();

    if (!this.validateName(name)) throw new InvalidNameSizeException();

    if (!this.validateLanguage(language)) throw new InvalidLanguageException();

    word.name = name;
    word.language = language;

    return this.wordRepository.save(word);
  }

  async remove(id: string) {
    const word = await this.findOne(id);

    if (!word) throw new WordNotFoundException();

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

  async findRandomWord(): Promise<Word> {
    const randomWord = await this.wordRepository
      .createQueryBuilder()
      .select('*')
      .from(Word, 'word')
      .orderBy('RANDOM()')
      .limit(1)
      .execute();

    return randomWord[0];
  }
}
