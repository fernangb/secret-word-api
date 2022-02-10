import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,

      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, 'domains', '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
