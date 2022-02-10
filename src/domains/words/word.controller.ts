import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  async create(@Body() { name, language }: CreateWordDto) {
    return this.wordService.create({ name: name.toUpperCase(), language });
  }

  @Get()
  async findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.wordService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() { name, language }: UpdateWordDto,
  ) {
    return this.wordService.update(id, { name: name.toUpperCase(), language });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.wordService.remove(id);
  }
}
