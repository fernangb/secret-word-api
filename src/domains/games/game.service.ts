import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordService } from '../words/word.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @Inject(WordService)
    private readonly wordService: WordService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const word = await this.wordService.findRandomWord();

    return this.gameRepository.save(
      this.gameRepository.create({ wordId: word.id }),
    );
  }

  findAll() {
    return this.gameRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string): Promise<Game | undefined> {
    return this.gameRepository.findOne(id);
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
