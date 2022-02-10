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
  create(@Body() { name, language }: CreateWordDto) {
    return this.wordService.create({ name: name.toUpperCase(), language });
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() { name, language }: UpdateWordDto) {
    return this.wordService.update(id, { name: name.toUpperCase(), language });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(id);
  }
}
